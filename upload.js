// api/upload.js
export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method Not Allowed" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { image } = body;
    if (!image) return res.status(400).json({ ok: false, error: "Missing image" });

    const base64 = image.split(";base64,").pop();
    const buffer = Buffer.from(base64, "base64");

    const form = new FormData();
    form.append("chat_id", process.env.xoNA12);
    form.append("photo", new Blob([buffer], { type: "image/png" }), "image.png");

    const tg = await fetch(`https://api.telegram.org/bot${process.env.8179040156:AAFdn8ApCAIbaWhpLaFQMyqrwUwfR1hfyuY}/sendPhoto`, {
      method: "POST",
      body: form
    });

    const tgJson = await tg.json().catch(() => ({}));
    if (!tg.ok || tgJson?.ok === false) {
      throw new Error(tgJson?.description || "Telegram API error");
    }

    res.status(200).json({ ok: true, message: "تم الإرسال ✅" });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
