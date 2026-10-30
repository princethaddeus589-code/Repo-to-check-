import { getAdminAuth } from "./_firebase.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { idToken, email, password } = req.body || {};
    const auth = getAdminAuth();

    // Path A: Firebase ID token
    if (idToken) {
      const decoded = await auth.verifyIdToken(idToken);
      const user = await auth.getUser(decoded.uid);
      return res.status(200).json({
        message: "Sign in successful",
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        token: idToken,
      });
    }

    // Path B: email + password via Firebase Auth REST API
    if (email && password) {
      const apiKey = process.env.FIREBASE_WEB_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          message:
            "FIREBASE_WEB_API_KEY is not set in Vercel Environment Variables.",
        });
      }

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: String(email).trim().toLowerCase(),
            password: String(password),
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const code = data?.error?.message || "";
        if (
          code.includes("INVALID_PASSWORD") ||
          code.includes("EMAIL_NOT_FOUND") ||
          code.includes("INVALID_LOGIN_CREDENTIALS")
        ) {
          return res.status(401).json({
            message: "Email or password is incorrect",
          });
        }
        return res.status(401).json({
          message: data?.error?.message || "Sign in failed",
        });
      }

      let displayName = data.displayName || "";
      try {
        const user = await auth.getUser(data.localId);
        displayName = user.displayName || displayName;
      } catch {
        // ignore
      }

      return res.status(200).json({
        message: "Sign in successful",
        uid: data.localId,
        name: displayName || String(email).split("@")[0],
        email: data.email,
        token: data.idToken,
      });
    }

    return res.status(400).json({
      message: "Provide either idToken or email and password",
    });
  } catch (error) {
    console.error("Signin error:", error.code || error.message);

    if (String(error.message || "").includes("FIREBASE_SERVICE_ACCOUNT")) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(401).json({
      message: "Invalid or expired authentication",
    });
  }
}
