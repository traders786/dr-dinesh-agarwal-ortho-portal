var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_promises = __toESM(require("fs/promises"), 1);
var import_fs = require("fs");
var import_vite = require("vite");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var DATA_DIR = import_path.default.join(process.cwd(), "data");
async function ensureDataFile(filename, initialData) {
  const filePath = import_path.default.join(DATA_DIR, filename);
  if (!(0, import_fs.existsSync)(filePath)) {
    await import_promises.default.mkdir(DATA_DIR, { recursive: true });
    await import_promises.default.writeFile(filePath, JSON.stringify(initialData, null, 2), "utf-8");
  }
}
var INITIAL_APPOINTMENTS = [
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
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
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
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  }
];
var INITIAL_TESTIMONIALS = [
  {
    id: "test_1",
    name: "Rajesh Mahto",
    age: 52,
    condition: "Disc Herniation Surgery",
    content: "I was unable to walk due to severe sciatica. Dr. Agarwal performed a minimally invasive disc surgery, and I was on my feet the very next day. He is truly a godsend for back pain patients in Dhanbad.",
    rating: 5,
    initials: "RM",
    approved: true,
    date: "2026-06-15"
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
    date: "2026-07-02"
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
    date: "2026-07-10"
  }
];
var INITIAL_BLOGS = [
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
var INITIAL_GALLERY = [
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
async function getDB(filename, initialData) {
  const filePath = import_path.default.join(DATA_DIR, filename);
  await ensureDataFile(filename, initialData);
  const dataStr = await import_promises.default.readFile(filePath, "utf-8");
  return JSON.parse(dataStr);
}
async function saveDB(filename, data) {
  const filePath = import_path.default.join(DATA_DIR, filename);
  await import_promises.default.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
var ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
var AUTH_TOKEN = "dr-agarwal-admin-secure-token";
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${AUTH_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized access" });
  }
}
app.post("/api/auth/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ token: AUTH_TOKEN, message: "Login successful" });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});
app.get("/api/appointments", async (req, res) => {
  try {
    const appts = await getDB("appointments.json", INITIAL_APPOINTMENTS);
    appts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(appts);
  } catch (error) {
    res.status(500).json({ error: "Failed to load appointments" });
  }
});
app.post("/api/appointments", async (req, res) => {
  try {
    const { name, age, gender, phone, email, type, clinic, date, timeSlot, symptoms } = req.body;
    if (!name || !phone || !date || !timeSlot) {
      return res.status(400).json({ error: "Missing required appointment details" });
    }
    const appts = await getDB("appointments.json", INITIAL_APPOINTMENTS);
    const newAppt = {
      id: "appt_" + Date.now(),
      name,
      age: Number(age) || 30,
      gender: gender || "Other",
      phone,
      email: email || "",
      type: type || "Consultation",
      clinic: clinic || "Momentum Speciality Clinic",
      date,
      timeSlot,
      symptoms: symptoms || "",
      status: "Pending",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    appts.push(newAppt);
    await saveDB("appointments.json", appts);
    res.status(201).json(newAppt);
  } catch (error) {
    res.status(500).json({ error: "Failed to create appointment" });
  }
});
app.patch("/api/appointments/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, date, timeSlot } = req.body;
    const appts = await getDB("appointments.json", INITIAL_APPOINTMENTS);
    const idx = appts.findIndex((a) => a.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    if (status) appts[idx].status = status;
    if (date) appts[idx].date = date;
    if (timeSlot) appts[idx].timeSlot = timeSlot;
    await saveDB("appointments.json", appts);
    res.json(appts[idx]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
});
app.delete("/api/appointments/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const appts = await getDB("appointments.json", INITIAL_APPOINTMENTS);
    const filtered = appts.filter((a) => a.id !== id);
    if (appts.length === filtered.length) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    await saveDB("appointments.json", filtered);
    res.json({ success: true, message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});
app.get("/api/testimonials", async (req, res) => {
  try {
    const reviews = await getDB("testimonials.json", INITIAL_TESTIMONIALS);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to load testimonials" });
  }
});
app.post("/api/testimonials", async (req, res) => {
  try {
    const { name, age, condition, content, rating } = req.body;
    if (!name || !content || !rating) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const reviews = await getDB("testimonials.json", INITIAL_TESTIMONIALS);
    const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    const newReview = {
      id: "test_" + Date.now(),
      name,
      age: Number(age) || 40,
      condition: condition || "General Patient",
      content,
      rating: Number(rating),
      initials,
      approved: false,
      // requires admin approval by default
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    reviews.push(newReview);
    await saveDB("testimonials.json", reviews);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit review" });
  }
});
app.patch("/api/testimonials/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;
    const reviews = await getDB("testimonials.json", INITIAL_TESTIMONIALS);
    const idx = reviews.findIndex((r) => r.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    reviews[idx].approved = approved;
    await saveDB("testimonials.json", reviews);
    res.json(reviews[idx]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update testimonial" });
  }
});
app.delete("/api/testimonials/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await getDB("testimonials.json", INITIAL_TESTIMONIALS);
    const filtered = reviews.filter((r) => r.id !== id);
    if (reviews.length === filtered.length) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    await saveDB("testimonials.json", filtered);
    res.json({ success: true, message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
});
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await getDB("blogs.json", INITIAL_BLOGS);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to load blogs" });
  }
});
app.post("/api/blogs", authMiddleware, async (req, res) => {
  try {
    const { title, summary, category, readTime, content, image } = req.body;
    if (!title || !summary || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const blogs = await getDB("blogs.json", INITIAL_BLOGS);
    const newBlog = {
      id: "blog_" + Date.now(),
      title,
      summary,
      category: category || "General Care",
      readTime: readTime || "5 min read",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      image: image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
      content
    };
    blogs.push(newBlog);
    await saveDB("blogs.json", blogs);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to add blog article" });
  }
});
app.patch("/api/blogs/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, category, readTime, content, image } = req.body;
    const blogs = await getDB("blogs.json", INITIAL_BLOGS);
    const idx = blogs.findIndex((b) => b.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: "Blog not found" });
    }
    if (title) blogs[idx].title = title;
    if (summary) blogs[idx].summary = summary;
    if (category) blogs[idx].category = category;
    if (readTime) blogs[idx].readTime = readTime;
    if (content) blogs[idx].content = content;
    if (image) blogs[idx].image = image;
    await saveDB("blogs.json", blogs);
    res.json(blogs[idx]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog article" });
  }
});
app.delete("/api/blogs/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await getDB("blogs.json", INITIAL_BLOGS);
    const filtered = blogs.filter((b) => b.id !== id);
    if (blogs.length === filtered.length) {
      return res.status(404).json({ error: "Blog not found" });
    }
    await saveDB("blogs.json", filtered);
    res.json({ success: true, message: "Blog article deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog article" });
  }
});
app.get("/api/gallery", async (req, res) => {
  try {
    const gallery = await getDB("gallery.json", INITIAL_GALLERY);
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: "Failed to load gallery" });
  }
});
app.post("/api/gallery", authMiddleware, async (req, res) => {
  try {
    const { title, category, image, description } = req.body;
    if (!title || !category || !image) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const gallery = await getDB("gallery.json", INITIAL_GALLERY);
    const newGalleryItem = {
      id: "gal_" + Date.now(),
      title,
      category,
      image,
      description: description || ""
    };
    gallery.push(newGalleryItem);
    await saveDB("gallery.json", gallery);
    res.status(201).json(newGalleryItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add gallery item" });
  }
});
app.delete("/api/gallery/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await getDB("gallery.json", INITIAL_GALLERY);
    const filtered = gallery.filter((item) => item.id !== id);
    if (gallery.length === filtered.length) {
      return res.status(404).json({ error: "Gallery item not found" });
    }
    await saveDB("gallery.json", filtered);
    res.json({ success: true, message: "Gallery item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete gallery item" });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
