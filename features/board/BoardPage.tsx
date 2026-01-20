import Link from "next/link";

const BoardPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
        >
          <span>←</span> Quay lại
        </Link>

        <h1 className="text-5xl font-bold text-white mb-6">Board</h1>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <p className="text-white/90 text-lg leading-relaxed">
            Chào mừng đến với trang Board. Nội dung sẽ được cập nhật sớm!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
