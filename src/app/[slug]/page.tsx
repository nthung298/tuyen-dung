import { getJobBySlug } from "@/app/actions";
import { notFound } from "next/navigation";
import JobDetailClient from "./JobDetailClient";

interface JobDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  
  if (!job) {
    return {
      title: "Không tìm thấy | Tuyển dụng",
    };
  }
  
  return {
    title: `${job.title} | Tuyển dụng`,
    description: job.description,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  
  if (!job) {
    notFound();
  }
  
  return <JobDetailClient job={job} />;
}
