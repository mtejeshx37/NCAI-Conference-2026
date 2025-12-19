# Conference Website - NCAI 2026

A modern, professional conference website for the National Conference on Artificial Intelligence (NCAI 2026) with integrated paper submission, payment processing, and repository management.

## 🎯 Features

- **Modern Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Paper Submission System**: Multi-step form with file upload
- **Payment Integration**: Razorpay payment gateway (mock mode supported)
- **GitHub Storage**: Papers automatically saved to repository
- **Email Notifications**: Automated confirmation emails
- **Responsive Design**: Mobile-first, professional UI/UX

## 📁 Project Structure

```
Conference-Website/
├── src/                    # Frontend React components
├── public/                 # Static assets
├── backend/                # Node.js/Express API server
├── Magnus_IEEE_Conference-main/  # Papers repository
├── index.html             # Main HTML entry point
└── package.json           # Frontend dependencies
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Conference Website"
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Configure environment variables**
   ```bash
   cd backend
   cp .env.sample .env
   # Edit .env with your credentials
   ```

5. **Start development servers**

   **Terminal 1 - Frontend:**
   ```bash
   npm run dev
   ```

   **Terminal 2 - Backend:**
   ```bash
   cd backend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:5001

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env` from `backend/.env.sample`:

```bash
# Server
PORT=5001

# Database (PostgreSQL - optional)
DB_USER=postgres
DB_HOST=localhost
DB_NAME=magnus_db
DB_PASS=password
DB_PORT=5432

# Razorpay
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret

# Email (AWS SES)
SES_ACCESS_KEY=your_access_key
SES_SECRET_ACCESS_KEY=your_secret_key
REGION=ap-south-1

# GitHub Auto-Commit
AUTO_COMMIT_PAPERS=true
AUTO_PUSH_PAPERS=false
```

## 📚 Documentation

- **Backend API**: See [backend/README.md](backend/README.md)
- **Paper Storage**: Papers saved to `Magnus_IEEE_Conference-main/pdfs/`
- **Metadata**: Tracked in `Magnus_IEEE_Conference-main/papers.json`

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Lucide Icons
- **Payment**: Razorpay Checkout SDK

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Payment**: Razorpay API
- **Email**: AWS SES / Nodemailer
- **File Storage**: Local filesystem + Git
- **Database**: PostgreSQL (optional)

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payment/createOrder` | Create Razorpay payment order |
| POST | `/payment/complete` | Complete payment & save paper |
| GET | `/papers` | Get all submitted papers |

## 🎨 Features in Detail

### Paper Submission Flow

1. User fills multi-step form (Details → Upload → Review)
2. Clicks "Proceed to Payment"
3. Razorpay checkout modal opens
4. On successful payment:
   - Paper saved to `Magnus_IEEE_Conference-main/pdfs/`
   - Metadata added to `papers.json`
   - Git commit created (if enabled)
   - Confirmation email sent

### Mock Mode

The system supports mock mode for development without real API keys:
- **Mock Payments**: Creates test orders without Razorpay
- **Mock Emails**: Logs emails to console
- **Mock Storage**: Saves papers locally without external services

## 🔒 Security

- Payment signature verification
- File upload validation
- Secure filename sanitization
- Environment variable protection
- CORS configuration

## 📦 Build & Deploy

### Build Frontend
```bash
npm run build
```

### Build Backend
```bash
cd backend
npm run build
```

### Production
- Frontend build output: `dist/`
- Backend build output: `backend/build/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

[Your License Here]

## 👥 Team

Chennai Institute of Technology - CSE AIML Department

## 🆘 Support

For issues or questions:
- Email: magnus@citchennai.net
- Website: [Your Website]

---

**Note**: This project uses mock services by default. Configure real API keys in `backend/.env` for production use.
