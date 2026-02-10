# Bank ABC Voice Agent - Frontend

AI-powered banking assistant built with React, TypeScript, and TailwindCSS v4. The application provides two distinct interfaces for customer interaction: a traditional text-based chat and an advanced voice-enabled dashboard.

## Features

### Core Capabilities
- **Dual Interface System** - Text chat and voice AI dashboard with seamless navigation
- **Voice Interaction** - Complete voice workflow with speech-to-text, AI processing, and text-to-speech
- **6 Banking Flows** - Card issues, account servicing, account opening, digital support, transfers, account closure
- **Real-time Chat** - Instant responses with banking data visualization
- **Conversation History** - Persistent chat and voice conversation history with localStorage
- **Customer Authentication** - PIN-based verification system with session management
- **Banking Data Display** - Balance cards, cards list, transaction tables
- **Responsive Design** - Optimized for mobile, tablet, and desktop devices
- **Dark Mode Support** - Complete dark and light theme implementation
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS v4
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Voice Processing**: Web Speech API, MediaRecorder API
- **Audio Handling**: Native Web Audio API

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your backend URL
VITE_API_BASE_URL=http://localhost:8000
```

## Development

```bash
# Start development server (port 3000)
npm run dev

# Access the application
http://localhost:3000

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Application Interfaces

The application provides two distinct interfaces accessible through the navigation tabs:

### Text Chat Interface
**Route**: `/chat`

A traditional text-based chat interface for customers who prefer typing or don't have microphone access.

**Key Features**:
- Text input with send button
- Optional voice input button for speech-to-text
- Optional text-to-speech for AI responses (toggle on/off)
- Voice speed control (0.5x to 2.0x)
- Real-time message display
- Banking data visualization (balance, cards, transactions)
- Session-based conversation history
- Sidebar with conversation management

**Use Cases**:
- Customers in quiet environments
- Users without microphone access
- Preference for reading over listening
- Multi-tasking scenarios
- Accessibility requirements

**Interaction Flow**:
1. User types message in text input
2. Optional: Use voice input button for speech-to-text
3. Message sent to AI backend
4. AI response displayed as text
5. Optional: AI response read aloud if TTS enabled
6. Banking data rendered if applicable

### Voice AI Dashboard
**Route**: `/voice`

An advanced voice-first interface designed for hands-free banking interactions.

**Key Features**:
- One-click voice recording (5-second limit)
- Automatic speech-to-text transcription
- AI processing with voice chat endpoint
- Automatic text-to-speech response
- Audio playback controls for responses
- Real-time status indicators (listening, transcribing, thinking, speaking)
- 2-second auto-submit delay after recording
- Text input fallback option
- Voice conversation history
- Compact input layout for better chat visibility

**Use Cases**:
- Hands-free banking while driving
- Multitasking scenarios
- Accessibility for visually impaired users
- Quick inquiries without typing
- Natural conversation preference

**Interaction Flow**:
1. User clicks microphone button
2. Records voice message (up to 5 seconds)
3. Recording stops automatically or manually
4. 2-second delay for review
5. Automatic transcription to text
6. Text sent to voice chat endpoint
7. AI processes and generates response
8. Response converted to speech
9. Audio plays automatically
10. User can replay audio anytime

### Interface Comparison

| Feature | Text Chat | Voice AI Dashboard |
|---------|-----------|--------------------|
| Primary Input | Keyboard | Microphone |
| Voice Input | Optional | Primary |
| Text Input | Primary | Fallback |
| TTS Response | Optional (toggle) | Automatic |
| Audio Playback | Manual control | Auto-play + replay |
| Recording Limit | N/A | 5 seconds |
| Auto-submit | Immediate | 2-second delay |
| Status Indicators | Basic | Detailed (4 states) |
| Best For | Typing preference | Hands-free use |
| Conversation History | Text-based | Voice-based |

## Environment Variables

Create `.env` file in root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

For production, create `.env.production`:

```env
VITE_API_BASE_URL=https://your-backend-api.com
```

## Testing

Refer to the comprehensive testing documentation:

- `documents/TESTING_GUIDE.md` - General testing guide
- `documents/VOICE_DASHBOARD.md` - Voice AI Dashboard documentation
- `documents/VOICE_QUICKSTART.md` - Voice AI Quick Start guide
- `documents/UNIFIED_HEADER.md` - Unified header implementation

### Test Credentials
- **Customer ID**: CUST001
- **PIN**: 1234

## Project Structure

```
bank-voice-agent-fe/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── UnifiedHeader.tsx        # Shared header component
│   │   ├── Navigation.tsx           # Tab navigation
│   │   ├── Sidebar.tsx              # Chat history sidebar
│   │   ├── VoiceSidebar.tsx         # Voice history sidebar
│   │   ├── VoiceRecorderButton.tsx  # Voice recording control
│   │   ├── VoiceStatusIndicator.tsx # Processing status display
│   │   ├── VoiceMessageBubble.tsx   # Voice message with audio
│   │   └── ...                      # Other components
│   ├── hooks/          # Custom hooks
│   │   ├── useAudioRecorder.ts      # Audio recording logic
│   │   ├── useSpeechRecognition.ts  # Speech-to-text
│   │   └── useSpeechSynthesis.ts    # Text-to-speech
│   ├── pages/          # Page components
│   │   ├── ChatPage.tsx             # Text chat interface
│   │   └── VoiceDashboard.tsx       # Voice AI interface
│   ├── services/       # API services
│   │   ├── chatService.ts           # Text chat API
│   │   └── voiceService.ts          # Voice API
│   ├── store/          # Redux store
│   │   ├── chatSlice.ts             # Chat state
│   │   ├── voiceSlice.ts            # Voice state
│   │   ├── chatHistorySlice.ts      # Chat history
│   │   ├── voiceHistorySlice.ts     # Voice history
│   │   └── ...                      # Other slices
│   ├── types/          # TypeScript types
│   │   ├── index.ts                 # Chat types
│   │   └── voice.ts                 # Voice types
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── documents/          # Documentation
├── .env.example        # Environment template
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

## Components

### Shared Components
- `UnifiedHeader` - Common header for both interfaces with navigation
- `Navigation` - Tab switcher between text chat and voice AI
- `ThemeToggle` - Dark/light mode toggle
- `VerificationModal` - Customer authentication modal
- `ErrorBoundary` - Error handling wrapper
- `ErrorAlert` - Error message display

### Text Chat Components
- `ChatPage` - Main text chat interface
- `Sidebar` - Chat conversation history
- `ChatHeader` - Legacy header (replaced by UnifiedHeader)
- `MessageList` - Scrollable message container
- `MessageBubble` - Individual message display
- `ChatInput` - Text input with optional voice button
- `VoiceInputButton` - Speech-to-text button
- `VoiceControls` - TTS settings (speed, toggle)

### Voice AI Components
- `VoiceDashboard` - Main voice AI interface
- `VoiceSidebar` - Voice conversation history
- `VoiceRecorderButton` - Microphone recording control
- `VoiceStatusIndicator` - Connection and processing status
- `VoiceMessageBubble` - Voice message with audio playback
- `VoiceConversationView` - Voice message list
- `VoiceVerificationModal` - Voice-specific authentication

### Banking Components
- `BalanceCard` - Account balance display
- `CardsList` - Customer cards list
- `TransactionTable` - Transaction history table

### Utility Components
- `Skeletons` - Loading state placeholders

## Configuration

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

### Voice Recording Settings
Default recording duration: 5 seconds
Auto-submit delay: 2 seconds

Modify in `src/hooks/useAudioRecorder.ts` and `src/pages/VoiceDashboard.tsx`

## Deployment

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

## Performance

- **Initial Load**: Under 2 seconds
- **Message Send**: Under 1 second
- **API Response**: Under 3 seconds
- **Session Switch**: Under 500ms
- **Voice Recording Start**: Under 100ms
- **Speech Recognition**: Under 2 seconds
- **Audio Playback**: Instant

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader compatible
- Focus indicators visible
- Color contrast WCAG AA compliant

## Known Issues

1. Theme toggle requires page refresh in some browsers
2. Regenerate message button not implemented
3. Transaction pagination not available
4. Voice recording may require HTTPS in production

## License

Proprietary - Bank ABC

## Support

For issues or questions, contact: support@bankabc.com

---

**Version**: 1.0.0  
**Last Updated**: 2024
