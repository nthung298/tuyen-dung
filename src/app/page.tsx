import { Suspense } from "react";
import { getJobs } from "@/app/actions";
import RecruitmentListClient from "./RecruitmentListClient";

export const metadata = {
  title: "Tuyển dụng | Khoa Kiến Trúc - Đại học Kiến trúc Hà Nội",
  description: "Cơ hội nghề nghiệp tại Khoa Kiến Trúc – Đại học Kiến trúc Hà Nội",
};

export default async function RecruitmentListPage() {
  const jobs = await getJobs();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecruitmentListClient jobs={jobs} />
    </Suspense>
  );
}
