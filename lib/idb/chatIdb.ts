import { openDB, DBSchema, IDBPDatabase } from "idb";

const DB_NAME = "mln_chat_db";
const STORE_MESSAGES = "messages";
const STORE_SESSIONS = "sessions";

export interface ChatMessage {
  id?: number;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatDB extends DBSchema {
  messages: {
    key: number;
    value: ChatMessage;
    indexes: { sessionId: string };
  };
  sessions: {
    key: string;
    value: ChatSession;
  };
}

let dbInstance: IDBPDatabase<ChatDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<ChatDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<ChatDB>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_MESSAGES)) {
        const messageStore = db.createObjectStore(STORE_MESSAGES, {
          keyPath: "id",
          autoIncrement: true,
        });
        messageStore.createIndex("sessionId", "sessionId");
      }

      if (!db.objectStoreNames.contains(STORE_SESSIONS)) {
        db.createObjectStore(STORE_SESSIONS, { keyPath: "id" });
      }
    },
  });

  return dbInstance;
}

export async function createSession(firstQuestion: string): Promise<string> {
  const db = await getDB();
  const sessionId = Date.now().toString();
  const title =
    firstQuestion.slice(0, 50) + (firstQuestion.length > 50 ? "..." : "");

  await db.add(STORE_SESSIONS, {
    id: sessionId,
    title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return sessionId;
}

export async function getAllSessions(): Promise<ChatSession[]> {
  const db = await getDB();
  const sessions = await db.getAll(STORE_SESSIONS);
  return sessions.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export async function getSession(
  sessionId: string
): Promise<ChatSession | undefined> {
  const db = await getDB();
  return await db.get(STORE_SESSIONS, sessionId);
}

export async function updateSessionTimestamp(sessionId: string): Promise<void> {
  const db = await getDB();
  const session = await db.get(STORE_SESSIONS, sessionId);
  if (session) {
    session.updatedAt = new Date().toISOString();
    await db.put(STORE_SESSIONS, session);
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  const db = await getDB();
  const tx = db.transaction([STORE_MESSAGES, STORE_SESSIONS], "readwrite");

  await tx.objectStore(STORE_SESSIONS).delete(sessionId);

  const messages = await tx
    .objectStore(STORE_MESSAGES)
    .index("sessionId")
    .getAll(sessionId);
  for (const message of messages) {
    if (message.id) {
      await tx.objectStore(STORE_MESSAGES).delete(message.id);
    }
  }

  await tx.done;
}

export async function saveMessage(message: ChatMessage): Promise<void> {
  const db = await getDB();
  const messageToSave = {
    ...message,
    createdAt: message.createdAt || new Date().toISOString(),
  };
  await db.add(STORE_MESSAGES, messageToSave);
  await updateSessionTimestamp(message.sessionId);
}

export async function getMessages(sessionId: string): Promise<ChatMessage[]> {
  const db = await getDB();
  const messages = await db.getAllFromIndex(
    STORE_MESSAGES,
    "sessionId",
    sessionId
  );
  return messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}
