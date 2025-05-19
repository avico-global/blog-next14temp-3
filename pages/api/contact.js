import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { first_name, last_name, email, phone, message, user_ip } = req.body;

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/contact_us`,
      headers: {
        "Content-Type": "application/json",
        host: req.headers.host, // This will now work as it's set on the server side
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

    const response = await axios.request(config);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Something went wrong',
    });
  }
} 