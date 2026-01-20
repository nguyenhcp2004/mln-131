"use client";

import { useState, useEffect } from "react";
import { User, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  getOrCreatePlayerProfile,
  updatePlayerName,
} from "@/lib/idb/playerIdb";

interface PlayerNameModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function PlayerNameModal({
  isOpen,
  onConfirm,
  onClose,
}: PlayerNameModalProps) {
  const [name, setName] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadPlayerProfile();
    }
  }, [isOpen]);

  const loadPlayerProfile = async () => {
    try {
      const profile = await getOrCreatePlayerProfile();
      setDeviceId(profile.deviceId);
      setName(profile.name || "");
    } catch (err) {
      console.error("Error loading player profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Vui lòng nhập tên của bạn");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Tên phải có ít nhất 2 ký tự");
      return;
    }

    if (trimmedName.length > 20) {
      setError("Tên không được quá 20 ký tự");
      return;
    }

    try {
      await updatePlayerName(deviceId, trimmedName);
      onConfirm();
    } catch (err) {
      console.error("Error updating player name:", err);
      setError("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-amber-900/95 to-amber-950/95 border-2 border-amber-500/50 text-white">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-full shadow-lg shadow-amber-500/50">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>
          <DialogTitle className="text-3xl font-bold text-center text-amber-300">
            Chào mừng bạn!
          </DialogTitle>
          <DialogDescription className="text-center text-white/80">
            Nhập tên của bạn để bắt đầu chơi
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-t-transparent"></div>
            <p className="text-white/60 mt-4">Đang tải...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Tên của bạn
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Nhập tên (2-20 ký tự)"
                maxLength={20}
                className="w-full p-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 text-white placeholder:text-white/50"
                autoFocus
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Bắt đầu chơi
            </Button>

            {/* Info Text */}
            <p className="text-center text-white/60 text-xs">
              Tên của bạn sẽ được lưu và hiển thị trên bảng xếp hạng
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
