import { getJobs } from "@/app/actions";
import AdminRecruitmentClient from "./AdminRecruitmentClient";

export const metadata = {
  title: "Quản trị Tuyển dụng",
};

export default async function AdminRecruitmentPage() {
  const jobs = await getJobs();
  return <AdminRecruitmentClient initialJobs={jobs} />;
}
