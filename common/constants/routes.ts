export const CONTENT_ROUTES = [
  {
    name: "Tính tất yếu và vai trò lãnh đạo của Đảng Cộng sản Việt Nam",
    path: "/contents/tinh-tat-yeu-va-vai-tro-lanh-dao",
    number: "01"
  },
  {
    name: "Đảng phải trong sạch, vững mạnh",
    path: "/contents/dang-phai-trong-sach-vung-manh",
    number: "02"
  },
  {
    name: "Nguyên tắc tổ chức và sinh hoạt cơ bản của Đảng",
    path: "/contents/nguyen-tac-to-chuc-cua-dang",
    number: "03"
  },
  {
    name: "Bản chất giai cấp công nhân của Nhà nước và nguyên lý Nhà nước của nhân dân",
    path: "/contents/Ban-chat-nha-nuoc",
    number: "04"
  },
  {
    name: "Nhà nước do nhân dân('Dân làm chủ') và Nhà nước vì nhân dân",
    path: "/contents/Nha-nuoc-do-nhan-dan-va-nha-nuoc-vi-nhan-dan",
    number: "05"
  },
  {
    name: "Xây dựng Nhà nước pháp quyền xã hội chủ nghĩa",
    path: "/contents/Xay-dung-Nha-nuoc-phap-quyen",
    number: "06"
  },
  {
    name: "Nhà nước trong sạch, vững mạnh",
    path: "/contents/Nha-nuoc-trong-sach-vung-manh",
    number: "07"
  },
  {
    name: "Thực tiễn tại Việt Nam",
    path: "/thuc-tien-hien-nay",
    number: "08"
  }
] as const;

export type ContentRoute = (typeof CONTENT_ROUTES)[number];
