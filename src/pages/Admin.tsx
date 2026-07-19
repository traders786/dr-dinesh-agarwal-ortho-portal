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
  Image,
  MessageSquare,
  Plus,
  Sliders,
  Send,
  Eye,
  ChevronDown
} from "lucide-react";
import { Appointment, BlogArticle, Testimonial, GalleryItem } from "../types";
import { api } from "../api";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [token, setToken] = useState("");

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  const [activeTab, setActiveTab] = useState<"appointments" | "testimonials" | "blogs" | "gallery">("appointments");

  // Create forms
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

  // Load state upon login
  useEffect(() => {
    const savedToken = localStorage.getItem("dr_agarwal_admin_token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadAllAdminData();
    }
  }, [isLoggedIn]);

  const loadAllAdminData = () => {
    // Fetch Appointments
    api.getAppointments()
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error loading appointments", err));

    // Fetch Testimonials
    api.getTestimonials()
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error loading testimonials", err));

    // Fetch Blogs
    api.getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error loading blogs", err));

    // Fetch Gallery
    api.getGallery()
      .then((data) => setGallery(data))
      .catch((err) => console.error("Error loading gallery", err));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const data = await api.login(password);
      localStorage.setItem("dr_agarwal_admin_token", data.token);
      setToken(data.token);
      setIsLoggedIn(true);
      setPassword("");
    } catch (err) {
      setLoginError((err as Error).message || "Failed to authenticate with admin server.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dr_agarwal_admin_token");
    setToken("");
    setIsLoggedIn(false);
  };

  // Appointment operations
  const handleUpdateApptStatus = async (id: string, status: Appointment["status"]) => {
    try {
      await api.updateAppointment(id, token, { status });
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  const handleDeleteAppt = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this appointment record?")) return;
    try {
      await api.deleteAppointment(id, token);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete record.");
    }
  };

  // Testimonial operations
  const handleApproveTestimonial = async (id: string, approved: boolean) => {
    try {
      await api.updateTestimonial(id, token, { approved });
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, approved } : t))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update testimonial approval.");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await api.deleteTestimonial(id, token);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete testimonial.");
    }
  };

  // Blog operations
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.summary || !blogForm.content) return;

    try {
      const newBlog = await api.createBlog(blogForm, token);
      setBlogs((prev) => [newBlog, ...prev]);
      setBlogForm({
        title: "",
        summary: "",
        category: "Spine Health",
        readTime: "5 min read",
        image: "",
        content: ""
      });
      alert("Medical blog article published successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add article.");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog article?")) return;
    try {
      await api.deleteBlog(id, token);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog.");
    }
  };

  // Gallery operations
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.image) return;

    try {
      const newItem = await api.createGalleryItem(galleryForm, token);
      setGallery((prev) => [newItem, ...prev]);
      setGalleryForm({
        title: "",
        category: "clinic",
        image: "",
        description: ""
      });
      alert("New gallery item uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload image to gallery.");
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!window.confirm("Delete this image from clinical archives?")) return;
    try {
      await api.deleteGalleryItem(id, token);
      setGallery((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete gallery item.");
    }
  };

  const getStatusBadge = (status: Appointment["status"]) => {
    switch (status) {
      case "Pending":
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded font-accent uppercase">Pending</span>;
      case "Approved":
        return <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded font-accent uppercase">Approved</span>;
      case "Cancelled":
        return <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded font-accent uppercase">Cancelled</span>;
      case "Rescheduled":
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded font-accent uppercase">Rescheduled</span>;
    }
  };

  // LOGIN WALL SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-24 bg-[#1A1A2E] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="bg-[#0A2F5A] p-8 text-center text-white space-y-2 relative">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-[#E8A838]">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-bold">Admin Portal Login</h1>
            <p className="text-xs text-gray-300 font-accent uppercase tracking-wider">Momentum Speciality Clinic</p>
          </div>

          <div className="p-8 space-y-6">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Enter Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (Default: admin123)"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-500 font-semibold bg-red-50 border border-red-100 p-2.5 rounded-lg flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{loginError}</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#0A2F5A] hover:bg-[#1A7A7A] text-white font-accent font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Authorize Access</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <p className="text-[10px] text-gray-400 text-center">
              Protected workspace database. Actions are fully encrypted and signed under secure doctor tokens.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // LOGGED IN DASHBOARD VIEW
  return (
    <div className="pt-24 bg-[#F0F7FB] min-h-screen pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* DASHBOARD HEADER */}
        <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#0A2F5A] text-white flex items-center justify-center shadow-md">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-[#0A2F5A]">Dr. Dinesh K. Agarwal Dashboard</h1>
              <p className="text-xs font-accent uppercase tracking-wider text-gray-400">Clinical Management Workspace</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="border border-red-200/50 hover:bg-red-50 text-red-600 font-accent font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* METRIC OVERVIEW CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center">
            <span className="text-gray-400 text-[10px] font-accent uppercase tracking-wider font-semibold">Total Consultations</span>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-[#0A2F5A]">{appointments.length}</p>
          </div>
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center">
            <span className="text-gray-400 text-[10px] font-accent uppercase tracking-wider font-semibold">Pending Reviews</span>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-500">
              {appointments.filter((a) => a.status === "Pending").length}
            </p>
          </div>
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center">
            <span className="text-gray-400 text-[10px] font-accent uppercase tracking-wider font-semibold">Approved Slots</span>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-green-500">
              {appointments.filter((a) => a.status === "Approved").length}
            </p>
          </div>
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center">
            <span className="text-gray-400 text-[10px] font-accent uppercase tracking-wider font-semibold">Patient Testimonials</span>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1A7A7A]">{testimonials.length}</p>
          </div>
        </div>

        {/* WORKSPACE NAVIGATION TABS */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-2">
          {[
            { id: "appointments", label: "Appointments", icon: Calendar },
            { id: "testimonials", label: "Testimonials", icon: MessageSquare },
            { id: "blogs", label: "Ortho Blog", icon: BookOpen },
            { id: "gallery", label: "Gallery Assets", icon: Image }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-5 py-3 border-b-2 font-accent text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isSelected
                    ? "border-[#1A7A7A] text-[#1A7A7A]"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB WORKSPACE PANEL */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm overflow-hidden">
          {/* T1: APPOINTMENTS PANEL */}
          {activeTab === "appointments" && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-[#0A2F5A]">Consultation Logs ({appointments.length})</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-accent uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">Patient Profile</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Center Details</th>
                      <th className="py-3 px-4">DateTime Slot</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center">Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length > 0 ? (
                      appointments.map((appt) => (
                        <tr key={appt.id} className="border-b border-gray-50 hover:bg-gray-50/50 text-xs sm:text-sm">
                          {/* Profile */}
                          <td className="py-4 px-4 space-y-0.5">
                            <p className="font-semibold text-gray-800">{appt.name}</p>
                            <p className="text-gray-400 text-xs">{appt.age} Yrs · {appt.gender}</p>
                            <p className="text-gray-400 text-xs">📱 {appt.phone}</p>
                          </td>

                          {/* Type */}
                          <td className="py-4 px-4">
                            <span className="font-semibold text-[#1A7A7A]">{appt.type}</span>
                          </td>

                          {/* Clinic */}
                          <td className="py-4 px-4 font-semibold text-gray-700">
                            {appt.clinic.split(" ")[0]} Clinic
                          </td>

                          {/* Slot */}
                          <td className="py-4 px-4 space-y-0.5">
                            <p className="font-bold text-gray-700">📅 {appt.date}</p>
                            <p className="text-xs text-gray-400">{appt.timeSlot}</p>
                          </td>

                          {/* Status */}
                          <td className="py-4 px-4">
                            {getStatusBadge(appt.status)}
                          </td>

                          {/* Operations */}
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center gap-2">
                              {appt.status !== "Approved" && (
                                <button
                                  onClick={() => handleUpdateApptStatus(appt.id, "Approved")}
                                  className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                                  title="Approve Appointment"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                              )}
                              {appt.status !== "Cancelled" && (
                                <button
                                  onClick={() => handleUpdateApptStatus(appt.id, "Cancelled")}
                                  className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                                  title="Cancel Appointment"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteAppt(appt.id)}
                                className="p-1.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-200"
                                title="Delete Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-gray-400 text-sm font-accent">
                          No appointments logged yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* T2: TESTIMONIALS MANAGEMENT */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-[#0A2F5A]">Patient Testimonial Moderation</h3>

              <div className="space-y-4">
                {testimonials.length > 0 ? (
                  testimonials.map((test) => (
                    <div
                      key={test.id}
                      className="border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/30"
                    >
                      <div className="space-y-2 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-[#1A7A7A] text-white font-bold text-xs flex items-center justify-center">
                            {test.initials}
                          </span>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{test.name}</p>
                            <p className="text-xs text-gray-400 font-accent uppercase tracking-wider">
                              {test.age} Yrs · <span className="text-[#1A7A7A]">{test.condition}</span>
                            </p>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 italic">"{test.content}"</p>
                      </div>

                      <div className="flex items-center gap-3">
                        {test.approved ? (
                          <span className="text-xs text-green-600 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full font-semibold uppercase tracking-wider">
                            Live on site
                          </span>
                        ) : (
                          <button
                            onClick={() => handleApproveTestimonial(test.id, true)}
                            className="bg-green-600 hover:bg-green-700 text-white font-accent font-bold px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider shadow-sm"
                          >
                            Approve
                          </button>
                        )}
                        {test.approved && (
                          <button
                            onClick={() => handleApproveTestimonial(test.id, false)}
                            className="border border-amber-200 text-amber-600 hover:bg-amber-50 font-accent font-bold px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider"
                          >
                            Hide
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteTestimonial(test.id)}
                          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-gray-400 text-sm font-accent">No patient reviews logged.</p>
                )}
              </div>
            </div>
          )}

          {/* T3: ORTHO BLOG MANAGEMENT */}
          {activeTab === "blogs" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Add Blog Form */}
              <div className="lg:col-span-5 bg-[#F0F7FB] border border-[#1A7A7A]/10 p-6 rounded-2xl space-y-4">
                <h4 className="font-serif text-base font-bold text-[#0A2F5A]">Publish Medical Article</h4>

                <form onSubmit={handleBlogSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <label className="block text-xs font-accent uppercase text-gray-500 font-semibold">Title *</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm((p) => ({ ...p, title: e.target.value }))}
                      placeholder="Article title"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1A7A7A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-accent uppercase text-gray-500 font-semibold">Category</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm((p) => ({ ...p, category: e.target.value }))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                    >
                      <option value="Spine Health">Spine Health</option>
                      <option value="Joint Care">Joint Care</option>
                      <option value="Paediatric Ortho">Paediatric Ortho</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-accent uppercase text-gray-500 font-semibold">Summary *</label>
                    <textarea
                      required
                      value={blogForm.summary}
                      onChange={(e) => setBlogForm((p) => ({ ...p, summary: e.target.value }))}
                      placeholder="Brief teaser summary"
                      rows={2}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1A7A7A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-accent uppercase text-gray-500 font-semibold">Article Content (Markdown) *</label>
                    <textarea
                      required
                      value={blogForm.content}
                      onChange={(e) => setBlogForm((p) => ({ ...p, content: e.target.value }))}
                      placeholder="## Heading... Use standard paragraphs and bullet notes."
                      rows={6}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#1A7A7A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1A7A7A] hover:bg-[#0A2F5A] text-white font-accent font-bold py-2.5 rounded-xl uppercase text-xs tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Article</span>
                  </button>
                </form>
              </div>

              {/* Published articles list */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="font-serif text-base font-bold text-[#0A2F5A]">Published Articles ({blogs.length})</h4>

                <div className="space-y-3">
                  {blogs.length > 0 ? (
                    blogs.map((b) => (
                      <div
                        key={b.id}
                        className="border border-gray-100 rounded-2xl p-4 flex justify-between items-center gap-4 bg-gray-50/10 hover:bg-gray-50 transition-colors"
                      >
                        <div className="space-y-1">
                          <p className="font-semibold text-gray-800 text-sm">{b.title}</p>
                          <p className="text-xs text-gray-400 font-accent uppercase tracking-widest">
                            {b.category} · {b.date}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteBlog(b.id)}
                          className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-8 text-gray-400 text-sm font-accent">No blog articles.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* T4: GALLERY ASSETS MANAGEMENT */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Upload asset form */}
              <div className="lg:col-span-5 bg-[#F0F7FB] border border-[#1A7A7A]/10 p-6 rounded-2xl space-y-4">
                <h4 className="font-serif text-base font-bold text-[#0A2F5A]">Add Gallery Archive Asset</h4>

                <form onSubmit={handleGallerySubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <label className="block text-xs font-accent uppercase text-gray-500 font-semibold">Title *</label>
                    <input
                      type="text"
                      required
                      value={galleryForm.title}
                      onChange={(e) => setGalleryForm((p) => ({ ...p, title: e.target.value }))}
                      placeholder="e.g. Spine Operation Suite"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1A7A7A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-accent uppercase text-gray-500 font-semibold">Asset Category</label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm((p) => ({ ...p, category: e.target.value as any }))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                    >
                      <option value="clinic">Clinic consultation</option>
                      <option value="surgery">Surgery/OT Setup</option>
                      <option value="success">Patient Success Story</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-accent uppercase text-gray-500 font-semibold">Image URL *</label>
                    <input
                      type="url"
                      required
                      value={galleryForm.image}
                      onChange={(e) => setGalleryForm((p) => ({ ...p, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1A7A7A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-accent uppercase text-gray-500 font-semibold">Description</label>
                    <textarea
                      value={galleryForm.description}
                      onChange={(e) => setGalleryForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Provide diagnostic/patient recovery information"
                      rows={2}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1A7A7A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1A7A7A] hover:bg-[#0A2F5A] text-white font-accent font-bold py-2.5 rounded-xl uppercase text-xs tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload to Gallery</span>
                  </button>
                </form>
              </div>

              {/* Asset grid */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="font-serif text-base font-bold text-[#0A2F5A]">Clinical Photo Archives ({gallery.length})</h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {gallery.length > 0 ? (
                    gallery.map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col justify-between relative group"
                      >
                        <div className="h-28 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3 space-y-1 flex-1 flex flex-col justify-between">
                          <p className="font-semibold text-gray-800 text-[11px] line-clamp-1">{item.title}</p>
                          <div className="flex justify-between items-center pt-2">
                            <span className="text-[9px] font-accent uppercase font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                            <button
                              onClick={() => handleDeleteGalleryItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center col-span-full py-8 text-gray-400 text-sm font-accent">No gallery items loaded.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
