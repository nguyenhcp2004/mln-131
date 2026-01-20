export interface PrinciplePoint {
  label: string;
  content: string;
}

export interface Principle {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  points: PrinciplePoint[];
}

export const PRINCIPLES_DATA: Principle[] = [
  {
    number: "01",
    title: "Nguyên tắc Tập trung dân chủ",
    subtitle: "Nền tảng của sự thống nhất",
    description:
      "Hồ Chí Minh đưa ra quan điểm về tập trung dân chủ với hai mặt khăng khít: Tập trung trên nền tảng dân chủ và Dân chủ phải đi đến tập trung.",
    points: [
      {
        label: "Tập trung trên cơ sở dân chủ",
        content:
          "Khuyến khích đảng viên bày tỏ hết ý kiến trong Đảng để tạo tinh thần trách nhiệm và tính tích cực. Ý kiến sau khi thảo luận được cấp trên lắng nghe, rồi mới tập trung.",
      },
      {
        label: "Dân chủ đi đến tập trung",
        content:
          "Tập trung dân chủ là điều kiện tiên quyết để Đảng trong sạch và vững mạnh. Cần tránh hai căn bệnh: (1) Độc đoán, chuyên quyền, coi thường tập thể; (2) Dựa dẫm tập thể, không dám quyết đoán.",
      },
      {
        label: "Tổ chức và kỷ luật",
        content:
          "Tập thể lãnh đạo, cá nhân phụ trách. Cá nhân phục tùng tổ chức, thiểu số phục tùng đa số, cấp dưới phục tùng cấp trên, toàn Đảng phục tùng Trung ương.",
      },
    ],
  },
  {
    number: "02",
    title: "Nguyên tắc Tự phê bình và Phê bình",
    subtitle: '"Thang thuốc tốt nhất"',
    description:
      "Hồ Chí Minh coi tự phê bình và phê bình là phương pháp và công cụ không thể thiếu để xây dựng Đảng, như 'mỗi ngày phải rửa mặt'.",
    points: [
      {
        label: "Vai trò củng cố đoàn kết",
        content:
          'Phê bình là "thang thuốc" tốt nhất để củng cố đoàn kết và thống nhất. Giúp phần tốt nảy nở như hoa mùa xuân, còn phần xấu mất dần đi.',
      },
      {
        label: "Yêu cầu phương pháp",
        content:
          'Phê bình phải trung thực, kiên quyết, đúng người, đúng việc, có văn hóa. Đồng thời giữ được "tình đồng chí thương yêu lẫn nhau".',
      },
      {
        label: "Mục đích",
        content:
          "Tăng cường sức mạnh của Đảng, đảm bảo sự thống nhất và đoàn kết, sửa chữa sai lầm, khuyết điểm.",
      },
    ],
  },
  {
    number: "03",
    title: "Nguyên tắc Kỷ luật nghiêm minh, tự giác",
    subtitle: "Sức mạnh đồng nhất",
    description:
      "Để Đảng là một khối thống nhất và hành động theo một ý chí duy nhất, Đảng phải xây dựng trên nguyên tắc kỷ luật nghiêm minh và tự giác.",
    points: [
      {
        label: "Tính nghiêm minh",
        content:
          '"Đảng tổ chức rất nghiêm, khác với các đảng phái khác". Chấp hành kỷ luật là điều kiện bắt buộc. Không có kỷ luật sắt, Đảng không thể thắng lợi.',
      },
      {
        label: "Tính tự giác",
        content:
          "Kỷ luật phải là kỷ luật tự giác, nền tảng là lòng tự giác của đảng viên về nhiệm vụ đối với Đảng. Khi giác ngộ kỷ luật, mới thật sự tạo sức mạnh cho Đảng.",
      },
      {
        label: "Thực hiện nghiêm",
        content:
          "Kỷ luật phải được thực hiện nghiêm từ trên xuống dưới, đảm bảo sự thống nhất trong hành động.",
      },
    ],
  },
];
