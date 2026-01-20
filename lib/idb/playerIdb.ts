import { openDB, DBSchema, IDBPDatabase } from "idb";
import { v4 as uuidv4 } from "uuid";

const DB_NAME = "mln_player_db";
const STORE_PLAYER = "player";

export interface PlayerProfile {
  deviceId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface PlayerDB extends DBSchema {
  player: {
    key: string;
    value: PlayerProfile;
  };
}

let dbInstance: IDBPDatabase<PlayerDB> | null = null;

export async function getPlayerDB(): Promise<IDBPDatabase<PlayerDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<PlayerDB>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_PLAYER)) {
        db.createObjectStore(STORE_PLAYER, { keyPath: "deviceId" });
      }
    },
  });

  return dbInstance;
}

/**
 * Get or create device ID and player profile
 */
export async function getOrCreatePlayerProfile(): Promise<PlayerProfile> {
  const db = await getPlayerDB();
  const allProfiles = await db.getAll(STORE_PLAYER);

  if (allProfiles.length > 0) {
    // Return existing profile
    return allProfiles[0];
  }

  // Create new profile with UUID
  const newProfile: PlayerProfile = {
    deviceId: uuidv4(),
    name: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.add(STORE_PLAYER, newProfile);
  return newProfile;
}

/**
 * Update player name
 */
export async function updatePlayerName(
  deviceId: string,
  name: string
): Promise<void> {
  const db = await getPlayerDB();
  const profile = await db.get(STORE_PLAYER, deviceId);

  if (profile) {
    profile.name = name;
    profile.updatedAt = new Date().toISOString();
    await db.put(STORE_PLAYER, profile);
  }
}

/**
 * Get current player profile
 */
export async function getCurrentPlayer(): Promise<PlayerProfile | null> {
  const db = await getPlayerDB();
  const allProfiles = await db.getAll(STORE_PLAYER);
  return allProfiles.length > 0 ? allProfiles[0] : null;
}
