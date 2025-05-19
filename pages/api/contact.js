import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { first_name, last_name, email, phone, message, user_ip } = req.body;

    // Get the host from headers or use the domain directly
    const host = req.headers.host;

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/contact_us`,
      headers: {
        "Content-Type": "application/json",
        host: host,
        origin: req.headers.origin,
        referer: req.headers.referer,
        "x-forwarded-host": host,
        "x-forwarded-proto": req.headers["x-forwarded-proto"] || "https",
      },
      data: {
        first_name,
        last_name,
        email,
        phone,
        message,
        user_ip,
      },
    };

    console.log("Request headers:", req.headers); // Debug log
    console.log("API config:", config); // Debug log

    const response = await axios.request(config);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message,
    });
  }
}
