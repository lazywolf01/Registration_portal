const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(bodyParser.json());

// TODO: Implement OTP sending logic (e.g., using Twilio or email service)
const sendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // Simulate sending OTP
  console.log(`OTP sent to ${email}: ${otp}`);
  return otp;
};

// Login endpoint
app.post('/login', async (req, res) => {
  const { scholarId, email } = req.body;
  // Validate format
  if (!email.endsWith('@nits.ac.in')) return res.status(400).json({ error: 'Invalid email format' });

  // For dummy testing, skip Supabase check and always proceed
  // const { data, error } = await supabase.from('Students').select('*').eq('scholarId', scholarId).eq('email', email);
  // if (error || data.length === 0) return res.status(404).json({ error: 'Student not found' });

  const otp = await sendOTP(email);
  // Store OTP temporarily (use Redis or in-memory for production)
  // For simplicity, assume a map
  global.otpMap = global.otpMap || {};
  global.otpMap[email] = { otp, attempts: 0 };

  res.json({ message: 'OTP sent' });
});

// Verify OTP
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!global.otpMap[email]) return res.status(400).json({ error: 'No OTP sent' });

  if (global.otpMap[email].attempts >= 3) return res.status(429).json({ error: 'Max attempts reached' });

  if (global.otpMap[email].otp === otp) {
    delete global.otpMap[email];
    // Generate JWT or session
    res.json({ token: 'dummy-token' });
  } else {
    global.otpMap[email].attempts++;
    res.status(400).json({ error: 'Invalid OTP', attemptsLeft: 3 - global.otpMap[email].attempts });
  }
});

// Dashboard data
app.get('/dashboard/:scholarId', async (req, res) => {
  const { scholarId } = req.params;
  // Simulate student data
  res.json({ scholarId, name: 'Dummy Student', duesPending: true });
});

// Form submission
app.post('/form', async (req, res) => {
  const formData = req.body;
  // Simulate success
  res.json({ message: 'Form submitted' });
});

// Dues upload
app.post('/dues', async (req, res) => {
  const { scholarId, receiptUrl, type } = req.body;
  // Simulate success
  res.json({ message: 'Dues uploaded' });
});

// Notifications
app.get('/notifications/:scholarId', async (req, res) => {
  const { scholarId } = req.params;
  // Simulate notifications
  res.json([{ id: 1, message: 'Dummy notification' }]);
});

// Admin endpoints
app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  // Simulate admin login
  if (email === 'admin@nits.ac.in' && password === 'admin123') {
    res.json({ token: 'admin-token', role: 'Admin' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Other admin endpoints: students list, verify dues, verify registration, etc.
app.get('/admin/students', async (req, res) => {
  // Simulate students list
  res.json([{ scholarId: '123456', name: 'Dummy Student' }]);
});

// Add more endpoints as needed

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});