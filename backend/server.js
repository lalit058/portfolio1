const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route (so http://localhost:3000/ shows something instead of "Cannot GET /")
app.get('/', (req, res) => {
    res.send('✅ Server is running. Use POST /contact to send a message.');
});

// POST route for contact form
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: '⚠️ Please fill all fields' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '56.negilalit@gmail.com',       
                pass: 'btec efyl ljvc kssf'           // Gmail App Password (not your normal password!)
            }
        });

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: '56.negilalit@gmail.com',            
            subject: `📩 New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}\n`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: '✓ Message sent successfully!' });
    } catch (error) {
        console.error('❌ Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message. Try again later.' });
    }
});

// Start server
app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
});
