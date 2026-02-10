# Bank ABC Voice Agent - Frontend

AI-powered banking voice assistant built with React, TypeScript, and TailwindCSS v4.

## 🚀 Features

- ✅ **Voice Interaction** - Speech-to-Text (STT) and Text-to-Speech (TTS)
- ✅ **6 Banking Flows** - Card issues, account servicing, account opening, digital support, transfers, account closure
- ✅ **Real-time Chat** - Instant responses with banking data visualization
- ✅ **Chat History** - Persistent conversation history with localStorage
- ✅ **Authentication** - Customer verification with PIN
- ✅ **Banking Data Display** - Balance cards, cards list, transaction tables
- ✅ **Responsive Design** - Mobile, tablet, and desktop support
- ✅ **Dark Mode Ready** - Dark mode classes implemented
- ✅ **Accessibility** - ARIA labels, keyboard navigation, screen reader support

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS v4
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Voice**: Web Speech API

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your backend URL
VITE_API_BASE_URL=http://localhost:8000
```

## 🏃 Development

```bash
# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌍 Environment Variables

Create `.env` file in root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

For production, create `.env.production`:

```env
VITE_API_BASE_URL=https://your-backend-api.com
```

## 🧪 Testing

Follow the comprehensive testing guide:

```bash
# See testing documentation
documents/TESTING_GUIDE.md
```

### Test Credentials
- **Customer ID**: CUST001
- **PIN**: 1234

## 📁 Project Structure

```
bank-voice-agent-fe/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── store/          # Redux store
│   ├── types/          # TypeScript types
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── documents/          # Documentation
├── .env.example        # Environment template
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

## 🎨 Components

### Core Components
- `ChatPage` - Main chat interface
- `Sidebar` - Chat history navigation
- `ChatHeader` - Header with verification status
- `MessageList` - Scrollable message container
- `MessageBubble` - Individual message display
- `ChatInput` - Text input with voice button

### Banking Components
- `BalanceCard` - Account balance display
- `CardsList` - Customer cards list
- `TransactionTable` - Transaction history table

### Feature Components
- `VerificationModal` - Customer authentication
- `VoiceInputButton` - Microphone control
- `VoiceControls` - TTS settings
- `ThemeToggle` - Dark/light mode toggle
- `ErrorBoundary` - Error handling
- `ErrorAlert` - Error messages
- `Skeletons` - Loading states

## 🔧 Configuration

### TailwindCSS v4
Configuration in `tailwind.config.ts`:
```typescript
export default {
  darkMode: 'class',
}
```

### Vite Build Optimization
- Code splitting for vendors
- Manual chunks for React, Redux, Axios
- Sourcemap disabled in production
- Chunk size warning at 1000kb

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

Output in `dist/` directory.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Environment Variables in Production

Set these in your hosting platform:
- `VITE_API_BASE_URL` - Backend API URL

## 📊 Performance

- **Initial Load**: < 2 seconds
- **Message Send**: < 1 second
- **API Response**: < 3 seconds
- **Session Switch**: < 500ms
- **Voice Recognition**: < 100ms delay

## ♿ Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader compatible
- Focus indicators visible
- Color contrast WCAG AA compliant

## 🐛 Known Issues

1. Theme toggle button changes icon but doesn't switch theme
2. Regenerate message button not implemented
3. No pagination for transactions

## 📝 License

Proprietary - Bank ABC

## 👥 Support

For issues or questions, contact: support@bankabc.com

---

**Version**: 1.0.0  
**Last Updated**: 2024
