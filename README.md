# 🏢 Online Registration System – NIT Silchar

A full-stack online semester registration system designed for NIT Silchar. It allows students to log in using their scholar ID and email, upload fee receipts, fill dynamic registration forms, and track registration status. Admins can verify documents, manage student data, and handle approvals through a dedicated panel.

![Dashboard Screenshot]
<img width="1903" height="907" alt="Screenshot 2025-07-19 214627" src="https://github.com/user-attachments/assets/7e6b6447-6cf9-4fa8-910c-20d8c2b1716b" />


---

## 🚀 Features

### 👨‍🏫 Student Portal

* 🔐 Login with Scholar ID + Email (OTP verification)
* 🧾 Upload SBI Collect payment receipt
* 📝 Prefilled dynamic registration form using Supabase
* 🧮 Payment section with fee breakdown
* 📋 Dashboard to view registration status & uploaded documents

### 👨‍💼 Admin Panel

* ✅ Verify and approve student registrations
* 📂 View and manage uploaded documents
* 🔍 Search/filter student data by branch, semester, etc.

---

## 🛠️ Tech Stack

| Frontend                     | Backend           | Database | Auth              | Storage          |
| ---------------------------- | ----------------- | -------- | ----------------- | ---------------- |
| React.js (with Tailwind CSS) | Node.js + Express | Supabase | Supabase OTP Auth | Supabase Storage |

---

## 📦 Folder Structure

```
Online_registrations/
🔻 client/               # React frontend
🔻 ├── components/
🔻 ├── pages/
🔻 ├── assets/
🔻 └── tailwind.config.js
🔻 server/               # Node.js backend
🔻 ├── routes/
🔻 ├── controllers/
🔻 └── index.js
🔻 supabase/             # Supabase config & SQL dump
🔻 README.md
🔻 package.json
```

---

## 📸 UI Preview

| Login Page                   | Student Dashboard                        | Admin Panel                        |
| ---------------------------- | ---------------------------------------- | ---------------------------------- |
| (<img width="1904" height="915" alt="Screenshot 2025-07-19 175958" src="https://github.com/user-attachments/assets/5e92f206-140a-43bf-9366-fbc067838abe" />|(<img width="1903" height="907" alt="Screenshot 2025-07-19 214627" src="https://github.com/user-attachments/assets/1b42e61c-cf1a-4dc6-a46c-c28e3b3b76e1" /> | ![](<img width="1859" height="915" alt="Screenshot 2025-07-19 214759" src="https://github.com/user-attachments/assets/7211be78-21ff-46ed-98d6-61fffdc44f62" />
) |

---

## 🧑‍💻 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/KumariSiddhi/Online_registrations.git
cd Online_registrations
```

### 2. Install Dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3. Configure Supabase

* Set up a Supabase project at [https://supabase.com](https://supabase.com)
* Replace Supabase API keys and URL in:

  * `client/.env`
  * `server/.env`

### 4. Run the Project

```bash
# In /client
npm run dev

# In /server
node index.js
```

---

## 🔐 Environment Variables

Create `.env` files in both `/client` and `/server` directories with the following values:

### `/client/.env`

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### `/server/.env`

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_role_key
```

---

## ✨ Future Improvements

* Add email notifications for registration approval
* Allow uploading signed registration form PDFs
* Export Excel/CSV reports for admin
* Integrate Razorpay/Stripe for online fee payment

---

## 🤝 Contributing

Contributions, suggestions, and pull requests are welcome!
If you find a bug or want to improve a feature, feel free to fork and submit a PR.

---

## 📄 License

MIT License © 2025 [Alok Tiwari](https://github.com/lazywolf01/)
