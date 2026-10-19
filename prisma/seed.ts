import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();
const DATA_DIR = path.join(process.cwd(), "data");

async function readJsonFile(filename: string, fallback: any[]) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return fallback;
  }
}

async function main() {
  console.log("Seeding SQLite database...");

  // 1. Seed 3 Authorized Admin Accounts
  const initialAdmins = [
    {
      email: "admin@orthoportal.com",
      name: "Dr. Dinesh Kumar Agarwal",
      role: "SUPER_ADMIN"
    },
    {
      email: "manager@orthoportal.com",
      name: "Clinic Manager",
      role: "ADMIN"
    },
    {
      email: "assistant@orthoportal.com",
      name: "Clinic Assistant",
      role: "ADMIN"
    }
  ];

  const defaultPasswordHash = await bcrypt.hash("admin123", 10);

  for (const admin of initialAdmins) {
    const existing = await prisma.adminUser.findUnique({
      where: { email: admin.email }
    });

    if (!existing) {
      await prisma.adminUser.create({
        data: {
          email: admin.email,
          password: defaultPasswordHash,
          name: admin.name,
          role: admin.role
        }
      });
      console.log(`Created Admin: ${admin.name} (${admin.email})`);
    }
  }

  // 2. Seed Patient Inquiries (Appointments)
  const appts = await readJsonFile("appointments.json", []);
  for (const appt of appts) {
    const exists = await prisma.patientInquiry.findUnique({
      where: { id: appt.id }
    });
    if (!exists) {
      await prisma.patientInquiry.create({
        data: {
          id: appt.id,
          name: appt.name,
          age: Number(appt.age) || 30,
          gender: appt.gender || "Male",
          phone: appt.phone || "",
          email: appt.email || null,
          type: appt.type || "Consultation",
          clinic: appt.clinic || "Momentum Speciality Clinic",
          date: appt.date || "2026-08-20",
          timeSlot: appt.timeSlot || "07:00 PM - 07:15 PM",
          symptoms: appt.symptoms || "",
          status: appt.status || "Pending",
          createdAt: appt.createdAt ? new Date(appt.createdAt) : new Date()
        }
      });
    }
  }

  // 3. Seed Testimonials
  const testimonials = await readJsonFile("testimonials.json", []);
  for (const test of testimonials) {
    const exists = await prisma.testimonial.findUnique({
      where: { id: test.id }
    });
    if (!exists) {
      await prisma.testimonial.create({
        data: {
          id: test.id,
          name: test.name,
          age: Number(test.age) || 40,
          condition: test.condition || "Spine Consultation",
          content: test.content,
          rating: test.rating || 5,
          initials: test.initials || "DA",
          approved: test.approved ?? true,
          date: test.date || "2026-07-20"
        }
      });
    }
  }

  // 4. Seed Blogs
  const blogs = await readJsonFile("blogs.json", []);
  for (const blog of blogs) {
    const exists = await prisma.blogArticle.findUnique({
      where: { id: blog.id }
    });
    if (!exists) {
      await prisma.blogArticle.create({
        data: {
          id: blog.id,
          title: blog.title,
          summary: blog.summary,
          category: blog.category,
          readTime: blog.readTime,
          date: blog.date,
          image: blog.image,
          content: blog.content
        }
      });
    }
  }

  // 5. Seed Gallery
  const gallery = await readJsonFile("gallery.json", []);
  for (const item of gallery) {
    const exists = await prisma.galleryItem.findUnique({
      where: { id: item.id }
    });
    if (!exists) {
      await prisma.galleryItem.create({
        data: {
          id: item.id,
          title: item.title,
          category: item.category,
          image: item.image,
          description: item.description
        }
      });
    }
  }

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("Error during database seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
