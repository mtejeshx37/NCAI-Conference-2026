# Conference Website Backend

Node.js/Express backend server for the NCAI 2026 conference website, handling payment processing, paper submissions, and email notifications.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.sample .env
# Edit .env with your credentials

# Development mode (with auto-reload)
npm run dev

# Production build
npm run build
npm start
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── payment.ts    # Payment & submission logic
│   │   ├── papers.ts     # Papers retrieval
│   │   └── ...
│   ├── routes/           # API route definitions
│   ├── services/         # Business logic
│   │   ├── github.ts    # GitHub storage service
│   │   └── ...
│   ├── middlewares/      # Express middlewares
│   ├── templates/        # Email templates
│   └── index.ts          # Server entry point
├── config/               # Configuration files
├── build/                # Compiled JavaScript (generated)
├── package.json
└── tsconfig.json
```

## 🔌 API Endpoints

### Payment & Submissions

**POST /payment/createOrder**
- Creates a Razorpay payment order
- Body: `{ amount, receipt, notes, email }`
- Returns: `{ status, order: { id, amount, currency } }`

**POST /payment/complete**
- Completes payment and saves paper
- Body: FormData with payment details + manuscript file
- Returns: `{ status, message, fileLink, paperId }`

**POST /payment/verify**
- Verifies Razorpay payment signature
- Body: `{ order_id, payment_id, signature }`
- Returns: `{ status, message }`

### Papers

**GET /papers**
- Retrieves all submitted papers
- Returns: `{ status, data: [...papers], message }`

## ⚙️ Environment Variables

```bash
# Server Configuration
PORT=5001

# Database (PostgreSQL)
DB_USER=postgres
DB_HOST=localhost
DB_NAME=magnus_db
DB_PASS=your_password
DB_PORT=5432

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key

# AWS SES Email Service
SES_ACCESS_KEY=your_access_key
SES_SECRET_ACCESS_KEY=your_secret_key
REGION=ap-south-1
SES_VERIFIED_EMAIL=noreply@yourdomain.com

# GitHub Paper Storage
AUTO_COMMIT_PAPERS=true    # Auto-commit papers to git
AUTO_PUSH_PAPERS=false     # Auto-push to remote (use with caution)

# JWT Authentication (if needed)
JWT_SECRET=your_jwt_secret
```

## 🔧 Services

### GitHub Storage Service

Saves papers to the `Magnus_IEEE_Conference-main` repository:

```typescript
import { savePaperToGitHub } from './services/github';

const result = await savePaperToGitHub(file, {
  title: "Paper Title",
  authors: ["Author Name"],
  track: "Machine Learning",
  email: "author@email.com"
});
// Returns: { success, paperId, filePath }
```

**Features:**
- Saves PDFs to `../Magnus_IEEE_Conference-main/pdfs/`
- Updates `papers.json` with metadata
- Auto-commits to git (configurable)
- Generates unique filenames

### Payment Service

Integrates with Razorpay for payment processing:

```typescript
// Create order
const order = await razorpay.orders.create({
  amount: 500000,  // in paise (₹5000)
  currency: "INR",
  receipt: "rcpt_123"
});

// Verify signature
const isValid = verifyPaymentSignature(
  order_id,
  payment_id,
  signature
);
```

### Email Service

Sends confirmation emails using AWS SES:

```typescript
import { sendRegistrationEmail } from './templates/mail';

await sendRegistrationEmail("John Doe", "john@example.com");
```

## 🧪 Mock Mode

For development without real API keys:

```bash
# In .env
RAZORPAY_KEY_ID=rzp_test_placeholder
RAZORPAY_KEY_SECRET=secret_placeholder
```

The backend automatically detects placeholder values and enables mock mode:
- ✅ Mock payment orders
- ✅ Mock email sending (console logs)
- ✅ Real file storage (local)

## 🏗️ Development

### Build TypeScript

```bash
npm run build
```

### Watch Mode

```bash
npm run dev
# Watches for changes and auto-recompiles
```

### Code Structure

- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic (payments, storage, email)
- **Routes**: Define API endpoints
- **Middlewares**: Request processing (auth, validation, error handling)

## 🔒 Security

- ✅ Payment signature verification
- ✅ CORS configuration
- ✅ File upload validation
- ✅ Secure filename sanitization
- ✅ Environment variable protection

## 📊 Database Schema (Optional)

If using PostgreSQL:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  payment_id VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🐛 Troubleshooting

**Port already in use:**
```bash
lsof -ti:5001 | xargs kill -9
```

**TypeScript compilation errors:**
```bash
rm -rf build node_modules
npm install
npm run build
```

**Git commit fails:**
- Check `AUTO_COMMIT_PAPERS` is set to `true`
- Ensure git is configured: `git config user.name` and `git config user.email`
- Verify write permissions to papers repository

## 📝 Scripts

```json
{
  "build": "rimraf build && npx tsc",
  "start": "node build/src/index.js",
  "dev": "concurrently \"npx tsc --watch\" \"nodemon build/src/index.js\""
}
```

## 🤝 Contributing

1. Follow TypeScript best practices
2. Add JSDoc comments for public APIs
3. Test with mock mode before production
4. Update this README for new features

---

**Note**: This backend is designed to work with the NCAI 2026 frontend. Ensure both are running for full functionality.
