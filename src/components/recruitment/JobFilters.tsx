import { Search } from "lucide-react";
import { departments, jobTypeLabels } from "@/data/jobs";

interface JobFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  jobType: string;
  onJobTypeChange: (value: string) => void;
  deadlineFilter: string;
  onDeadlineFilterChange: (value: string) => void;
}

const JobFilters = ({
  search, onSearchChange,
  department, onDepartmentChange,
  jobType, onJobTypeChange,
  deadlineFilter, onDeadlineFilterChange,
}: JobFiltersProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Department */}
        <select
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Tất cả đơn vị</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {/* Job type */}
        <select
          value={jobType}
          onChange={(e) => onJobTypeChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Tất cả loại hình</option>
          {Object.entries(jobTypeLabels).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        {/* Deadline */}
        <select
          value={deadlineFilter}
          onChange={(e) => onDeadlineFilterChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Tất cả thời hạn</option>
          <option value="active">Còn hạn nộp</option>
          <option value="expired">Đã hết hạn</option>
        </select>
      </div>
    </div>
  );
};

export default JobFilters;
