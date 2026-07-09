'use client';

export interface WorkerQuestionnaire {
  experience: string;
  equipment: string[];
  availability: string;
  bio: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  rating: number;
  completedJobs: number;
  avatar: string;
  skills: string[];
  approvalStatus: 'approved' | 'pending' | 'rejected';
  questionnaire?: WorkerQuestionnaire;
}

export const DEFAULT_WORKERS: WorkerProfile[] = [
  {
    id: 'w1',
    name: 'Marcus Vance',
    email: 'worker@example.com',
    phone: '+1 (555) 012-3456',
    role: 'Cleaning Expert',
    rating: 4.9,
    completedJobs: 95,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    skills: ['Deep Cleaning', 'Window Washing', 'Carpet Cleaning', 'Post-Construction Clean'],
    approvalStatus: 'approved',
  },
  {
    id: 'w2',
    name: 'Jordan Vance',
    email: 'jordan@example.com',
    phone: '+1 (555) 012-7890',
    role: 'Painting Expert',
    rating: 4.8,
    completedJobs: 72,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    skills: ['Interior Painting', 'Exterior Painting', 'Wallpaper Removal', 'Drywall Repair'],
    approvalStatus: 'approved',
  },
  {
    id: 'w3',
    name: 'Sarah Miller',
    email: 'sarah@example.com',
    phone: '+1 (555) 012-1122',
    role: 'Plumbing Expert',
    rating: 4.95,
    completedJobs: 120,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    skills: ['Leak Detection', 'Pipe Repair', 'Water Heater Flush', 'Drain Unclogging'],
    approvalStatus: 'approved',
  },
  {
    id: 'w4',
    name: 'Alex Cooper',
    email: 'alex@example.com',
    phone: '+1 (555) 012-3344',
    role: 'Electrical Expert',
    rating: 4.75,
    completedJobs: 88,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    skills: ['Smart Home Setup', 'Fixture Installation', 'Outlet Rewiring', 'Breaker Box Repair'],
    approvalStatus: 'approved',
  },
  {
    id: 'w5',
    name: 'David Foster',
    email: 'david.foster@example.com',
    phone: '+1 (555) 091-8844',
    role: 'Carpentry Expert',
    rating: 5.0,
    completedJobs: 0,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    skills: ['Cabinet Install', 'Crown Molding', 'Door Hanging'],
    approvalStatus: 'pending',
    questionnaire: {
      experience: '5+ Years',
      equipment: ['Standard Toolset', 'Safety Harness & Ladder', 'Cordless Drill & Jigsaw'],
      availability: 'Full-Time',
      bio: 'Highly experienced finishing carpenter specializing in custom cabinetry, decorative molding, and hanging entry doors.',
    },
  },
  {
    id: 'w6',
    name: 'Clara Oswald',
    email: 'clara.oswald@example.com',
    phone: '+1 (555) 019-2244',
    role: 'Painting Expert',
    rating: 5.0,
    completedJobs: 0,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    skills: ['Faux Finishes', 'Stenciling', 'Cabinet Spraying'],
    approvalStatus: 'pending',
    questionnaire: {
      experience: '3-5 Years',
      equipment: ['Paint Sprayer & Drop Cloths', 'Safety Harness & Ladder'],
      availability: 'Part-Time',
      bio: 'Detail-oriented painter specializing in fine interior finishes, accent walls, and kitchen cabinet refinishing.',
    },
  },
];

const WORKER_STORE_KEY = 'vance_worker_profiles';

export function getLocalWorkers(): WorkerProfile[] {
  if (typeof window === 'undefined') return DEFAULT_WORKERS;
  const data = localStorage.getItem(WORKER_STORE_KEY);
  if (!data) {
    localStorage.setItem(WORKER_STORE_KEY, JSON.stringify(DEFAULT_WORKERS));
    return DEFAULT_WORKERS;
  }
  try {
    const parsed = JSON.parse(data) as WorkerProfile[];
    const hasClara = parsed.some((w: WorkerProfile) => w.id === 'w6');
    const davidHasQuestionnaire = parsed.some(
      (w: WorkerProfile) => w.id === 'w5' && w.questionnaire
    );
    if (!hasClara || !davidHasQuestionnaire) {
      localStorage.setItem(WORKER_STORE_KEY, JSON.stringify(DEFAULT_WORKERS));
      return DEFAULT_WORKERS;
    }
    return parsed;
  } catch {
    return DEFAULT_WORKERS;
  }
}

export function saveLocalWorkers(workers: WorkerProfile[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WORKER_STORE_KEY, JSON.stringify(workers));
}

export function getWorkerByEmail(email: string): WorkerProfile | undefined {
  const workers = getLocalWorkers();
  return workers.find((w) => w.email.toLowerCase() === email.toLowerCase());
}

export function updateWorkerProfile(email: string, updatedData: Partial<WorkerProfile>): boolean {
  const workers = getLocalWorkers();
  const index = workers.findIndex((w) => w.email.toLowerCase() === email.toLowerCase());
  if (index === -1) return false;

  workers[index] = {
    ...workers[index],
    ...updatedData,
  };
  saveLocalWorkers(workers);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('workerProfileUpdated'));
  }

  return true;
}

export function addWorker(worker: Omit<WorkerProfile, 'id'>): WorkerProfile {
  const workers = getLocalWorkers();
  const newWorker: WorkerProfile = {
    ...worker,
    id: `w-${Date.now()}`,
  };
  workers.push(newWorker);
  saveLocalWorkers(workers);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('workerProfileUpdated'));
  }

  return newWorker;
}

export function submitOnboarding(email: string, questionnaire: WorkerQuestionnaire): boolean {
  const workers = getLocalWorkers();
  const index = workers.findIndex((w) => w.email.toLowerCase() === email.toLowerCase());
  if (index === -1) return false;

  workers[index] = {
    ...workers[index],
    questionnaire,
  };
  saveLocalWorkers(workers);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('workerProfileUpdated'));
  }
  return true;
}

export function updateApprovalStatus(
  id: string,
  status: 'approved' | 'pending' | 'rejected'
): boolean {
  const workers = getLocalWorkers();
  const index = workers.findIndex((w) => w.id === id);
  if (index === -1) return false;

  workers[index] = {
    ...workers[index],
    approvalStatus: status,
  };
  saveLocalWorkers(workers);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('workerProfileUpdated'));
  }
  return true;
}
