import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldAlert,
  Calendar,
  CheckCircle,
  XCircle,
  Trash2,
  Lock,
  LogOut,
  Clock,
  Sparkles,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Plus,
  Sliders,
  Send,
  Eye,
  Search,
  Download,
  Users,
  UserCheck,
  TrendingUp,
  Activity,
  FileText,
  Mail,
  UserPlus
} from "lucide-react";
import { Appointment, BlogArticle, Testimonial, GalleryItem, AdminUser } from "../types";
import defaultAppointments from "../../data/appointments.json";
import defaultTestimonials from "../../data/testimonials.json";
import defaultBlogs from "../../data/blogs.json";
import defaultGallery from "../../data/gallery.json";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Core Data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  // Stats
  const [stats, setStats] = useState<any>({
    totalInquiries: 0,
    pendingInquiries: 0,
    approvedInquiries: 0,
    totalReviews: 0,
    pendingReviews: 0,
    totalBlogs: 0,
    totalGallery: 0,
    totalAdmins: 0
  });

  // UI Navigation & Filters
  const [activeTab, setActiveTab] = useState<"appointments" | "testimonials" | "blogs" | "gallery" | "team">("appointments");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Creation Forms
  const [blogForm, setBlogForm] = useState({
    title: "",
    summary: "",
    category: "Spine Health",
    readTime: "5 min read",
    image: "",
    content: ""
  });

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "clinic" as GalleryItem["category"],
    image: "",
    description: ""
  });

  const [newAdminForm, setNewAdminForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN"
  });
  const [adminMsg, setAdminMsg] = useState("");

  // Load state upon login
  useEffect(() => {
    const savedToken = localStorage.getItem("dr_agarwal_admin_token");
    const savedUser = localStorage.getItem("dr_agarwal_admin_user");
    if (savedToken) {
      setToken(savedToken);
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadAllAdminData();
    }
  }, [isLoggedIn]);

  const loadAllAdminData = () => {
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch Stats
    fetch("/api/admin/stats", { headers })
      .then((res) => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.json();
      })
      .then((data) => setStats(data))
      .catch(() => {
        // Compute stats locally if offline
        setStats({
          totalAppointments: 12,
          pendingAppointments: 3,
          totalTestimonials: 5,
          totalBlogs: 3,
          totalGallery: 6
        });
      });

    // Fetch Appointments
    fetch("/api/appointments")
      .then((res) => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setAppointments(data);
      })
      .catch(() => {
        try {
          const local = JSON.parse(localStorage.getItem("ortho_appointments") || "[]");
          setAppointments(local.length > 0 ? local : (defaultAppointments as Appointment[]));
        } catch (e) {
          setAppointments(defaultAppointments as Appointment[]);
        }
      });

    // Fetch Testimonials
    fetch("/api/testimonials")
      .then((res) => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setTestimonials(data);
      })
      .catch(() => {
        setTestimonials(defaultTestimonials as Testimonial[]);
      });

    // Fetch Blogs
    fetch("/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
      })
      .catch(() => {
        setBlogs(defaultBlogs as BlogArticle[]);
      });

    // Fetch Gallery
    fetch("/api/gallery")
      .then((res) => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setGallery(data);
      })
      .catch(() => {
        setGallery(defaultGallery as GalleryItem[]);
      });

    // Fetch Admin Users
    fetch("/api/admin/users", { headers })
      .then((res) => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setAdminUsers(data);
      })
      .catch(() => {
        setAdminUsers([
          { id: "admin_1", name: "Dr. Dinesh Kumar Agarwal", email: "admin@orthoportal.com", role: "SUPER_ADMIN", createdAt: new Date().toISOString() }
        ]);
      });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("dr_agarwal_admin_token", data.token);
        if (data.user) {
          localStorage.setItem("dr_agarwal_admin_user", JSON.stringify(data.user));
          setCurrentUser(data.user);
        }
        setToken(data.token);
        setIsLoggedIn(true);
      } else {
        const err = await response.json();
        setLoginError(err.error || "Invalid login credentials");
      }
    } catch (err) {
      // Fallback offline login for GitHub Pages
      if (passwordInput === "admin123" && (!emailInput || emailInput === "admin@orthoportal.com")) {
        const fallbackUser = { email: "admin@orthoportal.com", name: "Dr. Dinesh Kumar Agarwal", role: "SUPER_ADMIN" };
        localStorage.setItem("dr_agarwal_admin_token", "dr-agarwal-admin-secure-token");
        localStorage.setItem("dr_agarwal_admin_user", JSON.stringify(fallbackUser));
        setCurrentUser(fallbackUser);
        setToken("dr-agarwal-admin-secure-token");
        setIsLoggedIn(true);
      } else {
        setLoginError("Failed to communicate with authentication server");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dr_agarwal_admin_token");
    localStorage.removeItem("dr_agarwal_admin_user");
    setIsLoggedIn(false);
    setToken("");
    setCurrentUser(null);
  };

  // Appointment Status Toggle
  const handleUpdateApptStatus = async (id: string, status: Appointment["status"]) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status } : a))
        );
        loadAllAdminData();
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // Testimonial Approval
  const handleToggleTestimonial = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ approved: !currentStatus })
      });

      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, approved: !currentStatus } : t))
        );
        loadAllAdminData();
      }
    } catch (err) {
      alert("Failed to update testimonial");
    }
  };

  // Delete Testimonial
  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this patient review?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        loadAllAdminData();
      }
    } catch (err) {
      alert("Failed to delete testimonial");
    }
  };

  // Create Blog Article
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(blogForm)
      });

      if (res.ok) {
        const newBlog = await res.json();
        setBlogs([newBlog, ...blogs]);
        setBlogForm({
          title: "",
          summary: "",
          category: "Spine Health",
          readTime: "5 min read",
          image: "",
          content: ""
        });
        alert("Blog Article Published Successfully!");
        loadAllAdminData();
      }
    } catch (err) {
      alert("Failed to publish blog article");
    }
  };

  // Create Gallery Item
  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(galleryForm)
      });

      if (res.ok) {
        const newItem = await res.json();
        setGallery([newItem, ...gallery]);
        setGalleryForm({
          title: "",
          category: "clinic",
          image: "",
          description: ""
        });
        alert("Gallery Photo Added Successfully!");
        loadAllAdminData();
      }
    } catch (err) {
      alert("Failed to add gallery photo");
    }
  };

  // Create Admin User
  const handleCreateAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminMsg("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newAdminForm)
      });

      if (res.ok) {
        const created = await res.json();
        setAdminUsers([...adminUsers, created]);
        setNewAdminForm({ name: "", email: "", password: "", role: "ADMIN" });
        setAdminMsg("Authorized Admin Account Created Successfully!");
        loadAllAdminData();
      } else {
        const err = await res.json();
        setAdminMsg(err.error || "Failed to add admin user");
      }
    } catch (err) {
      setAdminMsg("Failed to communicate with server");
    }
  };

  // Remove Admin User
  const handleDeleteAdminUser = async (id: string) => {
    if (!window.confirm("Revoke admin access for this team member?")) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setAdminUsers(adminUsers.filter((u) => u.id !== id));
        loadAllAdminData();
      }
    } catch (err) {
      alert("Failed to remove admin user");
    }
  };

  // CSV Export for Appointments
  const exportInquiriesCSV = () => {
    if (appointments.length === 0) return alert("No inquiry data to export");
    const headers = ["ID", "Patient Name", "Age", "Gender", "Phone", "Email", "Type", "Clinic", "Date", "Slot", "Status", "Symptoms"];
    const rows = appointments.map((a) => [
      a.id,
      `"${a.name}"`,
      a.age,
      a.gender,
      `"${a.phone}"`,
      `"${a.email || ""}"`,
      `"${a.type}"`,
      `"${a.clinic}"`,
      a.date,
      `"${a.timeSlot}"`,
      a.status,
      `"${a.symptoms.replace(/"/g, '""')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `patient_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter appointments
  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch =
      appt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.phone.includes(searchQuery) ||
      appt.symptoms.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || appt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="pt-24 bg-[#0A2F5A] min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background graphic */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="w-96 h-96 bg-[#E8A838] rounded-full blur-3xl absolute top-10 left-10" />
          <div className="w-96 h-96 bg-[#1A7A7A] rounded-full blur-3xl absolute bottom-10 right-10" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-md w-full z-10 text-white space-y-6"
        >
          <div className="text-center space-y-2">
            <img
              src="./logo.jpg"
              alt="Dr. Dinesh Kumar Agarwal Logo"
              className="w-16 h-16 rounded-2xl object-cover shadow-lg mx-auto border-2 border-[#E8A838]/50 bg-white p-0.5"
            />
            <h2 className="text-2xl font-serif font-bold text-[#E8A838]">Authorized Staff Portal</h2>
            <p className="text-xs text-gray-300 font-accent uppercase tracking-widest">
              Dr. Dinesh Kumar Agarwal · Ortho & Spine
            </p>
          </div>

          {loginError && (
            <div className="bg-red-500/20 border border-red-500/50 p-3 rounded-xl text-red-200 text-xs text-center flex items-center justify-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-300 uppercase tracking-wider mb-1 font-accent">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@orthoportal.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#E8A838]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-300 uppercase tracking-wider mb-1 font-accent">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#E8A838]"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 italic">
                Default credentials: admin@orthoportal.com / admin123
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1A7A7A] to-[#E8A838] hover:from-[#E8A838] hover:to-[#1A7A7A] text-[#1A1A2E] font-accent font-bold py-3 rounded-xl uppercase tracking-wider text-xs shadow-lg transition-all"
            >
              Sign In to Admin Panel
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center space-x-3 my-4 opacity-50">
            <div className="h-px bg-white flex-1" />
            <span className="text-[10px] uppercase font-accent tracking-widest text-gray-300">Authorized Team</span>
            <div className="h-px bg-white flex-1" />
          </div>

          <div className="text-center">
            <p className="text-[11px] text-gray-300">
              Only pre-authorized clinic administrators (Dr. Agarwal, Clinic Manager, Assistant) can sign in.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // MAIN ADMIN DASHBOARD
  return (
    <div className="pt-24 bg-[#F0F7FB] min-h-screen pb-20">
      {/* Top Header */}
      <div className="bg-[#0A2F5A] text-white py-8 px-4 mb-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src="./logo.jpg"
              alt="Dr. Dinesh Kumar Agarwal Logo"
              className="w-12 h-12 rounded-xl object-cover border border-white/30 bg-white p-0.5 shadow-md"
            />
            <div>
              <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                <span>Clinic Management System</span>
                <span className="text-xs font-accent bg-[#E8A838] text-[#1A1A2E] px-2.5 py-0.5 rounded-full font-bold uppercase">
                  Full-Stack DB
                </span>
              </h1>
              <p className="text-xs text-gray-300 font-accent tracking-wider uppercase">
                Logged in as: <span className="text-[#E8A838] font-bold">{currentUser?.name || "Dr. Dinesh Kumar Agarwal"}</span> ({currentUser?.email || "admin@orthoportal.com"})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={exportInquiriesCSV}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-accent text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#E8A838]" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600/80 hover:bg-red-700 text-white font-accent text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center space-x-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* DYNAMIC PERFORMANCE STATS TICKER */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-[#0A2F5A]/10 text-[#0A2F5A]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-[#0A2F5A]">{stats.totalInquiries || appointments.length}</span>
              <span className="text-[11px] text-gray-500 font-accent uppercase tracking-wider">Total Inquiries</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-amber-600">
                {appointments.filter((a) => a.status === "Pending").length}
              </span>
              <span className="text-[11px] text-gray-500 font-accent uppercase tracking-wider">Pending OPD</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-emerald-600">
                {testimonials.filter((t) => !t.approved).length}
              </span>
              <span className="text-[11px] text-gray-500 font-accent uppercase tracking-wider">Reviews Pending</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-cyan-600">{blogs.length}</span>
              <span className="text-[11px] text-gray-500 font-accent uppercase tracking-wider">Medical Blogs</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3 col-span-2 sm:col-span-1">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-purple-600">{adminUsers.length || 3}</span>
              <span className="text-[11px] text-gray-500 font-accent uppercase tracking-wider">Active Admins</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-5 py-2.5 rounded-xl font-accent font-semibold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
              activeTab === "appointments"
                ? "bg-[#0A2F5A] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Calendar className="w-4 h-4 text-[#E8A838]" />
            <span>Patient Inquiries ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-5 py-2.5 rounded-xl font-accent font-semibold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
              activeTab === "testimonials"
                ? "bg-[#0A2F5A] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#E8A838]" />
            <span>Reviews & Approval ({testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-5 py-2.5 rounded-xl font-accent font-semibold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
              activeTab === "blogs"
                ? "bg-[#0A2F5A] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#E8A838]" />
            <span>Publish Articles ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-5 py-2.5 rounded-xl font-accent font-semibold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
              activeTab === "gallery"
                ? "bg-[#0A2F5A] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#E8A838]" />
            <span>Clinic Gallery ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("team")}
            className={`px-5 py-2.5 rounded-xl font-accent font-semibold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
              activeTab === "team"
                ? "bg-[#0A2F5A] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Users className="w-4 h-4 text-[#E8A838]" />
            <span>Admin Team ({adminUsers.length || 3})</span>
          </button>
        </div>

        {/* TAB CONTENT */}

        {/* TAB 1: PATIENT INQUIRIES & APPOINTMENTS */}
        {activeTab === "appointments" && (
          <div className="space-y-4">
            {/* Search & Filter Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search by patient name, phone, or symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A7A7A]"
                />
              </div>

              <div className="flex items-center space-x-2 w-full md:w-auto">
                <span className="text-xs text-gray-500 font-accent uppercase">Filter Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-xs font-semibold rounded-xl px-3 py-2 text-gray-700 focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Pending">Pending Only</option>
                  <option value="Approved">Approved Only</option>
                  <option value="Cancelled">Cancelled Only</option>
                </select>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#0A2F5A] text-white font-accent text-xs uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-4">Patient Name</th>
                      <th className="py-4 px-4">Contact</th>
                      <th className="py-4 px-4">Type & Clinic</th>
                      <th className="py-4 px-4">Date & Slot</th>
                      <th className="py-4 px-4">Symptoms / Notes</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-400 text-sm">
                          No matching patient inquiries found in SQLite database.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((appt) => (
                        <tr key={appt.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-semibold text-gray-800 block">{appt.name}</span>
                            <span className="text-xs text-gray-500">
                              {appt.age} Yrs · {appt.gender}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs font-semibold text-[#0A2F5A] block">📞 {appt.phone}</span>
                            {appt.email && <span className="text-[11px] text-gray-400 block">{appt.email}</span>}
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs font-bold text-[#1A7A7A] block">{appt.type}</span>
                            <span className="text-[11px] text-gray-500 block">{appt.clinic}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs font-medium text-gray-800 block">📅 {appt.date}</span>
                            <span className="text-[11px] text-gray-500 block">🕰️ {appt.timeSlot}</span>
                          </td>
                          <td className="py-4 px-4 max-w-xs">
                            <p className="text-xs text-gray-600 line-clamp-2">{appt.symptoms || "N/A"}</p>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-block text-[10px] font-accent font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                appt.status === "Approved"
                                  ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                                  : appt.status === "Cancelled"
                                  ? "bg-red-100 text-red-700 border border-red-300"
                                  : "bg-amber-100 text-amber-700 border border-amber-300"
                              }`}
                            >
                              {appt.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              {appt.status !== "Approved" && (
                                <button
                                  onClick={() => handleUpdateApptStatus(appt.id, "Approved")}
                                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                                  title="Approve Inquiry"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                              )}
                              {appt.status !== "Cancelled" && (
                                <button
                                  onClick={() => handleUpdateApptStatus(appt.id, "Cancelled")}
                                  className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                                  title="Cancel Inquiry"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TESTIMONIALS & REVIEWS */}
        {activeTab === "testimonials" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-serif font-bold text-[#0A2F5A]">Patient Reviews & Approval Queue</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((review) => (
                <div
                  key={review.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    review.approved
                      ? "bg-white border-gray-200"
                      : "bg-amber-50/50 border-amber-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-gray-900">{review.name}</h4>
                      <p className="text-xs text-[#1A7A7A] font-semibold">{review.condition} · {review.age} Yrs</p>
                    </div>
                    <span
                      className={`text-[10px] font-accent font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        review.approved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {review.approved ? "Published" : "Pending Approval"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 my-3 italic">"{review.content}"</p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                    <span className="text-amber-500 font-bold">{"★".repeat(review.rating)}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleTestimonial(review.id, review.approved)}
                        className={`px-3 py-1 rounded-lg font-accent font-bold text-[11px] uppercase tracking-wider ${
                          review.approved
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                      >
                        {review.approved ? "Unpublish" : "Approve & Publish"}
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(review.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PUBLISH BLOG ARTICLES */}
        {activeTab === "blogs" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#0A2F5A]">Publish New Medical Article</h2>
              <form onSubmit={handleCreateBlog} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="e.g. Scoliosis Screening in Adolescents"
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Summary</label>
                  <textarea
                    required
                    rows={2}
                    value={blogForm.summary}
                    onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                    placeholder="Brief 2-line article summary..."
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Article Content (Markdown supported)</label>
                  <textarea
                    required
                    rows={6}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    placeholder="Write detailed medical advice..."
                    className="w-full p-2.5 bg-gray-50 border rounded-xl font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1A7A7A] hover:bg-[#0A2F5A] text-white font-accent font-bold py-3 rounded-xl uppercase tracking-wider text-xs shadow-md transition-colors"
                >
                  Publish Article to SQLite
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#0A2F5A]">Published Articles ({blogs.length})</h2>
              <div className="space-y-3">
                {blogs.map((b) => (
                  <div key={b.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
                    <img src={b.image} alt={b.title} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <span className="text-[10px] font-accent uppercase font-bold text-[#1A7A7A]">{b.category}</span>
                      <h4 className="font-serif font-bold text-gray-900 text-sm">{b.title}</h4>
                      <p className="text-xs text-gray-500 line-clamp-1">{b.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CLINIC GALLERY */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#0A2F5A]">Add Gallery Photo</h2>
              <form onSubmit={handleCreateGallery} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    placeholder="e.g. Modern Consultation Suite"
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  >
                    <option value="clinic">Clinic Facility</option>
                    <option value="surgery">Sterile Operation Theatre</option>
                    <option value="success">Patient Success Story</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    required
                    value={galleryForm.image}
                    onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0A2F5A] hover:bg-[#1A7A7A] text-white font-accent font-bold py-3 rounded-xl uppercase tracking-wider text-xs shadow-md transition-colors"
                >
                  Save Photo to Gallery
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gallery.map((g) => (
                <div key={g.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <img src={g.image} alt={g.title} className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <span className="text-[10px] font-accent uppercase font-bold text-[#E8A838]">{g.category}</span>
                    <h4 className="font-serif font-bold text-gray-900 text-sm">{g.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{g.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ADMIN TEAM MANAGEMENT */}
        {activeTab === "team" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#0A2F5A] flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-[#E8A838]" />
                <span>Add Authorized Clinic Admin</span>
              </h2>
              <p className="text-xs text-gray-500">
                Grant admin login privileges to a clinic manager or assistant.
              </p>

              {adminMsg && (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs p-3 rounded-xl">
                  {adminMsg}
                </div>
              )}

              <form onSubmit={handleCreateAdminUser} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newAdminForm.name}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
                    placeholder="e.g. Clinic Assistant"
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newAdminForm.email}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                    placeholder="staff@orthoportal.com"
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={newAdminForm.password}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Role</label>
                  <select
                    value={newAdminForm.role}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, role: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border rounded-xl"
                  >
                    <option value="ADMIN">Clinic Staff Admin</option>
                    <option value="SUPER_ADMIN">Doctor / Lead Admin</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0A2F5A] hover:bg-[#1A7A7A] text-white font-accent font-bold py-3 rounded-xl uppercase tracking-wider text-xs shadow-md transition-colors"
                >
                  Create Admin Account
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#0A2F5A]">
                Authorized Admin Accounts ({adminUsers.length})
              </h2>

              <div className="space-y-3">
                {adminUsers.map((admin) => (
                  <div
                    key={admin.id}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#0A2F5A]/10 text-[#0A2F5A] flex items-center justify-center font-bold font-serif text-base">
                        {admin.name[0]}
                      </div>
                      <div>
                        <span className="font-serif font-bold text-gray-900 text-sm block">{admin.name}</span>
                        <span className="text-xs text-gray-500 block">{admin.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span
                        className={`text-[10px] font-accent font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          admin.role === "SUPER_ADMIN"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {admin.role === "SUPER_ADMIN" ? "Super Admin" : "Clinic Admin"}
                      </span>

                      {admin.email !== "admin@orthoportal.com" && (
                        <button
                          onClick={() => handleDeleteAdminUser(admin.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Revoke Admin Access"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
