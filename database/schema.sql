-- Students Table
CREATE TABLE Students (
  scholarId VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  dept VARCHAR(50) NOT NULL,
  year INTEGER NOT NULL,
  aadhar VARCHAR(12),
  guardianContact VARCHAR(15),
  localAddress TEXT,
  photoUrl TEXT,
  signatureUrl TEXT
);

-- Admins Table
CREATE TABLE Admins (
  adminId SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- Store hashed passwords
  role VARCHAR(20) NOT NULL, -- 'Super' or 'Verifier'
  dept VARCHAR(50) -- For Verifiers
);

-- Registrations Table
CREATE TABLE Registrations (
  regId SERIAL PRIMARY KEY,
  scholarId VARCHAR(20) REFERENCES Students(scholarId),
  semester INTEGER NOT NULL,
  subjects TEXT[], -- Array of subjects
  status VARCHAR(20) DEFAULT 'Pending',
  remarks TEXT
);

-- Dues Table
CREATE TABLE Dues (
  dueId SERIAL PRIMARY KEY,
  scholarId VARCHAR(20) REFERENCES Students(scholarId),
  type VARCHAR(50) NOT NULL,
  receiptUrl TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending',
  remarks TEXT
);

-- Notifications Table
CREATE TABLE Notifications (
  notifId SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  body TEXT NOT NULL,
  target VARCHAR(50) NOT NULL, -- 'All', 'Dept', 'Year'
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'Sent'
);

-- Enable Row Level Security (RLS) on tables as needed
-- For example, on Students:
ALTER TABLE Students ENABLE ROW LEVEL SECURITY;
-- Add policies via Supabase dashboard or additional SQL