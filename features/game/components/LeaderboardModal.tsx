"use client";

import { useState, useEffect } from "react";
import { X, Trophy, Clock, Medal, Award, TrendingUp } from "lucide-react";
import { getCurrentPlayer } from "@/lib/idb/playerIdb";
import { getTopPlayers, type LeaderboardEntry } from "@/actions/gameActions";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeaderboardModal({
  isOpen,
  onClose,
}: LeaderboardModalProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDeviceId, setCurrentDeviceId] = useState<string | null>(null);
  const [playerRank, setPlayerRank] = useState<{
    rank: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadLeaderboard();
    }
  }, [isOpen]);

  const loadLeaderboard = async () => {
    setIsLoading(true);
    try {
      // Get current player
      const player = await getCurrentPlayer();
      if (player) {
        setCurrentDeviceId(player.deviceId);
      }

      // Get top players from Server Action
      const result = await getTopPlayers(100);
      if (result.success && result.data) {
        setEntries(result.data);

        // Calculate player rank
        if (player) {
          const rank = result.data.findIndex(
            (p: LeaderboardEntry) => p.device_id === player.deviceId
          );
          if (rank !== -1) {
            setPlayerRank({ rank: rank + 1, total: result.data.length });
          }
        }
      }
    } catch (error) {
      console.error("Error loading leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Medal className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-white/60 font-bold">{rank}</span>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-amber-900/95 to-amber-950/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-amber-500/50 p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-400" />
            <h2 className="text-3xl font-bold text-amber-300">Bảng xếp hạng</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Player Rank Card */}
        {playerRank && (
          <div className="mb-4 p-4 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-2 border-amber-500/40 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-amber-400" />
                <div>
                  <p className="text-white font-semibold">Xếp hạng của bạn</p>
                  <p className="text-white/60 text-sm">
                    {playerRank.rank} / {playerRank.total} người chơi
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <TrendingUp className="w-5 h-5" />
                <span className="text-2xl font-bold">#{playerRank.rank}</span>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
              <p className="text-white/60 mt-4">Đang tải bảng xếp hạng...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg">Chưa có người chơi nào</p>
              <p className="text-white/40 text-sm mt-2">
                Hãy là người đầu tiên!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {entries.map((entry, index) => {
                const isCurrentPlayer = entry.device_id === currentDeviceId;
                return (
                  <div
                    key={entry.device_id}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      isCurrentPlayer
                        ? "bg-gradient-to-r from-green-500/30 to-green-600/30 border-2 border-green-500/60 shadow-lg"
                        : index < 3
                        ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-2 border-amber-500/40"
                        : "bg-white/10 border border-white/20"
                    }`}
                  >
                    {/* Rank */}
                    <div className="w-10 flex items-center justify-center">
                      {getMedalIcon(index + 1)}
                    </div>

                    {/* Name & Stats */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold text-lg">
                          {entry.name}
                        </p>
                        {isCurrentPlayer && (
                          <span className="text-xs bg-green-500/30 text-green-300 px-2 py-0.5 rounded-full border border-green-500/50">
                            Bạn
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60 mt-1">
                        <span>
                          ✓ {entry.correct_answers} | ✗ {entry.wrong_answers}
                        </span>
                        <span>•</span>
                        <span>{entry.score} điểm</span>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="text-white font-bold">
                        {formatTime(entry.duration)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <p className="text-center text-white/60 text-sm">
            {entries.length > 0
              ? `Top ${entries.length} người chơi`
              : "Chưa có dữ liệu"}
          </p>
        </div>
      </div>
    </div>
  );
}
