export interface Appointment {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  type: 'Consultation' | 'Follow-up' | 'Surgery';
  clinic: 'Momentum Speciality Clinic' | 'Nichtipur Hospital & Research Center';
  date: string;
  timeSlot: string;
  symptoms: string;
  status: 'Pending' | 'Approved' | 'Cancelled' | 'Rescheduled';
  createdAt: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  condition: string;
  content: string;
  rating: number;
  initials: string;
  approved: boolean;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'clinic' | 'surgery' | 'success';
  image: string;
  description: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  googleId?: string | null;
  createdAt: string;
}
