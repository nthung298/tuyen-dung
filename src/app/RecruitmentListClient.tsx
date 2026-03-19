"use client";

import { useState, useMemo } from "react";
import PageBanner from "@/components/layout/PageBanner";
import JobCard from "@/components/recruitment/JobCard";
import JobFilters from "@/components/recruitment/JobFilters";

const ITEMS_PER_PAGE = 24;

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
  deadline: Date | string;
  contactEmail: string;
  createdAt: Date | string;
}

interface RecruitmentListClientProps {
  jobs: Job[];
}

export default function RecruitmentListClient({ jobs: initialJobs }: RecruitmentListClientProps) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [jobType, setJobType] = useState("");
  const [deadlineFilter, setDeadlineFilter] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return initialJobs.filter((job) => {
      if (search && !job.title.toLowerCase().includes(search.toLowerCase()) && !job.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (department && job.department !== department) return false;
      if (jobType && job.jobType !== jobType) return false;
      if (deadlineFilter === "active" && new Date(job.deadline) < new Date()) return false;
      if (deadlineFilter === "expired" && new Date(job.deadline) >= new Date()) return false;
      return true;
    });
  }, [initialJobs, search, department, jobType, deadlineFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageBanner title="Tuyển dụng" subtitle="Cơ hội nghề nghiệp tại Khoa Kiến Trúc – Đại học Kiến trúc Hà Nội" />

      <main className="flex-1 container mx-auto px-4 py-8">
        <JobFilters
          search={search} onSearchChange={(v) => { setSearch(v); setPage(1); }}
          department={department} onDepartmentChange={(v) => { setDepartment(v); setPage(1); }}
          jobType={jobType} onJobTypeChange={(v) => { setJobType(v); setPage(1); }}
          deadlineFilter={deadlineFilter} onDeadlineFilterChange={(v) => { setDeadlineFilter(v); setPage(1); }}
        />

        {paginated.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">Không tìm thấy vị trí tuyển dụng phù hợp.</p>
            <p className="text-sm mt-1">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Hiển thị {paginated.length} / {filtered.length} vị trí
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginated.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded text-sm font-medium transition-colors ${
                      p === page
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-card-foreground hover:bg-muted"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
