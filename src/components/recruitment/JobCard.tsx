import Link from "next/link";
import { MapPin, Clock, Building2, CalendarDays } from "lucide-react";
import { Job, jobTypeLabels } from "@/data/jobs";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const isExpired = new Date(job.deadline) < new Date();

  return (
    <Link
      href={`/${job.slug}`}
      className="group block bg-card rounded-lg border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-serif font-semibold text-lg text-card-foreground group-hover:text-secondary transition-colors leading-snug">
            {job.title}
          </h3>
          <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
            isExpired
              ? "bg-destructive/10 text-destructive"
              : "bg-success/10 text-success"
          }`}>
            {isExpired ? "Hết hạn" : "Đang tuyển"}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job.description}</p>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Building2 size={14} className="text-secondary" />
            <span>{job.department}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-secondary" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-secondary" />
            <span>{jobTypeLabels[job.jobType]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays size={14} className="text-secondary" />
            <span>Hạn: {new Date(job.deadline).toLocaleDateString("vi-VN")}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border bg-muted/30 rounded-b-lg">
        <span className="text-xs font-medium text-secondary group-hover:text-accent transition-colors">
          Xem chi tiết →
        </span>
      </div>
    </Link>
  );
};

export default JobCard;
