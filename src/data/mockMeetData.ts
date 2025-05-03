
export interface RunnerMatchType {
  id: string;
  name: string;
  age: number;
  location: string;
  avatarUrl?: string;
  distance: number; // in kilometers
  preferences: {
    walkingSpeed: "slow" | "moderate" | "fast";
    runningSpeed: "slow" | "moderate" | "fast";
    preferredDistance: number; // in kilometers
  };
  availability: {
    days: string[];
    timeRanges: string[];
  };
}

export interface SessionType {
  id: string;
  partner: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  dateTime: string; // ISO date string
  meetingLocation: string;
  status: "scheduled" | "checked-in" | "completed" | "cancelled";
  activityData?: {
    steps: number;
    distance: number; // in kilometers
    duration: number; // in minutes
    coins: number;
  };
}

// Mock runner matches
export const mockRunnerMatches: RunnerMatchType[] = [
  {
    id: "runner-1",
    name: "Sarah Johnson",
    age: 26,
    location: "Downtown",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    distance: 2.3,
    preferences: {
      walkingSpeed: "moderate",
      runningSpeed: "moderate",
      preferredDistance: 4.5,
    },
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      timeRanges: ["6:00 AM - 8:00 AM", "5:00 PM - 7:00 PM"],
    },
  },
  {
    id: "runner-2",
    name: "Michael Chen",
    age: 32,
    location: "Sunset District",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
    distance: 3.1,
    preferences: {
      walkingSpeed: "fast",
      runningSpeed: "fast",
      preferredDistance: 8,
    },
    availability: {
      days: ["Tuesday", "Thursday", "Saturday"],
      timeRanges: ["7:00 AM - 9:00 AM", "6:00 PM - 8:00 PM"],
    },
  },
  {
    id: "runner-3",
    name: "Emma Davis",
    age: 28,
    location: "Marina District",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    distance: 4.2,
    preferences: {
      walkingSpeed: "moderate",
      runningSpeed: "slow",
      preferredDistance: 3,
    },
    availability: {
      days: ["Monday", "Wednesday", "Sunday"],
      timeRanges: ["8:00 AM - 10:00 AM", "4:00 PM - 6:00 PM"],
    },
  },
];

// Mock scheduled sessions
export const mockScheduledSessions: SessionType[] = [
  {
    id: "session-1",
    partner: {
      id: "runner-1",
      name: "Sarah Johnson",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    meetingLocation: "Golden Gate Park Entrance",
    status: "scheduled",
  },
];

// Mock completed sessions
export const mockCompletedSessions: SessionType[] = [
  {
    id: "session-2",
    partner: {
      id: "runner-3",
      name: "Emma Davis",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
    },
    dateTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    meetingLocation: "Marina Green Park",
    status: "completed",
    activityData: {
      steps: 9456,
      distance: 5.2,
      duration: 48,
      coins: 94,
    },
  },
];
