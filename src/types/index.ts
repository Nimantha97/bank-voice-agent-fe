// Message Types
export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  flow?: string;
  balance?: number;
  cards?: Card[];
  transactions?: Transaction[];
}

// Chat State
export interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

// Session State
export interface SessionState {
  sessionId: string;
  customerId: string | null;
  verified: boolean;
}

// Customer & Card Types
export interface Card {
  card_number: string;
  card_type: string;
  status: string;
  expiry_date: string;
}

export interface Customer {
  customer_id: string;
  name: string;
  account_number: string;
  balance: number;
  address?: string;
  cards?: Card[];
}

// API Request Types
export interface ChatRequest {
  message: string;
  customer_id: string | null;
  session_id: string;
  verified: boolean;
}

export interface VerificationRequest {
  customer_id: string;
  pin: string;
}

// API Response Types
export interface ChatResponse {
  response: string;
  flow: string;
  requires_verification?: boolean;
  action?: string;
  cards?: Card[];
  balance?: number;
  transactions?: Transaction[];
  session_id: string;
}

export interface VerificationResponse {
  verified: boolean;
  customer?: Customer;
  message?: string;
}

export interface Transaction {
  transaction_id: string;
  date: string;
  description: string;
  amount: number;
  type: string;
}

// Auth State
export interface AuthState {
  customer: Customer | null;
  isAuthenticated: boolean;
}

// Voice Settings
export interface VoiceSettings {
  enabled: boolean;
  rate: number;
  pitch: number;
  volume: number;
  voiceIndex: number;
}
