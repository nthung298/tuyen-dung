'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Types
export interface JobInput {
  title: string;
  department: string;
  jobType: 'full-time' | 'part-time' | 'contract';
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  deadline: string;
  contactEmail: string;
}

export interface ApplicationInput {
  jobId: string;
  name: string;
  email: string;
  phone: string;
  cvFile?: string;
  coverLetter?: string;
}

// Helper function to convert JSON strings to array and vice versa
function parseJsonField(field: string | null): string[] {
  if (!field) return [];
  try {
    return JSON.parse(field);
  } catch {
    return [];
  }
}

function stringifyJsonField(field: string[]): string {
  return JSON.stringify(field);
}

// Get all jobs
export async function getJobs() {
  try {
    const jobs = await prisma.jobs.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return jobs.map((job) => ({
      ...job,
      jobType: job.jobType as "full-time" | "part-time" | "contract",
      description: job.description || '',
      contactEmail: job.contactEmail || '',
      responsibilities: parseJsonField(job.responsibilities),
      requirements: parseJsonField(job.requirements),
      benefits: parseJsonField(job.benefits),
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

// Get job by slug
export async function getJobBySlug(slug: string) {
  try {
    const job = await prisma.jobs.findUnique({
      where: { slug },
    });
    
    if (!job) return null;
    
    return {
      ...job,
      jobType: job.jobType as "full-time" | "part-time" | "contract",
      description: job.description || '',
      contactEmail: job.contactEmail || '',
      responsibilities: parseJsonField(job.responsibilities),
      requirements: parseJsonField(job.requirements),
      benefits: parseJsonField(job.benefits),
    };
  } catch (error) {
    console.error('Error fetching job by slug:', error);
    return null;
  }
}

// Get job by ID
export async function getJobById(id: string) {
  try {
    const job = await prisma.jobs.findUnique({
      where: { id },
    });
    
    if (!job) return null;
    
    return {
      ...job,
      responsibilities: parseJsonField(job.responsibilities),
      requirements: parseJsonField(job.requirements),
      benefits: parseJsonField(job.benefits),
    };
  } catch (error) {
    console.error('Error fetching job by id:', error);
    return null;
  }
}

// Create new job
export async function createJob(data: JobInput) {
  try {
    const slug = data.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    
    const job = await prisma.jobs.create({
      data: {
        slug,
        title: data.title,
        department: data.department,
        jobType: data.jobType,
        location: data.location,
        description: data.description,
        responsibilities: stringifyJsonField(data.responsibilities),
        requirements: stringifyJsonField(data.requirements),
        benefits: stringifyJsonField(data.benefits),
        deadline: new Date(data.deadline),
        contactEmail: data.contactEmail,
      },
    });
    
    revalidatePath('/tuyen-dung');
    revalidatePath('/quan-tri');
    
    return { success: true, job };
  } catch (error) {
    console.error('Error creating job:', error);
    return { success: false, error: 'Failed to create job' };
  }
}

// Update job
export async function updateJob(id: string, data: Partial<JobInput>) {
  try {
    const updateData: any = { ...data };
    
    if (data.responsibilities) {
      updateData.responsibilities = stringifyJsonField(data.responsibilities);
    }
    if (data.requirements) {
      updateData.requirements = stringifyJsonField(data.requirements);
    }
    if (data.benefits) {
      updateData.benefits = stringifyJsonField(data.benefits);
    }
    if (data.deadline) {
      updateData.deadline = new Date(data.deadline);
    }
    
    const job = await prisma.jobs.update({
      where: { id },
      data: updateData,
    });
    
    revalidatePath('/tuyen-dung');
    revalidatePath('/quan-tri');
    revalidatePath(`/tuyen-dung/${job.slug}`);
    
    return { success: true, job };
  } catch (error) {
    console.error('Error updating job:', error);
    return { success: false, error: 'Failed to update job' };
  }
}

// Delete job
export async function deleteJob(id: string) {
  try {
    await prisma.jobs.delete({
      where: { id },
    });
    
    revalidatePath('/tuyen-dung');
    revalidatePath('/quan-tri');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting job:', error);
    return { success: false, error: 'Failed to delete job' };
  }
}

// Submit application
export async function submitApplication(data: ApplicationInput) {
  try {
    const application = await prisma.applications.create({
      data: {
        jobId: data.jobId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        cvFile: data.cvFile,
        coverLetter: data.coverLetter,
      },
    });
    
    revalidatePath('/tuyen-dung');
    revalidatePath(`/tuyen-dung`);
    
    return { success: true, application };
  } catch (error) {
    console.error('Error submitting application:', error);
    return { success: false, error: 'Failed to submit application' };
  }
}

// Get all applications (for admin)
export async function getApplications() {
  try {
    const applications = await prisma.applications.findMany({
      orderBy: { submittedAt: 'desc' },
      include: {
        jobs: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });
    
    return applications;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
}

// Get applications by job ID
export async function getApplicationsByJobId(jobId: string) {
  try {
    const applications = await prisma.applications.findMany({
      where: { jobId },
      orderBy: { submittedAt: 'desc' },
    });
    
    return applications;
  } catch (error) {
    console.error('Error fetching applications by job ID:', error);
    return [];
  }
}
