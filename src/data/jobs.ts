export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  jobType: "full-time" | "part-time" | "contract";
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  deadline: string | Date;
  contactEmail: string;
  createdAt: string | Date;
}

export interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  cvFile: File | null;
  coverLetter: string;
  submittedAt: string;
}

export const departments = [
  "Khoa Kiến Trúc",
  "Khoa Quy hoạch",
  "Khoa Xây dựng",
  "Khoa Nội thất",
  "Phòng Đào tạo",
  "Phòng Hành chính",
];

export const jobTypeLabels: Record<string, string> = {
  "full-time": "Toàn thời gian",
  "part-time": "Bán thời gian",
  "contract": "Hợp đồng",
};

export const mockJobs: Job[] = [
  {
    id: "1",
    slug: "giang-vien-kien-truc",
    title: "Giảng viên Kiến trúc",
    department: "Khoa Kiến Trúc",
    jobType: "full-time",
    location: "Hà Nội",
    description: "Trường Đại học Kiến trúc Hà Nội tuyển dụng giảng viên giảng dạy các môn chuyên ngành Kiến trúc. Ứng viên sẽ tham gia giảng dạy, nghiên cứu khoa học và hướng dẫn sinh viên thực hiện đồ án tốt nghiệp.",
    responsibilities: [
      "Giảng dạy các môn học chuyên ngành Kiến trúc theo chương trình đào tạo",
      "Hướng dẫn sinh viên thực hiện đồ án, luận văn tốt nghiệp",
      "Tham gia nghiên cứu khoa học và các dự án hợp tác",
      "Tham gia xây dựng chương trình đào tạo và giáo trình",
      "Tham gia các hoạt động học thuật, hội thảo khoa học",
    ],
    requirements: [
      "Bằng Thạc sĩ trở lên chuyên ngành Kiến trúc",
      "Có kinh nghiệm giảng dạy hoặc thực hành kiến trúc tối thiểu 2 năm",
      "Có khả năng sử dụng thành thạo các phần mềm thiết kế kiến trúc",
      "Ưu tiên ứng viên có bài báo khoa học đã công bố",
      "Có khả năng giao tiếp tiếng Anh tốt",
    ],
    benefits: [
      "Mức lương cạnh tranh theo quy định của Nhà nước và Trường",
      "Bảo hiểm xã hội, bảo hiểm y tế đầy đủ",
      "Cơ hội đào tạo nâng cao trình độ trong và ngoài nước",
      "Môi trường làm việc học thuật chuyên nghiệp",
      "Hỗ trợ nhà ở cho giảng viên từ tỉnh khác",
    ],
    deadline: "2026-04-30",
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: "2026-03-01",
  },
  {
    id: "2",
    slug: "nghien-cuu-sinh-quy-hoach",
    title: "Nghiên cứu sinh – Quy hoạch đô thị",
    department: "Khoa Quy hoạch",
    jobType: "full-time",
    location: "Hà Nội",
    description: "Tuyển nghiên cứu sinh tham gia các đề tài nghiên cứu về quy hoạch đô thị bền vững, phát triển không gian đô thị thông minh tại Việt Nam.",
    responsibilities: [
      "Tham gia các dự án nghiên cứu về quy hoạch đô thị",
      "Thu thập và phân tích dữ liệu nghiên cứu",
      "Viết báo cáo và bài báo khoa học",
      "Hỗ trợ giảng dạy các lớp thực hành",
    ],
    requirements: [
      "Bằng Thạc sĩ chuyên ngành Quy hoạch hoặc liên quan",
      "Có kỹ năng nghiên cứu và phân tích dữ liệu tốt",
      "Thành thạo GIS và các công cụ phân tích không gian",
      "Có định hướng nghiên cứu rõ ràng",
    ],
    benefits: [
      "Học bổng nghiên cứu sinh toàn phần",
      "Hỗ trợ kinh phí tham dự hội thảo quốc tế",
      "Cơ hội hợp tác nghiên cứu với đối tác nước ngoài",
      "Được sử dụng cơ sở vật chất nghiên cứu hiện đại",
    ],
    deadline: "2026-05-15",
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: "2026-03-05",
  },
  {
    id: "3",
    slug: "chuyen-vien-hanh-chinh",
    title: "Chuyên viên Hành chính – Tổ chức",
    department: "Phòng Hành chính",
    jobType: "full-time",
    location: "Hà Nội",
    description: "Tuyển chuyên viên phụ trách công tác hành chính, tổ chức sự kiện và hỗ trợ các hoạt động của Khoa Kiến trúc.",
    responsibilities: [
      "Quản lý hồ sơ, văn bản hành chính",
      "Tổ chức sự kiện, hội thảo khoa học",
      "Hỗ trợ công tác tuyển sinh và đào tạo",
      "Liên hệ và phối hợp với các đơn vị trong trường",
    ],
    requirements: [
      "Bằng Cử nhân trở lên ngành Quản trị hoặc liên quan",
      "Kỹ năng giao tiếp và tổ chức tốt",
      "Thành thạo tin học văn phòng",
      "Kinh nghiệm 1 năm ở vị trí tương tự",
    ],
    benefits: [
      "Lương theo quy định Nhà nước",
      "Bảo hiểm đầy đủ",
      "Nghỉ phép theo quy định",
      "Môi trường làm việc ổn định",
    ],
    deadline: "2026-04-15",
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: "2026-03-10",
  },
  {
    id: "4",
    slug: "tro-giang-thiet-ke-noi-that",
    title: "Trợ giảng Thiết kế Nội thất",
    department: "Khoa Nội thất",
    jobType: "part-time",
    location: "Hà Nội",
    description: "Tuyển trợ giảng hỗ trợ giảng viên trong các buổi học thực hành thiết kế nội thất, hướng dẫn sinh viên sử dụng phần mềm chuyên ngành.",
    responsibilities: [
      "Hỗ trợ giảng viên trong các buổi thực hành",
      "Hướng dẫn sinh viên sử dụng phần mềm 3D",
      "Chấm bài tập và nhận xét đồ án",
      "Chuẩn bị tài liệu giảng dạy",
    ],
    requirements: [
      "Sinh viên năm cuối hoặc tốt nghiệp ngành Nội thất",
      "Thành thạo SketchUp, 3ds Max hoặc Revit",
      "Có tinh thần trách nhiệm cao",
      "Giao tiếp tốt với sinh viên",
    ],
    benefits: [
      "Phụ cấp trợ giảng hấp dẫn",
      "Cơ hội được tuyển dụng chính thức",
      "Kinh nghiệm giảng dạy thực tế",
      "Chứng nhận kinh nghiệm",
    ],
    deadline: "2026-04-20",
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: "2026-03-08",
  },
  {
    id: "5",
    slug: "giang-vien-xay-dung",
    title: "Giảng viên Kỹ thuật Xây dựng",
    department: "Khoa Xây dựng",
    jobType: "full-time",
    location: "Hà Nội",
    description: "Tuyển giảng viên giảng dạy các môn kỹ thuật xây dựng, kết cấu công trình và vật liệu xây dựng.",
    responsibilities: [
      "Giảng dạy các môn kỹ thuật xây dựng",
      "Nghiên cứu về vật liệu và công nghệ xây dựng mới",
      "Hướng dẫn sinh viên thực tập tại công trình",
      "Tham gia dự án tư vấn kỹ thuật",
    ],
    requirements: [
      "Bằng Thạc sĩ trở lên ngành Xây dựng",
      "Có chứng chỉ hành nghề xây dựng là lợi thế",
      "Kinh nghiệm thực tế tối thiểu 3 năm",
      "Khả năng sử dụng SAP2000, ETABS",
    ],
    benefits: [
      "Lương cạnh tranh",
      "Phụ cấp giảng dạy",
      "Bảo hiểm toàn diện",
      "Đào tạo nâng cao tại nước ngoài",
    ],
    deadline: "2026-05-01",
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: "2026-03-12",
  },
  {
    id: "6",
    slug: "chuyen-vien-dao-tao",
    title: "Chuyên viên Phòng Đào tạo",
    department: "Phòng Đào tạo",
    jobType: "contract",
    location: "Hà Nội",
    description: "Tuyển chuyên viên phụ trách công tác quản lý đào tạo, xếp lịch giảng dạy và hỗ trợ sinh viên trong quá trình học tập.",
    responsibilities: [
      "Quản lý kế hoạch đào tạo hàng kỳ",
      "Xếp thời khóa biểu và phòng học",
      "Hỗ trợ sinh viên đăng ký học phần",
      "Tổng hợp và báo cáo kết quả đào tạo",
    ],
    requirements: [
      "Bằng Cử nhân ngành liên quan",
      "Kinh nghiệm quản lý đào tạo 1 năm",
      "Kỹ năng Excel nâng cao",
      "Cẩn thận, tỉ mỉ trong công việc",
    ],
    benefits: [
      "Hợp đồng 1 năm, có gia hạn",
      "Bảo hiểm đầy đủ",
      "Nghỉ lễ, phép theo quy định",
      "Cơ hội trở thành nhân viên chính thức",
    ],
    deadline: "2026-04-10",
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: "2026-03-14",
  },
];
