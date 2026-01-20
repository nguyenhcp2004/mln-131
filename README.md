# Trò chơi Tư tưởng Hồ Chí Minh

Game giáo dục về chủ đề "Đảng Cộng sản Việt Nam và Nhà nước của nhân dân, do nhân dân, vì nhân dân"

## 🎮 Tính năng

- **3 màn chơi**:
  - Màn 1: Trắc nghiệm (9 mảnh ghép)
  - Màn 2: Điền từ (9 mảnh ghép)
  - Màn 3: Ghép hình (18 mảnh)

- **100 câu hỏi** ngẫu nhiên mỗi lần chơi
- **Timer** đếm thời gian hoàn thành
- **Bảng xếp hạng** top 10 người chơi nhanh nhất
- **Giao diện cách mạng** với màu đỏ-vàng
- **Responsive** trên mọi thiết bị

## 🚀 Cài đặt

```bash
npm install
npm run dev
```

Truy cập: `http://localhost:3000/game`

## 📁 Cấu trúc dự án

```
├── app/
│   ├── game/page.tsx       # Game page
│   ├── page.tsx            # Home (redirect to /game)
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── features/game/          # Game feature module
│   ├── components/         # 12 UI components
│   ├── context/            # State management
│   ├── hooks/              # Custom hooks
│   └── lib/                # Utilities
├── data/
│   └── questions.json      # 100 câu hỏi
├── types/
│   └── game.ts             # TypeScript types
└── public/
    └── image/anh1.jpg      # Puzzle image
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React

## 📝 Cách chơi

1. **Màn 1**: Trả lời đúng 9 câu trắc nghiệm để thu thập 9 mảnh ghép
2. **Màn 2**: Điền đúng 9 từ vào chỗ trống để thu thập 9 mảnh ghép tiếp theo
3. **Màn 3**: Kéo thả 18 mảnh ghép vào đúng vị trí để hoàn thành bức tranh
4. Nhập tên và lưu điểm vào bảng xếp hạng!

## 📄 License

MIT
