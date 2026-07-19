import { Appointment, BlogArticle, Testimonial, GalleryItem } from "./types";

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "appt_1",
    name: "Ramesh Sharma",
    age: 45,
    gender: "Male",
    phone: "9876543210",
    email: "ramesh@example.com",
    type: "Consultation",
    clinic: "Momentum Speciality Clinic",
    date: "2026-07-20",
    timeSlot: "07:00 PM - 07:15 PM",
    symptoms: "Severe lower back pain radiating down to the left leg for 3 weeks.",
    status: "Approved",
    createdAt: new Date().toISOString(),
  },
  {
    id: "appt_2",
    name: "Sunita Devi",
    age: 58,
    gender: "Female",
    phone: "8765432109",
    email: "sunita@example.com",
    type: "Follow-up",
    clinic: "Nichtipur Hospital & Research Center",
    date: "2026-07-21",
    timeSlot: "11:00 AM - 11:15 AM",
    symptoms: "Post-operative checkup for spinal decompression surgery.",
    status: "Pending",
    createdAt: new Date().toISOString(),
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "test_1",
    name: "Rajesh Mahto",
    age: 52,
    condition: "Disc Herniation Surgery",
    content: "I was unable to walk due to severe sciatica. Dr. Agarwal performed a minimally invasive disc surgery, and I was on my feet the very next day. He is truly a godsend for back pain patients in Dhanbad.",
    rating: 5,
    initials: "RM",
    approved: true,
    date: "2026-06-15",
  },
  {
    id: "test_2",
    name: "Anita Sengupta",
    age: 64,
    condition: "Total Knee Replacement",
    content: "Both my knees were severely damaged by arthritis. Dr. Dinesh performed total knee replacements. The care at Momentum Clinic and his surgical skills have given me my active life back. Highly recommended!",
    rating: 5,
    initials: "AS",
    approved: true,
    date: "2026-07-02",
  },
  {
    id: "test_3",
    name: "Vikram Singh",
    age: 38,
    condition: "Scoliosis Correction",
    content: "Excellent diagnostic skills and wonderful explanation of the treatment plan. He doesn't rush into surgeries unless absolutely required. My posture has improved tremendously.",
    rating: 5,
    initials: "VS",
    approved: true,
    date: "2026-07-10",
  }
];

const INITIAL_BLOGS: BlogArticle[] = [
  {
    id: "blog_1",
    title: "Understanding Lower Back Pain: When to See a Spine Surgeon",
    summary: "Lower back pain is incredibly common, but how do you know when it is a simple muscle strain versus a spinal disc issue that requires specialist consultation?",
    category: "Spine Health",
    readTime: "5 min read",
    date: "2026-07-12",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    content: `## What is Lower Back Pain?
Lower back pain (lumbago) is one of the most common reasons people visit a doctor. It can range from a dull, constant ache to a sudden, sharp sensation that leaves you incapacitated.

### Common Causes of Back Pain
1. **Muscle Strain**: Often caused by heavy lifting or sudden awkward movements.
2. **Herniated or Slipped Discs**: The cushions between your vertebrae bulge or rupture, pressing on adjacent nerves.
3. **Spinal Stenosis**: Narrowing of the spinal canal, placing pressure on the spinal cord and nerves.
4. **Spondylolisthesis**: A vertebra slips forward over another.

### Red Flag Symptoms: When to See Dr. Agarwal
While most back pain resolves within a few weeks with rest and physical therapy, you should seek immediate consultation if you experience:
- **Radiculopathy (Sciatica)**: Pain traveling down your leg, past your knee.
- **Numbness or Tingling**: Loss of sensation in the groin, buttocks, or legs.
- **Foot Drop**: Weakness in the foot making it hard to lift while walking.
- **Bladder or Bowel Dysfunction**: Inability to control urination or bowel movements (this is a medical emergency called Cauda Equina Syndrome).
- **Unexplained Weight Loss or Fever** accompanying the back pain.

### Prevention Tips
- Maintain a healthy weight to reduce load on the spine.
- Perform core-strengthening exercises regularly.
- Keep good posture, especially when sitting for long hours. Use ergonomic chairs.`
  },
  {
    id: "blog_2",
    title: "The Ultimate Post-Operative Guide for Joint Replacement Recovery",
    summary: "Recovering from a Knee or Hip replacement surgery? Follow these proven guidelines, mobility exercises, and precautions to speed up your recovery.",
    category: "Joint Care",
    readTime: "7 min read",
    date: "2026-07-05",
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600",
    content: `## Recovery Starts in the Mind
A successful joint replacement surgery relies 50% on the surgeon's skill and 50% on the patient's dedication to post-operative rehabilitation.

### Week 1 to 2: Early Mobility
- **Move Early**: You will be encouraged to stand and walk with a walker within 24 hours of surgery. This prevents blood clots and improves circulation.
- **Wound Care**: Keep the surgical incision clean and dry. Avoid taking tub baths until the staples or sutures are removed.
- **Pain Management**: Take prescribed pain medications strictly on schedule. Do not wait for pain to become severe before taking them.

### Exercises to Do at Home
1. **Ankle Pumps**: Flex your foot up and down repeatedly to improve calf blood flow.
2. **Quadriceps Sets**: Tighten your thigh muscles and push the back of your knee down flat against the bed.
3. **Straight Leg Raises**: Tighten your thigh and raise your leg a few inches off the bed, holding for 5 seconds.

### Crucial Precautions
- Do not twist your leg inward or outward.
- Avoid low chairs or deep sofas; sit on chairs with armrests and a high seat.
- Use a raised toilet seat.
- Avoid crossing your legs at the knees or ankles.`
  },
  {
    id: "blog_3",
    title: "Scoliosis in Teenagers: Symptoms, Screening, and Early Intervention",
    summary: "Scoliosis, an abnormal curvature of the spine, often develops during the growth spurt just before puberty. Learn how to screen your children at home.",
    category: "Paediatric Ortho",
    readTime: "6 min read",
    date: "2026-06-28",
    image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=600",
    content: `## What is Scoliosis?
Scoliosis is a sideways curvature of the spine that occurs most often during the growth spurt just before puberty. While most cases are mild, some spine deformities continue to get more severe as children grow.

### How to Detect Scoliosis at Home (Adam's Forward Bend Test)
Ask your child to stand with feet together and bend forward 90 degrees at the waist, with arms hanging relaxed. Observe from behind:
- Is one shoulder blade more prominent than the other?
- Is one hip higher or more prominent?
- Is there an uneven waistline or rib hump?
- Does the spine look curved rather than straight?

### Treatment Options
1. **Observation**: For mild curves (less than 20 degrees), regular follow-up x-rays every 6 months are sufficient.
2. **Bracing**: If the curve is between 25 and 40 degrees and the child is still growing, a custom back brace can stop the curve from progressing.
3. **Surgery (Spinal Fusion)**: For severe curves (usually over 45-50 degrees), surgery is recommended to straighten and stabilize the spine. Dr. Agarwal has extensive training from CMC Vellore in performing precise scoliosis correction surgeries using advanced spinal cord monitoring.`
  }
];

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal_1",
    title: "Momentum Speciality Clinic Reception",
    category: "clinic",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600",
    description: "Our welcoming clinical reception area designed with premium comfort in mind."
  },
  {
    id: "gal_2",
    title: "State-of-the-art Consultation Suite",
    category: "clinic",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
    description: "Dr. Agarwal's private consulting room equipped with modern diagnostic displays."
  },
  {
    id: "gal_3",
    title: "Patient Success Story - Active Spine Recovery",
    category: "success",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600",
    description: "A patient enjoying healthy trekking 6 months after spinal disc replacement surgery."
  },
  {
    id: "gal_4",
    title: "Surgical Team at Nichtipur Hospital",
    category: "surgery",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600",
    description: "Dr. Agarwal in the sterile operation theatre executing a complex spinal fusion."
  },
  {
    id: "gal_5",
    title: "Patient Reclaiming Knee Mobility",
    category: "success",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    description: "Restored daily yoga exercises after double knee replacement surgery."
  },
  {
    id: "gal_6",
    title: "Advanced Spinal Navigation Workstation",
    category: "surgery",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
    description: "Precision medical equipment used for spine surgeries to ensure millimeter-level accuracy."
  }
];

// Determine if we should use localStorage mock mode
const isGitHubPages = window.location.hostname.includes("github.io");
const isForcedMock = new URLSearchParams(window.location.search).has("mock");

// We'll set a state that starts as true if we're on github.io or forced mock,
// and we will update it if standard fetches fail.
let apiAvailable = !isGitHubPages && !isForcedMock;

// Helper functions for LocalStorage
function getLocalStorageData<T>(key: string, initial: T[]): T[] {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initial;
  }
}

function setLocalStorageData<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// API functions
export const api = {
  isMockMode: () => !apiAvailable,

  // Authentication
  async login(password: string): Promise<{ token: string; message: string }> {
    if (apiAvailable) {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        if (response.ok) {
          return response.json();
        }
        const err = await response.json();
        throw new Error(err.error || "Invalid password");
      } catch (err) {
        if (err instanceof TypeError || (err as Error).message === "Failed to fetch") {
          apiAvailable = false; // Fallback to mock on network/server error
          return this.login(password); // retry with mock
        }
        throw err;
      }
    } else {
      // Mock Mode Authentication
      if (password === "admin123") {
        return { token: "dr-agarwal-admin-secure-token", message: "Login successful (Mock Mode)" };
      } else {
        throw new Error("Invalid password");
      }
    }
  },

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    if (apiAvailable) {
      try {
        const response = await fetch("/api/appointments");
        if (response.ok) return response.json();
        throw new Error("API failed");
      } catch {
        apiAvailable = false;
        return this.getAppointments();
      }
    } else {
      const appts = getLocalStorageData<Appointment>("appointments", INITIAL_APPOINTMENTS);
      return appts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  },

  async createAppointment(formData: any): Promise<Appointment> {
    if (apiAvailable) {
      try {
        const response = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) return response.json();
        const err = await response.json();
        throw new Error(err.error || "Failed to book appointment");
      } catch (err) {
        if (err instanceof TypeError || (err as Error).message === "API failed") {
          apiAvailable = false;
          return this.createAppointment(formData);
        }
        throw err;
      }
    } else {
      const appts = getLocalStorageData<Appointment>("appointments", INITIAL_APPOINTMENTS);
      const newAppt: Appointment = {
        id: "appt_" + Date.now(),
        name: formData.name,
        age: Number(formData.age) || 30,
        gender: formData.gender || "Other",
        phone: formData.phone,
        email: formData.email || "",
        type: formData.type || "Consultation",
        clinic: formData.clinic || "Momentum Speciality Clinic",
        date: formData.date,
        timeSlot: formData.timeSlot,
        symptoms: formData.symptoms || "",
        status: "Pending",
        createdAt: new Date().toISOString(),
      };
      appts.push(newAppt);
      setLocalStorageData("appointments", appts);
      return newAppt;
    }
  },

  async updateAppointment(id: string, token: string, updateData: any): Promise<Appointment> {
    if (apiAvailable) {
      try {
        const response = await fetch(`/api/appointments/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        });
        if (response.ok) return response.json();
        throw new Error("Update failed");
      } catch {
        apiAvailable = false;
        return this.updateAppointment(id, token, updateData);
      }
    } else {
      const appts = getLocalStorageData<Appointment>("appointments", INITIAL_APPOINTMENTS);
      const idx = appts.findIndex((a) => a.id === id);
      if (idx === -1) throw new Error("Appointment not found");
      
      if (updateData.status) appts[idx].status = updateData.status;
      if (updateData.date) appts[idx].date = updateData.date;
      if (updateData.timeSlot) appts[idx].timeSlot = updateData.timeSlot;
      
      setLocalStorageData("appointments", appts);
      return appts[idx];
    }
  },

  async deleteAppointment(id: string, token: string): Promise<boolean> {
    if (apiAvailable) {
      try {
        const response = await fetch(`/api/appointments/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) return true;
        throw new Error("Delete failed");
      } catch {
        apiAvailable = false;
        return this.deleteAppointment(id, token);
      }
    } else {
      const appts = getLocalStorageData<Appointment>("appointments", INITIAL_APPOINTMENTS);
      const filtered = appts.filter((a) => a.id !== id);
      if (appts.length === filtered.length) throw new Error("Appointment not found");
      setLocalStorageData("appointments", filtered);
      return true;
    }
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    if (apiAvailable) {
      try {
        const response = await fetch("/api/testimonials");
        if (response.ok) return response.json();
        throw new Error("API failed");
      } catch {
        apiAvailable = false;
        return this.getTestimonials();
      }
    } else {
      return getLocalStorageData<Testimonial>("testimonials", INITIAL_TESTIMONIALS);
    }
  },

  async createTestimonial(formData: any): Promise<Testimonial> {
    if (apiAvailable) {
      try {
        const response = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) return response.json();
        const err = await response.json();
        throw new Error(err.error || "Failed to submit review");
      } catch (err) {
        if (err instanceof TypeError || (err as Error).message === "API failed") {
          apiAvailable = false;
          return this.createTestimonial(formData);
        }
        throw err;
      }
    } else {
      const reviews = getLocalStorageData<Testimonial>("testimonials", INITIAL_TESTIMONIALS);
      const initials = formData.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
      const newReview: Testimonial = {
        id: "test_" + Date.now(),
        name: formData.name,
        age: Number(formData.age) || 40,
        condition: formData.condition || "General Patient",
        content: formData.content,
        rating: Number(formData.rating),
        initials,
        approved: false, // requires admin approval
        date: new Date().toISOString().split("T")[0],
      };
      reviews.push(newReview);
      setLocalStorageData("testimonials", reviews);
      return newReview;
    }
  },

  async updateTestimonial(id: string, token: string, updateData: any): Promise<Testimonial> {
    if (apiAvailable) {
      try {
        const response = await fetch(`/api/testimonials/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        });
        if (response.ok) return response.json();
        throw new Error("Update failed");
      } catch {
        apiAvailable = false;
        return this.updateTestimonial(id, token, updateData);
      }
    } else {
      const reviews = getLocalStorageData<Testimonial>("testimonials", INITIAL_TESTIMONIALS);
      const idx = reviews.findIndex((r) => r.id === id);
      if (idx === -1) throw new Error("Testimonial not found");
      reviews[idx].approved = updateData.approved;
      setLocalStorageData("testimonials", reviews);
      return reviews[idx];
    }
  },

  async deleteTestimonial(id: string, token: string): Promise<boolean> {
    if (apiAvailable) {
      try {
        const response = await fetch(`/api/testimonials/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) return true;
        throw new Error("Delete failed");
      } catch {
        apiAvailable = false;
        return this.deleteTestimonial(id, token);
      }
    } else {
      const reviews = getLocalStorageData<Testimonial>("testimonials", INITIAL_TESTIMONIALS);
      const filtered = reviews.filter((r) => r.id !== id);
      if (reviews.length === filtered.length) throw new Error("Testimonial not found");
      setLocalStorageData("testimonials", filtered);
      return true;
    }
  },

  // Blogs
  async getBlogs(): Promise<BlogArticle[]> {
    if (apiAvailable) {
      try {
        const response = await fetch("/api/blogs");
        if (response.ok) return response.json();
        throw new Error("API failed");
      } catch {
        apiAvailable = false;
        return this.getBlogs();
      }
    } else {
      return getLocalStorageData<BlogArticle>("blogs", INITIAL_BLOGS);
    }
  },

  async createBlog(formData: any, token: string): Promise<BlogArticle> {
    if (apiAvailable) {
      try {
        const response = await fetch("/api/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) return response.json();
        const err = await response.json();
        throw new Error(err.error || "Failed to create blog");
      } catch (err) {
        if (err instanceof TypeError || (err as Error).message === "API failed") {
          apiAvailable = false;
          return this.createBlog(formData, token);
        }
        throw err;
      }
    } else {
      const blogs = getLocalStorageData<BlogArticle>("blogs", INITIAL_BLOGS);
      const newBlog: BlogArticle = {
        id: "blog_" + Date.now(),
        title: formData.title,
        summary: formData.summary,
        category: formData.category || "General Care",
        readTime: formData.readTime || "5 min read",
        date: new Date().toISOString().split("T")[0],
        image: formData.image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
        content: formData.content,
      };
      blogs.push(newBlog);
      setLocalStorageData("blogs", blogs);
      return newBlog;
    }
  },

  async updateBlog(id: string, token: string, updateData: any): Promise<BlogArticle> {
    if (apiAvailable) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        });
        if (response.ok) return response.json();
        throw new Error("Update failed");
      } catch {
        apiAvailable = false;
        return this.updateBlog(id, token, updateData);
      }
    } else {
      const blogs = getLocalStorageData<BlogArticle>("blogs", INITIAL_BLOGS);
      const idx = blogs.findIndex((b) => b.id === id);
      if (idx === -1) throw new Error("Blog not found");

      if (updateData.title) blogs[idx].title = updateData.title;
      if (updateData.summary) blogs[idx].summary = updateData.summary;
      if (updateData.category) blogs[idx].category = updateData.category;
      if (updateData.readTime) blogs[idx].readTime = updateData.readTime;
      if (updateData.content) blogs[idx].content = updateData.content;
      if (updateData.image) blogs[idx].image = updateData.image;

      setLocalStorageData("blogs", blogs);
      return blogs[idx];
    }
  },

  async deleteBlog(id: string, token: string): Promise<boolean> {
    if (apiAvailable) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) return true;
        throw new Error("Delete failed");
      } catch {
        apiAvailable = false;
        return this.deleteBlog(id, token);
      }
    } else {
      const blogs = getLocalStorageData<BlogArticle>("blogs", INITIAL_BLOGS);
      const filtered = blogs.filter((b) => b.id !== id);
      if (blogs.length === filtered.length) throw new Error("Blog not found");
      setLocalStorageData("blogs", filtered);
      return true;
    }
  },

  // Gallery
  async getGallery(): Promise<GalleryItem[]> {
    if (apiAvailable) {
      try {
        const response = await fetch("/api/gallery");
        if (response.ok) return response.json();
        throw new Error("API failed");
      } catch {
        apiAvailable = false;
        return this.getGallery();
      }
    } else {
      return getLocalStorageData<GalleryItem>("gallery", INITIAL_GALLERY);
    }
  },

  async createGalleryItem(formData: any, token: string): Promise<GalleryItem> {
    if (apiAvailable) {
      try {
        const response = await fetch("/api/gallery", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) return response.json();
        const err = await response.json();
        throw new Error(err.error || "Failed to create gallery item");
      } catch (err) {
        if (err instanceof TypeError || (err as Error).message === "API failed") {
          apiAvailable = false;
          return this.createGalleryItem(formData, token);
        }
        throw err;
      }
    } else {
      const gallery = getLocalStorageData<GalleryItem>("gallery", INITIAL_GALLERY);
      const newGalleryItem: GalleryItem = {
        id: "gal_" + Date.now(),
        title: formData.title,
        category: formData.category,
        image: formData.image,
        description: formData.description || "",
      };
      gallery.push(newGalleryItem);
      setLocalStorageData("gallery", gallery);
      return newGalleryItem;
    }
  },

  async deleteGalleryItem(id: string, token: string): Promise<boolean> {
    if (apiAvailable) {
      try {
        const response = await fetch(`/api/gallery/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) return true;
        throw new Error("Delete failed");
      } catch {
        apiAvailable = false;
        return this.deleteGalleryItem(id, token);
      }
    } else {
      const gallery = getLocalStorageData<GalleryItem>("gallery", INITIAL_GALLERY);
      const filtered = gallery.filter((item) => item.id !== id);
      if (gallery.length === filtered.length) throw new Error("Gallery item not found");
      setLocalStorageData("gallery", filtered);
      return true;
    }
  },
};
