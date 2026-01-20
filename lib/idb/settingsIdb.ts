import { openDB, DBSchema, IDBPDatabase } from "idb";

const DB_NAME = "mln_settings_db";
const STORE_SETTINGS = "settings";

interface SettingsDB extends DBSchema {
  settings: {
    key: string;
    value: {
      key: string;
      value: unknown;
    };
  };
}

let dbInstance: IDBPDatabase<SettingsDB> | null = null;

async function getDB(): Promise<IDBPDatabase<SettingsDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<SettingsDB>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_SETTINGS)) {
        db.createObjectStore(STORE_SETTINGS, { keyPath: "key" });
      }
    },
  });

  return dbInstance;
}

export async function getSetting<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const db = await getDB();
    const result = await db.get(STORE_SETTINGS, key);
    return result ? (result.value as T) : defaultValue;
  } catch (error) {
    console.error("Error getting setting:", error);
    return defaultValue;
  }
}

export async function setSetting<T>(key: string, value: T): Promise<void> {
  try {
    const db = await getDB();
    await db.put(STORE_SETTINGS, { key, value });
  } catch (error) {
    console.error("Error setting setting:", error);
  }
}
