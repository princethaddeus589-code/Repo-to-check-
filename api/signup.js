import { getAdminAuth } from "./_firebase.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, password } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const auth = getAdminAuth();
    const user = await auth.createUser({
      displayName: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    return res.status(201).json({
      message: "Account created successfully",
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    });
  } catch (error) {
    console.error("Signup error:", error.code || error.message);

    if (error.code === "auth/email-already-exists") {
      return res.status(400).json({
        message: "This email is already registered",
      });
    }

    if (String(error.message || "").includes("FIREBASE_SERVICE_ACCOUNT")) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(400).json({
      message: "Unable to create account",
    });
  }
}
