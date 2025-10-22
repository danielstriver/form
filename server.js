import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load .env file variables

const app = express();
const PORT = 5000;

// Middlewares

app.use(cors());
app.use(express.json()); // Parses incoming JSON from frontend

// ROUTE: Handle form submission
app.post("/send", async (req, res) => {
    const {name, email, message} = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({success: false, message: "All fields are required."});
    }

    // Configure your email transporter
    const transporter = nodemailer.createTransport({
        service: "gmail", // Use your email service (e.g: gmail, outlook, yahoo)
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // The email details
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // You'll receive the message here
        subject: `New Message From ${name}`,
        text: `From: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({success: true, message: "Message sent successfully!"});
    } catch (error) {
        console.error("Email send error:", error);
        res.status(500).json({success: false, message: "Failed to send message. Try again later"});
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));