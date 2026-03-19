"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import PageBanner from "@/components/layout/PageBanner";
import { Button } from "@/components/ui/button";
import { departments, jobTypeLabels } from "@/data/jobs";
import { toast } from "sonner";
import { createJob, updateJob, deleteJob } from "@/app/actions";

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

type EditingJob = Omit<Job, "id" | "slug" | "createdAt"> & { deadline: string };

interface AdminRecruitmentClientProps {
  initialJobs: Job[];
}

const emptyJob: EditingJob = {
  title: "",
  department: departments[0],
  jobType: "full-time",
  location: "Hà Nội",
  description: "",
  responsibilities: [""],
  requirements: [""],
  benefits: [""],
  deadline: "",
  contactEmail: "tuyendung@hau.edu.vn",
};

export default function AdminRecruitmentClient({ initialJobs }: AdminRecruitmentClientProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [editing, setEditing] = useState<EditingJob | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleNew = () => {
    setEditing({ ...emptyJob, responsibilities: [""], requirements: [""], benefits: [""] });
    setEditingId(null);
  };

  const handleEdit = (job: Job) => {
    setEditing({
      title: job.title,
      department: job.department,
      jobType: job.jobType,
      location: job.location,
      description: job.description,
      responsibilities: [...job.responsibilities],
      requirements: [...job.requirements],
      benefits: [...job.benefits],
      deadline: typeof job.deadline === 'string' ? job.deadline : job.deadline instanceof Date ? job.deadline.toISOString().split('T')[0] : String(job.deadline),
      contactEmail: job.contactEmail,
    });
    setEditingId(job.id);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteJob(id);
    if (result.success) {
      setJobs(jobs.filter((j) => j.id !== id));
      toast.success("Đã xóa tin tuyển dụng.");
    } else {
      toast.error("Không thể xóa tin tuyển dụng.");
    }
  };

  const handleSave = async () => {
    if (!editing || !editing.title || !editing.deadline) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const deadlineStr = editing.deadline;

    try {
      if (editingId) {
        const updateData = {
          title: editing.title,
          department: editing.department,
          jobType: editing.jobType,
          location: editing.location,
          description: editing.description,
          responsibilities: editing.responsibilities,
          requirements: editing.requirements,
          benefits: editing.benefits,
          deadline: deadlineStr,
          contactEmail: editing.contactEmail,
        };
        const result = await updateJob(editingId, updateData);
        if (result.success) {
          setJobs(jobs.map((j) => j.id === editingId ? { ...j, ...editing } : j));
          toast.success("Đã cập nhật tin tuyển dụng.");
        } else {
          toast.error("Không thể cập nhật tin tuyển dụng.");
          return;
        }
      } else {
        const createData = {
          title: editing.title,
          department: editing.department,
          jobType: editing.jobType,
          location: editing.location,
          description: editing.description,
          responsibilities: editing.responsibilities,
          requirements: editing.requirements,
          benefits: editing.benefits,
          deadline: deadlineStr,
          contactEmail: editing.contactEmail,
        };
        const result = await createJob(createData);
        if (result.success && result.job) {
          const newJob: Job = {
            id: result.job.id,
            slug: result.job.slug,
            title: result.job.title,
            department: result.job.department,
            jobType: result.job.jobType as Job['jobType'],
            location: result.job.location,
            description: result.job.description || '',
            responsibilities: Array.isArray(result.job.responsibilities) ? result.job.responsibilities : [],
            requirements: Array.isArray(result.job.requirements) ? result.job.requirements : [],
            benefits: Array.isArray(result.job.benefits) ? result.job.benefits : [],
            deadline: result.job.deadline,
            contactEmail: result.job.contactEmail || '',
            createdAt: result.job.createdAt,
          };
          setJobs([newJob, ...jobs]);
          toast.success("Đã tạo tin tuyển dụng mới.");
        } else {
          toast.error("Không thể tạo tin tuyển dụng.");
          return;
        }
      }
      setEditing(null);
      setEditingId(null);
    } catch (error) {
      toast.error("Có lỗi xảy ra.");
    }
  };

  const updateListField = (field: "responsibilities" | "requirements" | "benefits", index: number, value: string) => {
    if (!editing) return;
    const updated = [...editing[field]];
    updated[index] = value;
    setEditing({ ...editing, [field]: updated });
  };

  const addListItem = (field: "responsibilities" | "requirements" | "benefits") => {
    if (!editing) return;
    setEditing({ ...editing, [field]: [...editing[field], ""] });
  };

  const removeListItem = (field: "responsibilities" | "requirements" | "benefits", index: number) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: editing[field].filter((_, i) => i !== index) });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageBanner title="Quản trị Tuyển dụng" subtitle="Tạo, chỉnh sửa và quản lý các tin tuyển dụng" />

      <main className="flex-1 container mx-auto px-4 py-8">
        {editing ? (
          <div className="max-w-2xl mx-auto bg-card rounded-lg border border-border p-6 space-y-4">
            <h2 className="font-serif font-bold text-xl text-card-foreground">
              {editingId ? "Chỉnh sửa" : "Tạo mới"} tin tuyển dụng
            </h2>

            <div>
              <label className="block text-sm font-medium mb-1">Tiêu đề <span className="text-destructive">*</span></label>
              <input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Đơn vị</label>
                <select
                  value={editing.department}
                  onChange={(e) => setEditing({ ...editing, department: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Loại hình</label>
                <select
                  value={editing.jobType}
                  onChange={(e) => setEditing({ ...editing, jobType: e.target.value as Job["jobType"] })}
                  className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {Object.entries(jobTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mô tả</label>
              <textarea
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            {(["responsibilities", "requirements", "benefits"] as const).map((field) => {
              const labels = { responsibilities: "Trách nhiệm", requirements: "Yêu cầu", benefits: "Quyền lợi" };
              return (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1">{labels[field]}</label>
                  {editing[field].map((item, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        value={item}
                        onChange={(e) => updateListField(field, i, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button onClick={() => removeListItem(field, i)} className="text-destructive hover:text-destructive/80 p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => addListItem(field)} className="text-xs text-secondary hover:text-accent">+ Thêm mục</button>
                </div>
              );
            })}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Hạn nộp <span className="text-destructive">*</span></label>
                <input
                  type="date"
                  value={editing.deadline}
                  onChange={(e) => setEditing({ ...editing, deadline: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email liên hệ</label>
                <input
                  type="email"
                  value={editing.contactEmail}
                  onChange={(e) => setEditing({ ...editing, contactEmail: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave}>{editingId ? "Cập nhật" : "Tạo mới"}</Button>
              <Button variant="outline" onClick={() => { setEditing(null); setEditingId(null); }}>Hủy</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">{jobs.length} tin tuyển dụng</p>
              <Button onClick={handleNew}>
                <Plus size={16} /> Tạo tin mới
              </Button>
            </div>

            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-medium">Tiêu đề</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Đơn vị</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Hạn nộp</th>
                    <th className="px-4 py-3 font-medium text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} className="border-t border-border hover:bg-muted/20">
                      <td className="px-4 py-3 font-medium text-card-foreground">{job.title}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{job.department}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                        {new Date(job.deadline).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleEdit(job)} className="text-secondary hover:text-accent p-1 mr-1">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(job.id)} className="text-destructive hover:text-destructive/80 p-1">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
