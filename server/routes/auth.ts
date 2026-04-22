import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev_only";

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUsers = await db.select().from(users).where(eq(users.email, email));
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Email đã tồn tại" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = nanoid();

    await db.insert(users).values({
      id: userId,
      email,
      passwordHash,
      name,
    });

    const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "7d" });
    return res.status(201).json({ token, user: { id: userId, email, name } });
  } catch (err: any) {
    return res.status(500).json({ error: "Lỗi Server" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userList = await db.select().from(users).where(eq(users.email, email));
    if (userList.length === 0) {
      return res.status(400).json({ error: "Email hoặc mật khẩu không đúng" });
    }

    const user = userList[0];
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ error: "Email hoặc mật khẩu không đúng" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err: any) {
    return res.status(500).json({ error: "Lỗi Server" });
  }
});

router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userList = await db.select().from(users).where(eq(users.id, decoded.userId));

    if (userList.length === 0) {
      return res.status(404).json({ error: "User không tồn tại" });
    }

    const user = userList[0];
    return res.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (err: any) {
    return res.status(401).json({ error: "Token không hợp lệ" });
  }
});

export default router;
