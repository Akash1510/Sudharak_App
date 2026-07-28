# 🚀 Sudharak – AI Powered Civic Issue Reporting & Resolution Platform

<div align="center">

![ReactNative](https://img.shields.io/badge/react-native-mobile?logo=reactnative)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)
![Python](https://img.shields.io/badge/Python-AI-yellow?logo=python)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)
![AWS](https://img.shields.io/badge/AWS-Cloud-orange?logo=amazonaws)
![License](https://img.shields.io/badge/License-MIT-blue)

**AI-Powered Smart Civic Complaint Management System**

Empowering citizens to report, track, and resolve civic issues efficiently using Artificial Intelligence.

</div>

---

# 📌 Overview

Sudharak is an AI-powered civic issue reporting platform that enables citizens to report public issues such as:

- 🛣️ Potholes
- 🗑️ Garbage
- 🚦 Traffic Signals
- 💡 Street Lights
- 🚰 Water Leakage
- 🌳 Fallen Trees
- ⚠️ Other Public Infrastructure Issues

The platform leverages AI to automatically analyze uploaded images, enhance complaint descriptions, classify issue categories, estimate severity, and route reports to the appropriate municipal department.

---

# ✨ Features

## 👤 Citizen Portal

- OTP Authentication
- Profile Management
- Multilingual Support
- AI Guided Complaint Submission
- Upload Images
- Location Detection
- Live Complaint Tracking
- Upvote Existing Complaints
- Comments & Discussions
- Complaint History

---

## 🤖 AI Features

- Image Analysis using Gemini Vision API
- Automatic Issue Classification
- AI Generated Complaint Description
- Severity Prediction
- Spam Detection
- Duplicate Detection (Planned)
- Smart Department Routing
- Priority Scoring

---

## 🛠 Admin Dashboard

- Complaint Management
- Analytics Dashboard
- Issue Heatmaps
- User Management
- Department Assignment
- Resolution Workflow
- Statistics & Reports

---

# 🏗 System Architecture

```
                Flutter Mobile App
                        │
                Authentication API
                        │
       ┌────────────────┼────────────────┐
       │                │                │
 Auth Service      Report Service     AI Service
(Node.js)          (Node.js)         (Flask)
       │                │                │
       └────────────MongoDB──────────────┘
                        │
                    Redis Cache
                        │
                    Kafka Events
                        │
                     AWS S3 Storage
```

---

# 🛠 Tech Stack

## Mobile

- Flutter
- Dart

## Backend

- Node.js
- Express.js

## AI Service

- Python
- Flask
- Gemini Vision API

## Database

- MongoDB

## Cache

- Redis

## Event Streaming

- Apache Kafka

## Authentication

- JWT
- OTP Verification

## Cloud

- AWS EC2
- AWS S3

## DevOps

- Docker
- Nginx
- PM2
- GitHub Actions

---

# 📂 Project Structure

```
Sudharak/
│
├── mobile_app/
│
├── backend/
│   ├── auth-service/
│   ├── report-service/
│   └── ai-service/
│
├── admin-panel/
│
│
└── README.md
```

---

# ⚙️ Workflow

```
Citizen

    │

Upload Image + Description

    │

AI Analysis

    │

Issue Classification

    │

Severity Prediction

    │

Department Assignment

    │

MongoDB Storage

    │

Citizen Tracking

    │

Authority Resolution

    │

Issue Closed
```

---

# 🔐 Authentication Flow

```
Citizen

   │

Enter Mobile Number

   │

Receive OTP

   │

Verify OTP

   │

JWT Generated

   │

Authenticated Requests
```

---

# 🧠 AI Pipeline

1. Upload Image
2. Image Analysis
3. Detect Civic Issue
4. Generate Enhanced Description
5. Estimate Severity
6. Assign Category
7. Route to Department
8. Store Report
9. Notify Citizen

---

# 📊 Complaint Status

- Pending
- Confirmed
- In Progress
- Resolved
- Rejected

---

# 🌍 Supported Languages

- English
- Hindi
- Marathi

---

# 🚀 Deployment

Production deployment uses:

- AWS EC2
- Nginx Reverse Proxy
- PM2 Process Manager
- GitHub Actions CI/CD
- MongoDB
- Redis
- Kafka
- AWS S3

---

# 🔄 CI/CD Pipeline

```
Developer

      │

Push to GitHub

      │

GitHub Actions

      │

SSH into EC2

      │

Pull Latest Code

      │

Install Dependencies

      │

Build Application

      │

Restart PM2 Services

      │

Deployment Complete
```

---

# 📦 Environment Variables

Example:

```
PORT=

MONGODB_URI=

JWT_SECRET=

REDIS_URL=

KAFKA_BROKER=

AWS_ACCESS_KEY=

AWS_SECRET_KEY=

AWS_BUCKET=

GEMINI_API_KEY=

OTP_PROVIDER_KEY=
```

---

# 📈 Future Improvements

- AI Duplicate Complaint Detection
- GIS Heatmaps
- Push Notifications
- Voice Complaint Submission
- Authority Dashboard Analytics
- Predictive Maintenance
- ML-based Issue Prioritization

---

# 🤝 Contributing

1. Fork Repository
2. Create Feature Branch

```
git checkout -b feature/feature-name
```

3. Commit Changes

```
git commit -m "feat: add new feature"
```

4. Push Branch

```
git push origin feature/feature-name
```

5. Create Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Authors

**Akash Jadhav**

B.Tech Computer Engineering

JSPM BSIOTR, Pune

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

---
