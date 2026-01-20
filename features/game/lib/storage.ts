import { LeaderboardEntry } from '@/types/game';

const LEADERBOARD_KEY = 'hcm-game-leaderboard';
const INSTRUCTIONS_SEEN_KEY = 'hcm-game-instructions-seen';
const MAX_ENTRIES = 100;
const MAX_AGE_DAYS = 30;

export function saveLeaderboard(entries: LeaderboardEntry[]): boolean {
  try {
    const data = {
      entries,
      version: 1,
    };
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save leaderboard:', error);
    return false;
  }
}

export function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    const entries = parsed.entries || [];
    
    // Clean up old entries
    const now = Date.now();
    const maxAge = MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
    const filtered = entries.filter((entry: LeaderboardEntry) => {
      return now - entry.timestamp < maxAge;
    });
    
    // Limit to MAX_ENTRIES
    return filtered.slice(0, MAX_ENTRIES);
  } catch (error) {
    console.error('Failed to load leaderboard:', error);
    return [];
  }
}

export function addLeaderboardEntry(name: string, time: number): boolean {
  try {
    const entries = loadLeaderboard();
    const newEntry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim() || 'Người chơi',
      time,
      date: new Date().toLocaleDateString('vi-VN'),
      timestamp: Date.now(),
    };
    
    entries.push(newEntry);
    entries.sort((a, b) => a.time - b.time);
    
    return saveLeaderboard(entries.slice(0, MAX_ENTRIES));
  } catch (error) {
    console.error('Failed to add leaderboard entry:', error);
    return false;
  }
}

export function getTopLeaderboard(limit: number = 10): LeaderboardEntry[] {
  const entries = loadLeaderboard();
  return entries.slice(0, limit);
}

export function setInstructionsSeen(seen: boolean): void {
  try {
    const data = {
      seen,
      timestamp: Date.now(),
    };
    localStorage.setItem(INSTRUCTIONS_SEEN_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save instructions seen:', error);
  }
}

export function getInstructionsSeen(): boolean {
  try {
    const data = localStorage.getItem(INSTRUCTIONS_SEEN_KEY);
    if (!data) return false;
    
    const parsed = JSON.parse(data);
    return parsed.seen || false;
  } catch (error) {
    console.error('Failed to load instructions seen:', error);
    return false;
  }
}

export function validatePlayerName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  
  if (trimmed.length === 0) {
    return { valid: true }; // Will use default name
  }
  
  if (trimmed.length > 20) {
    return { valid: false, error: 'Tên không được quá 20 ký tự' };
  }
  
  // Check for special characters (allow Vietnamese characters)
  const specialChars = /[<>{}[\]\\\/]/;
  if (specialChars.test(trimmed)) {
    return { valid: false, error: 'Tên không được chứa ký tự đặc biệt' };
  }
  
  return { valid: true };
}
