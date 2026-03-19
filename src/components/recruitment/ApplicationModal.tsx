import { useState } from "react";
import { X, Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitApplication } from "@/app/actions";

interface ApplicationModalProps {
  jobTitle: string;
  jobId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationModal = ({ jobTitle, jobId, isOpen, onClose }: ApplicationModalProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const result = await submitApplication({
        jobId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        coverLetter: form.coverLetter,
      });
      
      if (result.success) {
        setSubmitted(true);
        toast.success("Hồ sơ ứng tuyển đã được gửi thành công!");
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error("Chỉ chấp nhận file PDF hoặc DOC/DOCX.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File không được vượt quá 10MB.");
        return;
      }
      setCvFile(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground px-6 py-4 rounded-t-lg flex items-center justify-between">
          <h2 className="font-serif font-bold text-lg">Nộp hồ sơ ứng tuyển</h2>
          <button onClick={onClose} className="hover:bg-primary-foreground/10 p-1 rounded">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <CheckCircle className="mx-auto mb-4 text-success" size={56} />
            <h3 className="font-serif font-bold text-xl mb-2 text-card-foreground">Gửi hồ sơ thành công!</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Cảm ơn bạn đã ứng tuyển vị trí <strong>{jobTitle}</strong>. Chúng tôi sẽ liên hệ qua email trong thời gian sớm nhất.
            </p>
            <Button onClick={onClose}>Đóng</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground mb-2">
              Vị trí: <strong className="text-card-foreground">{jobTitle}</strong>
            </p>

            <div>
              <label className="block text-sm font-medium mb-1">Họ và tên <span className="text-destructive">*</span></label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email <span className="text-destructive">*</span></label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Số điện thoại <span className="text-destructive">*</span></label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0912 345 678"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CV (PDF/DOC)</label>
              <label className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-dashed border-input bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {cvFile ? cvFile.name : "Chọn file CV..."}
                </span>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Thư giới thiệu</label>
              <textarea
                value={form.coverLetter}
                onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                rows={4}
                className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Viết vài dòng giới thiệu về bản thân..."
              />
            </div>

            <Button type="submit" className="w-full">
              Gửi hồ sơ ứng tuyển
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;
