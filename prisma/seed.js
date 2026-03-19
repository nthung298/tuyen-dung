import { PrismaClient, jobs_jobType } from '@prisma/client';

const prisma = new PrismaClient();

const jobs = [
  {
    id: "job_001",
    slug: "giang-vien-chinh-kien-truc",
    title: "Giảng viên chính - Kiến trúc Công trình",
    department: "Khoa Kiến Trúc",
    jobType: jobs_jobType.full_time,
    location: "Hà Nội",
    description: "Trường Đại học Kiến trúc Hà Nội tuyển dụng Giảng viên chính chuyên ngành Kiến trúc Công trình. Ứng viên sẽ tham gia giảng dạy các môn học về thiết kế kiến trúc công trình, lý thuyết kiến trúc, và hướng dẫn sinh viên thực hiện đồ án tốt nghiệp. Ngoài ra, tham gia nghiên cứu khoa học và các dự án hợp tác với các đơn vị trong và ngoài nước.",
    responsibilities: JSON.stringify([
      "Giảng dạy các môn học chuyên ngành Kiến trúc Công trình theo chương trình đào tạo của Trường",
      "Hướng dẫn sinh viên thực hiện đồ án thiết kế kiến trúc, luận văn tốt nghiệp",
      "Tham gia các đề tài nghiên cứu khoa học cấp Trường, Bộ và Quốc tế",
      "Tham gia xây dựng và phát triển chương trình đào tạo, biên soạn giáo trình, tài liệu giảng dạy",
      "Tổ chức và tham gia các hội thảo khoa học, hoạt động giao lưu quốc tế",
      "Phụ trách các hoạt động chuyên môn của bộ môn"
    ]),
    requirements: JSON.stringify([
      "Có bằng Tiến sĩ chuyên ngành Kiến trúc hoặc Kiến trúc Công trình",
      "Có kinh nghiệm giảng dạy đại học tối thiểu 5 năm",
      "Có ít nhất 3 năm kinh nghiệm thực hành thiết kế kiến trúc công trình",
      "Thành thạo các phần mềm thiết kế: AutoCAD, Revit, SketchUp, Photoshop",
      "Có khả năng giao tiếp và giảng dạy bằng tiếng Anh (IELTS 6.0 trở lên)",
      "Ưu tiên ứng viên có các công trình kiến trúc đã thực hiện được công bố"
    ]),
    benefits: JSON.stringify([
      "Mức lương theo quy định của Nhà nước và Trường ĐHKTHN (hệ số lương theo trình độ)",
      "Phụ cấp giảng dạy và phụ cấp thâm niên theo quy định",
      "Được hưởng đầy đủ các chế độ bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp",
      "Cơ hội đào tạo nâng cao trình độ (thạc sĩ, tiến sĩ) tại nước ngoài",
      "Được sử dụng các phòng thí nghiệm, thư viện và cơ sở vật chất hiện đại của Trường",
      "Hỗ trợ nhà ở cho giảng viên công tác tại Hà Nội (nếu đủ điều kiện)"
    ]),
    deadline: new Date("2026-06-30"),
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: new Date("2026-03-15")
  },
  {
    id: "job_002",
    slug: "giang-vien-quy-hoach-vung-mien",
    title: "Giảng viên - Quy hoạch Vùng và Đô thị",
    department: "Khoa Quy hoạch",
    jobType: jobs_jobType.full_time,
    location: "Hà Nội",
    description: "Tuyển dụng Giảng viên chuyên ngành Quy hoạch Vùng và Đô thị. Ứng viên sẽ tham gia giảng dạy các môn về quy hoạch đô thị, quy hoạch vùng, và hướng dẫn sinh viên thực hiện các đồ án quy hoạch thực tế.",
    responsibilities: JSON.stringify([
      "Giảng dạy các môn học: Quy hoạch đô thị, Quy hoạch vùng, Thiết kế đô thị, Luật quy hoạch",
      "Hướng dẫn sinh viên thực hiện đồ án quy hoạch các cấp",
      "Tham gia nghiên cứu các đề tài về phát triển đô thị bền vững",
      "Tư vấn và tham gia các dự án quy hoạch thực tế",
      "Xuất bản các bài báo khoa học trong nước và quốc tế"
    ]),
    requirements: JSON.stringify([
      "Bằng Thạc sĩ trở lên chuyên ngành Quy hoạch Đô thị hoặc Quy hoạch Vùng",
      "Có kinh nghiệm làm việc trong lĩnh vực quy hoạch tối thiểu 3 năm",
      "Thành thạo phần mềm GIS, AutoCAD, Photoshop, SketchUp",
      "Có khả năng phân tích dữ liệu không gian và thống kê",
      "Ưu tiên ứng viên đã tham gia các dự án quy hoạch lớn"
    ]),
    benefits: JSON.stringify([
      "Lương và phụ cấp theo quy định Nhà nước",
      "Bảo hiểm xã hội, y tế đầy đủ",
      "Cơ hội tham gia các dự án nghiên cứu quốc tế",
      "Hỗ trợ chi phí tham dự hội thảo trong nước",
      "Môi trường làm việc học thuật chuyên nghiệp"
    ]),
    deadline: new Date("2026-06-15"),
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: new Date("2026-03-18")
  },
  {
    id: "job_003",
    slug: "nghien-cuu-sinh-ky-thuat-xay-dung",
    title: "Nghiên cứu sinh - Kỹ thuật Xây dựng",
    department: "Khoa Xây dựng",
    jobType: jobs_jobType.full_time,
    location: "Hà Nội",
    description: "Tuyển Nghiên cứu sinh tham gia các đề tài nghiên cứu về kết cấu công trình, vật liệu xây dựng mới và công nghệ xây dựng tiên tiến tại Khoa Xây dựng.",
    responsibilities: JSON.stringify([
      "Tham gia các đề tài nghiên cứu về kết cấu công trình",
      "Nghiên cứu và phát triển vật liệu xây dựng mới",
      "Hỗ trợ giảng dạy các môn thực hành trong phòng thí nghiệm",
      "Viết báo cáo khoa học và tham gia hội thảo"
    ]),
    requirements: JSON.stringify([
      "Có bằng Thạc sĩ chuyên ngành Kỹ thuật Xây dựng hoặc Kết cấu Công trình",
      "Có năng lực nghiên cứu và khả năng làm việc độc lập",
      "Thành thạo các phần mềm phân tích kết cấu: SAP2000, ETABS, SAFE",
      "Có khả năng viết báo cáo khoa học bằng tiếng Anh"
    ]),
    benefits: JSON.stringify([
      "Học bổng nghiên cứu sinh toàn phần",
      "Hỗ trợ kinh phí nghiên cứu và mua sắm thiết bị",
      "Cơ hội đào tạo tiến sĩ tại nước ngoài",
      "Được sử dụng phòng thí nghiệm hiện đại"
    ]),
    deadline: new Date("2026-05-30"),
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: new Date("2026-03-10")
  },
  {
    id: "job_004",
    slug: "chuyen-vien-hanh-chinh-cong-tac-sinh-vien",
    title: "Chuyên viên Hành chính - Công tác Sinh viên",
    department: "Phòng Công tác Sinh viên",
    jobType: jobs_jobType.full_time,
    location: "Hà Nội",
    description: "Phòng Công tác Sinh viên tuyển dụng Chuyên viên hỗ trợ công tác sinh viên, quản lý hồ sơ, và các hoạt động ngoại khóa.",
    responsibilities: JSON.stringify([
      "Quản lý hồ sơ sinh viên và cơ sở dữ liệu",
      "Tổ chức các hoạt động ngoại khóa, văn hóa, thể thao",
      "Hỗ trợ công tác chế độ chính sách cho sinh viên",
      "Phối hợp với các khoa trong công tác sinh viên",
      "Lập báo cáo thống kê định kỳ"
    ]),
    requirements: JSON.stringify([
      "Bằng Đại học trở lên các ngành: Quản trị, Luật, hoặc sư phạm",
      "Có kinh nghiệm trong công tác sinh viên hoặc hành chính",
      "Kỹ năng giao tiếp và soạn thảo văn bản tốt",
      "Sử dụng thành thạo máy tính và các phần mềm văn phòng",
      "Năng động, trách nhiệm, yêu thích công tác sinh viên"
    ]),
    benefits: JSON.stringify([
      "Lương theo quy định của Trường",
      "Phụ cấp và thưởng theo hiệu quả công việc",
      "Bảo hiểm đầy đủ",
      "Được tham gia các khóa đào tạo nâng cao",
      "Môi trường làm việc năng động, thân thiện"
    ]),
    deadline: new Date("2026-04-30"),
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: new Date("2026-03-12")
  },
  {
    id: "job_005",
    slug: "tro-giang-thiet-ke-noi-that",
    title: "Trợ giảng - Thiết kế Nội thất",
    department: "Khoa Kiến Trúc",
    jobType: jobs_jobType.part_time,
    location: "Hà Nội",
    description: "Tuyển Trợ giảng hỗ trợ giảng dạy môn Thiết kế Nội thất cho sinh viên năm cuối.",
    responsibilities: JSON.stringify([
      "Hỗ trợ giảng dạy các môn thực hành thiết kế nội thất",
      "Hướng dẫn sinh viên sử dụng phần mềm thiết kế 3D",
      "Chuẩn bị tài liệu giảng dạy và mẫu bài tập",
      "Tham gia chấm điểm đồ án"
    ]),
    requirements: JSON.stringify([
      "Sinh viên năm cuối hoặc mới tốt nghiệp ngành Thiết kế Nội thất",
      "Thành thạo phần mềm: AutoCAD, 3ds Max, V-Ray, SketchUp",
      "Có khả năng truyền đạt kiến thức tốt",
      "Sáng tạo, cẩn thận trong công việc"
    ]),
    benefits: JSON.stringify([
      "Phụ cấp theo giờ giảng",
      "Được cấp chứng nhận Trợ giảng của Trường",
      "Cơ hội học tập và phát triển kỹ năng sư phạm",
      "Môi trường làm việc chuyên nghiệp"
    ]),
    deadline: new Date("2026-04-15"),
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: new Date("2026-03-16")
  },
  {
    id: "job_006",
    slug: "chuyen-vien-phong-dao-tao",
    title: "Chuyên viên Phòng Đào tạo",
    department: "Phòng Đào tạo",
    jobType: jobs_jobType.full_time,
    location: "Hà Nội",
    description: "Phòng Đào tạo tuyển dụng Chuyên viên quản lý đào tạo, hỗ trợ công tác giảng dạy và quản lý chương trình học.",
    responsibilities: JSON.stringify([
      "Quản lý chương trình đào tạo và kế hoạch học tập",
      "Hỗ trợ công tác xếp lịch thi, lịch học",
      "Lập báo cáo thống kê về đào tạo",
      "Tiếp nhận và xử lý các yêu cầu của sinh viên",
      "Phối hợp với các khoa trong công tác đào tạo"
    ]),
    requirements: JSON.stringify([
      "Bằng Đại học trở lên ngành Quản trị, Sư phạm hoặc các ngành liên quan",
      "Có kinh nghiệm trong công tác đào tạo hoặc hành chính",
      "Thành thạo Excel và các phần mềm quản lý",
      "Kỹ năng tổ chức và làm việc nhóm tốt",
      "Có khả năng làm việc dưới áp lực cao"
    ]),
    benefits: JSON.stringify([
      "Lương và phụ cấp theo quy định",
      "Bảo hiểm xã hội, y tế đầy đủ",
      "Cơ hội thăng tiến trong ngành giáo dục",
      "Được tham gia các khóa đào tạo chuyên môn"
    ]),
    deadline: new Date("2026-05-20"),
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: new Date("2026-03-14")
  },
  {
    id: "job_007",
    slug: "chuyen-vien-cong-nghe-thong-tin",
    title: "Chuyên viên Công nghệ Thông tin",
    department: "Trung tâm CNTT",
    jobType: jobs_jobType.full_time,
    location: "Hà Nội",
    description: "Trung tâm CNTT tuyển dụng Chuyên viên quản lý hệ thống, phát triển ứng dụng và hỗ trợ kỹ thuật.",
    responsibilities: JSON.stringify([
      "Quản lý và duy trì hệ thống mạng, máy chủ",
      "Phát triển và bảo trì các ứng dụng của Trường",
      "Hỗ trợ kỹ thuật cho cán bộ, giảng viên và sinh viên",
      "Đảm bảo an ninh mạng và sao lưu dữ liệu",
      "Viết tài liệu kỹ thuật và hướng dẫn sử dụng"
    ]),
    requirements: JSON.stringify([
      "Bằng Đại học trở lên ngành CNTT, Khoa học Máy tính hoặc liên quan",
      "Có kinh nghiệm quản trị hệ thống Linux/Windows Server",
      "Biết lập trình web (React, Node.js) là lợi thế",
      "Có khả năng phân tích và xử lý sự cố",
      "Chủ động, trách nhiệm trong công việc"
    ]),
    benefits: JSON.stringify([
      "Lương cạnh tranh theo năng lực",
      "Phụ cấp thiết bị và đào tạo chuyên sâu",
      "Cơ hội phát triển nghề nghiệp",
      "Lịch làm việc linh hoạt"
    ]),
    deadline: new Date("2026-05-10"),
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: new Date("2026-03-17")
  },
  {
    id: "job_008",
    slug: "giang-vien-thuc-hanh-ve-ky-thuat-my-thuat",
    title: "Giảng viên Thực hành - Vẽ kỹ thuật & Mỹ thuật",
    department: "Khoa Kiến Trúc",
    jobType: jobs_jobType.contract,
    location: "Hà Nội",
    description: "Tuyển dụng Giảng viên thực hành môn Vẽ kỹ thuật và Mỹ thuật cơ sở cho sinh viên năm nhất.",
    responsibilities: JSON.stringify([
      "Giảng dạy thực hành môn Vẽ kỹ thuật",
      "Giảng dạy môn Mỹ thuật cơ sở",
      "Hướng dẫn sinh viên các kỹ năng vẽ tay và vẽ trên máy",
      "Chấm bài tập và đánh giá kết quả học tập",
      "Tham gia các buổi workshop về vẽ và sáng tác"
    ]),
    requirements: JSON.stringify([
      "Bằng Đại học trở lên các ngành: Mỹ thuật, Kiến trúc, Thiết kế",
      "Có kinh nghiệm giảng dạy hoặc hướng dẫn vẽ",
      "Thành thạo các kỹ thuật vẽ: bút chì, màu nước, bột",
      "Biết sử dụng các phần mềm vẽ kỹ thuật",
      "Yêu nghề, nhiệt tình với sinh viên"
    ]),
    benefits: JSON.stringify([
      "Hợp đồng lao động có thời hạn với mức lương hấp dẫn",
      "Phụ cấp giảng dạy theo số giờ",
      "Được sử dụng cơ sở vật chất của Trường",
      "Cơ hội gia hạn hợp đồng và tăng lương"
    ]),
    deadline: new Date("2026-04-20"),
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: new Date("2026-03-11")
  },
  {
    id: "job_009",
    slug: "chuyen-vien-thu-vien",
    title: "Chuyên viên Thư viện",
    department: "Thư viện",
    jobType: jobs_jobType.full_time,
    location: "Hà Nội",
    description: "Thư viện Trường tuyển dụng Chuyên viên quản lý sách, hỗ trợ tra cứu và phát triển nguồn tài liệu.",
    responsibilities: JSON.stringify([
      "Quản lý và phân loại tài liệu trong thư viện",
      "Hỗ trợ sinh viên và giảng viên tra cứu tài liệu",
      "Phát triển nguồn tài liệu mới theo yêu cầu của các khoa",
      "Tổ chức các buổi giới thiệu sách, triển lãm",
      "Quản lý hệ thống thư viện điện tử"
    ]),
    requirements: JSON.stringify([
      "Bằng Đại học trở lên ngành Thư viện hoặc các ngành liên quan",
      "Có kinh nghiệm trong công tác thư viện là lợi thế",
      "Thành thạo các phần mềm quản lý thư viện",
      "Kỹ năng giao tiếp và phục vụ tốt",
      "Cẩn thận, tỉ mỉ trong công việc"
    ]),
    benefits: JSON.stringify([
      "Lương theo quy định của Trường",
      "Phụ cấp và các chế độ khác",
      "Môi trường làm việc yên tĩnh, thân thiện",
      "Cơ hội đào tạo chuyên môn về thư viện"
    ]),
    deadline: new Date("2026-05-15"),
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: new Date("2026-03-13")
  },
  {
    id: "job_010",
    slug: "giang-vien-kinh-te-xay-dung-quan-ly-du-an",
    title: "Giảng viên - Kinh tế Xây dựng & Quản lý Dự án",
    department: "Khoa Kinh tế",
    jobType: jobs_jobType.full_time,
    location: "Hà Nội",
    description: "Khoa Kinh tế tuyển dụng Giảng viên chuyên ngành Kinh tế Xây dựng và Quản lý Dự án. Ứng viên sẽ giảng dạy các môn về dự toán công trình, quản lý dự án, và đấu thầu.",
    responsibilities: JSON.stringify([
      "Giảng dạy các môn: Kinh tế Xây dựng, Quản lý Dự án, Đấu thầu, Dự toán Công trình",
      "Hướng dẫn sinh viên thực hiện đồ án môn học và tốt nghiệp",
      "Tham gia nghiên cứu khoa học về quản lý xây dựng",
      "Tư vấn và tham gia các dự án thực tế trong ngành",
      "Biên soạn giáo trình và tài liệu giảng dạy chuyên ngành"
    ]),
    requirements: JSON.stringify([
      "Bằng Thạc sĩ trở lên chuyên ngành Kinh tế Xây dựng, Quản lý Dự án hoặc Kỹ thuật Xây dựng",
      "Có kinh nghiệm làm việc trong lĩnh vực quản lý dự án xây dựng tối thiểu 3 năm",
      "Thành thạo phần mềm dự toán: Delta, Acitt, G8",
      "Có chứng chỉ PMP hoặc tương đương là lợi thế",
      "Kỹ năng giao tiếp và làm việc nhóm tốt"
    ]),
    benefits: JSON.stringify([
      "Lương và phụ cấp theo quy định Nhà nước và Trường",
      "Phụ cấp giảng dạy và thâm niên",
      "Được hưởng đầy đủ chế độ bảo hiểm",
      "Cơ hội tham gia các dự án nghiên cứu và tư vấn",
      "Hỗ trợ đào tạo nâng cao trình độ"
    ]),
    deadline: new Date("2026-06-25"),
    contactEmail: "tuyendung@hau.edu.vn",
    createdAt: new Date("2026-03-19")
  }
];

async function main() {
  console.log('Fixing charset and seeding jobs...');
  
  // Fix charset first
  try {
    await prisma.$executeRaw`ALTER TABLE \`jobs\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`;
    console.log('Fixed charset for jobs table');
  } catch (e) {
    console.log('Could not fix charset (table may not exist or already fixed)');
  }
  
  // Clear existing jobs
  await prisma.jobs.deleteMany();
  console.log('Cleared existing jobs');
  
  // Insert new jobs
  for (const job of jobs) {
    await prisma.jobs.create({
      data: job,
    });
    console.log(`Created job: ${job.title}`);
  }
  
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
