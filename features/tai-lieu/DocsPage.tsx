"use client";

import Link from "next/link";
import { getAllPosts } from "@/features/tai-lieu/data";
import TimelineSection from "@/features/home/components/TimelineSection";

const TaiLieuPage = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 sm:mb-8 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            <span>Quay lại</span>
          </Link>

          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
              Tư tưởng Hồ Chí Minh
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full"></div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 mb-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
              Giới thiệu
            </h2>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed">
              Tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện và sâu sắc về
              những vấn đề cơ bản của cách mạng Việt Nam, là kết quả của sự vận
              dụng sáng tạo chủ nghĩa Mác - Lênin vào điều kiện cụ thể của Việt
              Nam, kế thừa và phát triển các giá trị truyền thống tốt đẹp của
              dân tộc, tiếp thu tinh hoa văn hóa nhân loại.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section giống như Homepage */}
      <TimelineSection posts={posts} linkPrefix="/tai-lieu" />
    </div>
  );
};

export default TaiLieuPage;
