// Banking Flow Types
export const FLOW_TYPES = {
  CARD_ATM_ISSUES: 'CARD_ATM_ISSUES',
  ACCOUNT_SERVICING: 'ACCOUNT_SERVICING',
  ACCOUNT_OPENING: 'ACCOUNT_OPENING',
  DIGITAL_SUPPORT: 'DIGITAL_SUPPORT',
  TRANSFERS_PAYMENTS: 'TRANSFERS_PAYMENTS',
  ACCOUNT_CLOSURE: 'ACCOUNT_CLOSURE',
} as const;

export type FlowType = typeof FLOW_TYPES[keyof typeof FLOW_TYPES];

// API Endpoints
export const API_ENDPOINTS = {
  CHAT: '/api/chat/',
  VERIFY: '/api/banking/verify',
  BALANCE: '/api/banking/balance',
  TRANSACTIONS: '/api/banking/transactions',
  CARDS: '/api/banking/cards',
  BLOCK_CARD: '/api/banking/block-card',
  UPDATE_ADDRESS: '/api/banking/address',
  AUDIT_LOG: '/api/banking/audit',
} as const;

// Session Storage Keys
export const STORAGE_KEYS = {
  SESSION_ID: 'sessionId',
  CUSTOMER_ID: 'customerId',
  VERIFIED: 'verified',
} as const;

// Default Values
export const DEFAULTS = {
  VOICE_RATE: 1.0,
  VOICE_PITCH: 1.0,
  VOICE_VOLUME: 1.0,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
} as const;
