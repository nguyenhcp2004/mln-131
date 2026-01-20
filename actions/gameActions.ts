"use server";

import { supabase } from "@/lib/supabase";

export interface LeaderboardEntry {
  device_id: string;
  name: string;
  score: number;
  duration: number;
  correct_answers: number;
  wrong_answers: number;
  created_at?: string;
  updated_at?: string;
}

export interface UpsertResult extends LeaderboardEntry {
  is_new_record: boolean;
}

/**
 * Submit game score to leaderboard
 * Server Action - không expose endpoint
 */
export async function submitGameScore(
  deviceId: string,
  name: string,
  correctAnswers: number,
  wrongAnswers: number,
  duration: number
): Promise<{ success: boolean; data?: UpsertResult; error?: string }> {
  try {
    // Validation
    if (!deviceId || !name) {
      return { success: false, error: "Thiếu thông tin" };
    }

    if (name.trim().length < 2 || name.trim().length > 20) {
      return { success: false, error: "Tên phải từ 2-20 ký tự" };
    }

    if (correctAnswers < 0 || wrongAnswers < 0 || duration < 0) {
      return { success: false, error: "Dữ liệu không hợp lệ" };
    }

    // Call Supabase RPC function
    const { data, error } = await supabase.rpc("upsert_leaderboard_entry", {
      p_device_id: deviceId,
      p_name: name.trim(),
      p_correct: correctAnswers,
      p_wrong: wrongAnswers,
      p_duration: duration,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      return {
        success: false,
        error: "Không thể lưu điểm. Vui lòng kiểm tra Supabase setup.",
      };
    }

    return {
      success: true,
      data: data[0],
    };
  } catch (err) {
    console.error("Server error:", err);
    return {
      success: false,
      error: "Lỗi máy chủ nội bộ",
    };
  }
}

/**
 * Get top players from leaderboard
 * Server Action - không expose endpoint
 */
export async function getTopPlayers(
  limit: number = 100
): Promise<{ success: boolean; data?: LeaderboardEntry[]; error?: string }> {
  try {
    if (limit < 1 || limit > 1000) {
      return { success: false, error: "Limit phải từ 1-1000" };
    }

    const { data, error } = await supabase
      .from("leaderboard")
      .select("*")
      .order("score", { ascending: false })
      .order("duration", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("Supabase query error:", error);
      return {
        success: false,
        error: "Không thể tải bảng xếp hạng",
      };
    }

    return {
      success: true,
      data: data || [],
    };
  } catch (err) {
    console.error("Server error:", err);
    return {
      success: false,
      error: "Lỗi máy chủ nội bộ",
    };
  }
}

/**
 * Get player rank by device ID
 * Server Action - không expose endpoint
 */
export async function getPlayerRank(deviceId: string): Promise<{
  success: boolean;
  rank?: number;
  total?: number;
  error?: string;
}> {
  try {
    // Get all players to calculate rank
    const result = await getTopPlayers(1000);

    if (!result.success || !result.data) {
      return {
        success: false,
        error: result.error || "Failed to fetch leaderboard",
      };
    }

    const rank = result.data.findIndex((p) => p.device_id === deviceId);
    if (rank === -1) {
      return { success: false, error: "Player not found" };
    }

    return { success: true, rank: rank + 1, total: result.data.length };
  } catch (err) {
    console.error("Error fetching player rank:", err);
    return { success: false, error: "Failed to fetch rank" };
  }
}

/**
 * Calculate score locally (for preview)
 * Note: Không cần "use server" vì đây là pure function, có thể dùng ở client
 */
export async function calculateScore(
  correctAnswers: number,
  wrongAnswers: number,
  duration: number
): Promise<number> {
  return correctAnswers * 100 - wrongAnswers * 10 - Math.floor(duration / 10);
}
