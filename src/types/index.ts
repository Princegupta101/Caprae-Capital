export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  userType: 'buyer' | 'seller';
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BuyerProfile extends User {
  company: {
    name: string;
    industry: string;
    size: string;
    website?: string;
    description?: string;
  };
  acquisitionPreferences: {
    industries: string[];
    budgetRange: {
      min: number;
      max: number;
    };
    revenueRange: {
      min: number;
      max: number;
    };
    geographicFocus: string[];
    timeline: string;
    acquisitionType: string[];
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
  experience: {
    previousAcquisitions: number;
    yearsOfExperience: number;
    expertise: string[];
  };
  contact: {
    phone?: string;
    linkedin?: string;
  };
}

export interface SellerProfile extends User {
  business: {
    name: string;
    industry: string;
    yearEstablished: number;
    employees: number;
    website?: string;
    description: string;
  };
  financials: {
    annualRevenue: number;
    ebitda?: number;
    assets: number;
    asking_price?: number;
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
  sellingReason: string;
  timeline: string;
  keyAssets: string[];
}

export interface Match {
  id: string;
  buyerId: string;
  sellerId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  initiatedBy: 'seller';
  createdAt: string;
  acceptedAt?: string;
  rejectedAt?: string;
  messages: Message[];
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'system';
  read: boolean;
}

export interface AcquisitionProcess {
  id: string;
  matchId: string;
  currentStep: number;
  totalSteps: number;
  steps: AcquisitionStep[];
  status: 'in_progress' | 'completed' | 'cancelled' | 'on_hold';
  createdAt: string;
  updatedAt: string;
}

export interface AcquisitionStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  dueDate?: string;
  completedAt?: string;
  documents: Document[];
  tasks: Task[];
  notes?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  size: number;
  status: 'pending_review' | 'approved' | 'needs_revision';
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate?: string;
  completedAt?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
  order: number;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

export interface AppState {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
  };
  onboarding: {
    currentStep: number;
    totalSteps: number;
    isComplete: boolean;
    data: Record<string, unknown>;
  };
  profiles: {
    buyers: BuyerProfile[];
    sellers: SellerProfile[];
    loading: boolean;
  };
  matches: {
    list: Match[];
    loading: boolean;
    currentMatch: Match | null;
  };
  acquisition: {
    processes: AcquisitionProcess[];
    currentProcess: AcquisitionProcess | null;
    loading: boolean;
  };
  notifications: {
    unreadCount: number;
    preferences: NotificationPreferences;
  };
}
