import { BuyerProfile, SellerProfile, Match, AcquisitionProcess } from '../types';

export const mockBuyerProfiles: BuyerProfile[] = [
  {
    id: 'buyer-1',
    email: 'john.smith@techventures.com',
    firstName: 'John',
    lastName: 'Smith',
    avatar: '/api/placeholder/100/100',
    userType: 'buyer',
    onboardingCompleted: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-08-01T15:30:00Z',
    company: {
      name: 'TechVentures Capital',
      industry: 'Technology',
      size: '50-100',
      website: 'https://techventures.com',
      description: 'Leading technology investment firm focused on SaaS and AI companies'
    },
    acquisitionPreferences: {
      industries: ['Technology', 'Healthcare', 'Finance'],
      budgetRange: { min: 5000000, max: 50000000 },
      revenueRange: { min: 2000000, max: 20000000 },
      geographicFocus: ['California', 'New York', 'Texas'],
      timeline: '3-6 months',
      acquisitionType: ['Strategic', 'Financial']
    },
    location: {
      city: 'San Francisco',
      state: 'California',
      country: 'United States'
    },
    experience: {
      previousAcquisitions: 12,
      yearsOfExperience: 8,
      expertise: ['SaaS', 'AI/ML', 'Fintech', 'Due Diligence']
    },
    contact: {
      phone: '+1-555-0123',
      linkedin: 'https://linkedin.com/in/johnsmith'
    }
  },
  {
    id: 'buyer-2',
    email: 'sarah.johnson@growthequity.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    avatar: '/api/placeholder/100/100',
    userType: 'buyer',
    onboardingCompleted: true,
    createdAt: '2024-02-20T14:00:00Z',
    updatedAt: '2024-08-05T09:15:00Z',
    company: {
      name: 'Growth Equity Partners',
      industry: 'Finance',
      size: '20-50',
      website: 'https://growthequity.com',
      description: 'Growth equity firm specializing in healthcare and manufacturing businesses'
    },
    acquisitionPreferences: {
      industries: ['Healthcare', 'Manufacturing', 'Retail'],
      budgetRange: { min: 10000000, max: 100000000 },
      revenueRange: { min: 5000000, max: 50000000 },
      geographicFocus: ['Illinois', 'Ohio', 'Michigan'],
      timeline: '6-12 months',
      acquisitionType: ['Growth Capital', 'Buyout']
    },
    location: {
      city: 'Chicago',
      state: 'Illinois',
      country: 'United States'
    },
    experience: {
      previousAcquisitions: 8,
      yearsOfExperience: 6,
      expertise: ['Healthcare', 'Manufacturing', 'Operations', 'Growth Strategy']
    },
    contact: {
      phone: '+1-555-0456',
      linkedin: 'https://linkedin.com/in/sarahjohnson'
    }
  },
  {
    id: 'buyer-3',
    email: 'michael.chen@digitalfund.com',
    firstName: 'Michael',
    lastName: 'Chen',
    avatar: '/api/placeholder/100/100',
    userType: 'buyer',
    onboardingCompleted: true,
    createdAt: '2024-03-10T11:00:00Z',
    updatedAt: '2024-08-08T16:45:00Z',
    company: {
      name: 'Digital Innovation Fund',
      industry: 'Technology',
      size: '10-20',
      website: 'https://digitalfund.com',
      description: 'Early-stage venture fund investing in digital transformation and e-commerce'
    },
    acquisitionPreferences: {
      industries: ['Technology', 'Retail', 'Education'],
      budgetRange: { min: 1000000, max: 15000000 },
      revenueRange: { min: 500000, max: 10000000 },
      geographicFocus: ['California', 'Washington', 'Oregon'],
      timeline: '1-3 months',
      acquisitionType: ['Strategic', 'Platform']
    },
    location: {
      city: 'Seattle',
      state: 'Washington',
      country: 'United States'
    },
    experience: {
      previousAcquisitions: 15,
      yearsOfExperience: 10,
      expertise: ['E-commerce', 'Digital Marketing', 'Platform Strategy']
    },
    contact: {
      phone: '+1-555-0789',
      linkedin: 'https://linkedin.com/in/michaelchen'
    }
  }
];

export const mockSellerProfiles: SellerProfile[] = [
  {
    id: 'seller-1',
    email: 'david.martinez@innovatetech.com',
    firstName: 'David',
    lastName: 'Martinez',
    avatar: '/api/placeholder/100/100',
    userType: 'seller',
    onboardingCompleted: true,
    createdAt: '2024-04-05T09:00:00Z',
    updatedAt: '2024-08-10T12:20:00Z',
    business: {
      name: 'InnovateTech Solutions',
      industry: 'Technology',
      yearEstablished: 2018,
      employees: 25,
      website: 'https://innovatetech.com',
      description: 'B2B SaaS platform providing AI-powered customer analytics for e-commerce businesses'
    },
    financials: {
      annualRevenue: 3500000,
      ebitda: 1200000,
      assets: 2800000,
      asking_price: 12000000
    },
    location: {
      city: 'Austin',
      state: 'Texas',
      country: 'United States'
    },
    sellingReason: 'Looking to scale with strategic partner',
    timeline: '3-6 months',
    keyAssets: ['Proprietary AI algorithms', '500+ enterprise customers', 'Recurring revenue model']
  },
  {
    id: 'seller-2',
    email: 'lisa.wong@healthplus.com',
    firstName: 'Lisa',
    lastName: 'Wong',
    avatar: '/api/placeholder/100/100',
    userType: 'seller',
    onboardingCompleted: true,
    createdAt: '2024-05-12T14:30:00Z',
    updatedAt: '2024-08-12T10:10:00Z',
    business: {
      name: 'HealthPlus Medical Devices',
      industry: 'Healthcare',
      yearEstablished: 2015,
      employees: 45,
      website: 'https://healthplus.com',
      description: 'Manufacturer of innovative medical devices for home healthcare monitoring'
    },
    financials: {
      annualRevenue: 8200000,
      ebitda: 2500000,
      assets: 6500000,
      asking_price: 25000000
    },
    location: {
      city: 'Boston',
      state: 'Massachusetts',
      country: 'United States'
    },
    sellingReason: 'Retirement and succession planning',
    timeline: '6-12 months',
    keyAssets: ['FDA-approved devices', 'Strong distribution network', 'Patent portfolio']
  }
];

export const mockMatches: Match[] = [
  {
    id: 'match-1',
    buyerId: 'buyer-1',
    sellerId: 'seller-1',
    status: 'pending',
    initiatedBy: 'seller',
    createdAt: '2024-08-10T15:30:00Z',
    messages: []
  },
  {
    id: 'match-2',
    buyerId: 'buyer-2',
    sellerId: 'seller-2',
    status: 'accepted',
    initiatedBy: 'seller',
    createdAt: '2024-08-05T10:15:00Z',
    acceptedAt: '2024-08-06T14:20:00Z',
    messages: [
      {
        id: 'msg-1',
        matchId: 'match-2',
        senderId: 'seller-2',
        content: 'Hi Sarah, I think HealthPlus would be a great fit for Growth Equity Partners. Would love to discuss further.',
        timestamp: '2024-08-06T15:00:00Z',
        type: 'text',
        read: true
      },
      {
        id: 'msg-2',
        matchId: 'match-2',
        senderId: 'buyer-2',
        content: 'Hello Lisa, thank you for reaching out. I\'m very interested in learning more about HealthPlus. Could we schedule a call this week?',
        timestamp: '2024-08-06T16:30:00Z',
        type: 'text',
        read: true
      }
    ]
  }
];

export const mockAcquisitionProcesses: AcquisitionProcess[] = [
  {
    id: 'process-1',
    matchId: 'match-2',
    currentStep: 2,
    totalSteps: 7,
    status: 'in_progress',
    createdAt: '2024-08-07T09:00:00Z',
    updatedAt: '2024-08-12T11:30:00Z',
    steps: [
      {
        id: 'step-1',
        title: 'Initial Interest & NDA',
        description: 'Sign NDA and express formal interest',
        status: 'completed',
        completedAt: '2024-08-07T12:00:00Z',
        documents: [
          {
            id: 'doc-1',
            name: 'Non-Disclosure Agreement',
            type: 'PDF',
            url: '/documents/nda-signed.pdf',
            uploadedBy: 'buyer-2',
            uploadedAt: '2024-08-07T10:30:00Z',
            size: 245760,
            status: 'approved'
          }
        ],
        tasks: [
          {
            id: 'task-1',
            title: 'Review and sign NDA',
            assignedTo: 'both',
            status: 'completed',
            completedAt: '2024-08-07T12:00:00Z',
            priority: 'high'
          }
        ]
      },
      {
        id: 'step-2',
        title: 'Financial Information Review',
        description: 'Exchange and review financial statements and projections',
        status: 'in_progress',
        dueDate: '2024-08-20T23:59:59Z',
        documents: [
          {
            id: 'doc-2',
            name: 'Financial Statements 2023',
            type: 'PDF',
            url: '/documents/financials-2023.pdf',
            uploadedBy: 'seller-2',
            uploadedAt: '2024-08-10T14:15:00Z',
            size: 1024000,
            status: 'pending_review'
          }
        ],
        tasks: [
          {
            id: 'task-2',
            title: 'Provide 3-year financial statements',
            assignedTo: 'seller-2',
            status: 'completed',
            completedAt: '2024-08-10T14:15:00Z',
            priority: 'high'
          },
          {
            id: 'task-3',
            title: 'Review financial statements',
            assignedTo: 'buyer-2',
            status: 'in_progress',
            dueDate: '2024-08-18T23:59:59Z',
            priority: 'high'
          }
        ]
      },
      {
        id: 'step-3',
        title: 'Management Presentations',
        description: 'Management team presents to buyer team',
        status: 'pending',
        dueDate: '2024-08-25T23:59:59Z',
        documents: [],
        tasks: [
          {
            id: 'task-4',
            title: 'Prepare management presentation',
            assignedTo: 'seller-2',
            status: 'pending',
            dueDate: '2024-08-22T23:59:59Z',
            priority: 'medium'
          }
        ]
      },
      {
        id: 'step-4',
        title: 'Letter of Intent',
        description: 'Negotiate and execute letter of intent',
        status: 'pending',
        documents: [],
        tasks: []
      },
      {
        id: 'step-5',
        title: 'Due Diligence',
        description: 'Comprehensive due diligence process',
        status: 'pending',
        documents: [],
        tasks: []
      },
      {
        id: 'step-6',
        title: 'Final Negotiations',
        description: 'Finalize terms and conditions',
        status: 'pending',
        documents: [],
        tasks: []
      },
      {
        id: 'step-7',
        title: 'Closing',
        description: 'Execute final agreements and close transaction',
        status: 'pending',
        documents: [],
        tasks: []
      }
    ]
  }
];

export const industryOptions = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Real Estate',
  'Education',
  'Hospitality',
  'Construction',
  'Transportation',
  'Energy',
  'Media',
  'Agriculture',
  'Telecommunications',
  'Aerospace'
];

export const locationOptions = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 
  'West Virginia', 'Wisconsin', 'Wyoming'
];

export const timelineOptions = [
  '1-3 months',
  '3-6 months',
  '6-12 months',
  '12+ months',
  'No specific timeline'
];

export const acquisitionTypeOptions = [
  'Strategic',
  'Financial',
  'Growth Capital',
  'Buyout',
  'Platform',
  'Add-on',
  'Merger'
];

export const companySizeOptions = [
  '1-10',
  '11-50',
  '51-100',
  '101-500',
  '501-1000',
  '1000+'
];
