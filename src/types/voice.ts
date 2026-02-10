// Voice Message Types
export interface VoiceMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  audioUrl?: string;
  isVoice: boolean;
  flow?: string;
}

// Voice API Request Types
export interface TranscribeRequest {
  audio: Blob;
}

export interface SynthesizeRequest {
  text: string;
  voice?: string;
}

export interface VoiceChatRequest {
  message: string;
  customer_id: string;
  verified: boolean;
  session_id?: string;
}

// Voice API Response Types
export interface TranscribeResponse {
  text: string;
  language: string;
}

export interface VoiceChatResponse {
  text_response: string;
  session_id: string;
  requires_verification: boolean;
  flow: string;
}

// Voice State
export interface VoiceState {
  messages: VoiceMessage[];
  isRecording: boolean;
  isProcessing: boolean;
  processingStatus: ProcessingStatus;
  isPlaying: boolean;
  error: string | null;
  sessionId: string | null;
  verified: boolean;
  customerId: string | null;
}

export type ProcessingStatus = 
  | 'idle' 
  | 'listening' 
  | 'transcribing' 
  | 'thinking' 
  | 'speaking';

// Audio Recording State
export interface AudioRecorderState {
  isRecording: boolean;
  recordingTime: number;
  audioBlob: Blob | null;
  error: string | null;
}
