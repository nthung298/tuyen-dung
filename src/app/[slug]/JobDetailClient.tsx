"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Building2, CalendarDays, Mail } from "lucide-react";
import PageBanner from "@/components/layout/PageBanner";
import ApplicationModal from "@/components/recruitment/ApplicationModal";
import { Button } from "@/components/ui/button";
import { jobTypeLabels } from "@/data/jobs";

interface Job {
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

interface JobDetailClientProps {
  job: Job;
}

export default function JobDetailClient({ job }: JobDetailClientProps) {
  const [showModal, setShowModal] = useState(false);
  const isExpired = new Date(job.deadline) < new Date();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageBanner title={job.title} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-secondary hover:text-accent transition-colors mb-6">
          <ArrowLeft size={16} /> Quay lại danh sách tuyển dụng
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="font-serif font-bold text-xl mb-3 text-card-foreground">Mô tả công việc</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="font-serif font-bold text-xl mb-3 text-card-foreground">Trách nhiệm</h2>
              <ul className="space-y-2">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="font-serif font-bold text-xl mb-3 text-card-foreground">Yêu cầu</h2>
              <ul className="space-y-2">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="font-serif font-bold text-xl mb-3 text-card-foreground">Quyền lợi</h2>
              <ul className="space-y-2">
                {job.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-card rounded-lg border border-border p-5 space-y-4">
              <h3 className="font-serif font-semibold text-lg text-card-foreground">Thông tin tuyển dụng</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 size={16} className="text-secondary" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} className="text-secondary" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={16} className="text-secondary" />
                  <span>{jobTypeLabels[job.jobType]}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays size={16} className="text-secondary" />
                  <span>Hạn nộp: {new Date(job.deadline).toLocaleDateString("vi-VN")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={16} className="text-secondary" />
                  <a href={`mailto:${job.contactEmail}`} className="hover:text-accent transition-colors">
                    {job.contactEmail}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                  isExpired
                    ? "bg-destructive/10 text-destructive"
                    : "bg-success/10 text-success"
                }`}>
                  {isExpired ? "Đã hết hạn nộp hồ sơ" : "Đang nhận hồ sơ"}
                </span>
              </div>
            </div>

            {!isExpired && (
              <Button onClick={() => setShowModal(true)} className="w-full" size="lg">
                Nộp hồ sơ ứng tuyển
              </Button>
            )}
          </div>
        </div>
      </main>

      <ApplicationModal 
        jobTitle={job.title} 
        jobId={job.id}
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
}
