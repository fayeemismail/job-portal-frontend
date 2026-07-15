/**
 * @file worker-profile-store.ts
 * @description Client-side worker profile data store backed by localStorage.
 *
 * Architecture
 * ─────────────
 * • Types / interfaces live in this file and are the single source of truth.
 * • Static seed fixtures are imported from `./data/worker-seed-data` so that
 *   pure data concerns are fully decoupled from storage logic.
 * • All mutations dispatch a `workerProfileUpdated` DOM event so that any
 *   subscribed component can reactively re-render without prop-drilling.
 *
 * Constraints
 * ───────────
 * • This module is marked `'use client'` because it accesses `localStorage`
 *   and `window`. Never import it in server components or API routes.
 * • All exported functions guard against SSR via `typeof window` checks.
 */

'use client';

import { DEFAULT_WORKERS, SEED_INTEGRITY_CHECK_IDS } from '@/utils/data/worker-seed-data';

// ─────────────────────────────────────────────
// Domain Types
// ─────────────────────────────────────────────

export interface WorkerDocument {
  type: string;
  name: string;
  /** Human-readable file size, e.g. "2.4 MB" */
  size: string;
  /** Locale date string of when the document was uploaded */
  uploadedAt: string;
  status: 'Verified' | 'Pending Verification';
}

export interface BankDetails {
  bankName: string;
  branchName: string;
  accountNumber: string;
  ifscCode: string;
  /** Legacy field — retained for backward compatibility with older records */
  accountHolderName?: string;
}

export interface WorkerQuestionnaire {
  /** Free-text years of experience (e.g. "3-5 Years") */
  experience?: string;
  equipment?: string[];
  /** Availability cadence (e.g. "Full-Time", "Part-Time") */
  availability?: string;
  bio?: string;
  phone?: string;
  baseLocation?: string;
  /** Serviceable radius in kilometres */
  serviceableDistance?: number;
  primaryService?: string;
  documents?: WorkerDocument[];
  bankDetails?: BankDetails;
}

export interface WorkerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  /** Primary service category / job title */
  role: string;
  /** Average star rating (0–5) */
  rating: number;
  completedJobs: number;
  /** Absolute URL to the worker's avatar image */
  avatar: string;
  skills: string[];
  approvalStatus: 'approved' | 'pending' | 'rejected';
  questionnaire?: WorkerQuestionnaire;
}

// Re-export seed data so consumers that previously imported DEFAULT_WORKERS
// from this module continue to work without modification.
export { DEFAULT_WORKERS };

// ─────────────────────────────────────────────
// Storage Constants
// ─────────────────────────────────────────────

const WORKER_STORE_KEY = 'vance_worker_profiles';
const PROFILE_UPDATED_EVENT = 'workerProfileUpdated';

// ─────────────────────────────────────────────
// Internal Helpers
// ─────────────────────────────────────────────

/** Dispatch a DOM event to notify subscribed components of a store mutation. */
function notifySubscribers(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
  }
}

/**
 * Validate that the cached data still contains every required seed record.
 * Returns `false` if any seed-integrity check fails, triggering a re-seed.
 */
function isCacheValid(workers: WorkerProfile[]): boolean {
  return SEED_INTEGRITY_CHECK_IDS.every((id) => workers.some((w) => w.id === id));
}

// ─────────────────────────────────────────────
// Public Store API
// ─────────────────────────────────────────────

/**
 * Retrieve all worker profiles from localStorage.
 * Seeds the store with default data on first run or if integrity checks fail.
 */
export function getLocalWorkers(): WorkerProfile[] {
  if (typeof window === 'undefined') return DEFAULT_WORKERS;

  const raw = localStorage.getItem(WORKER_STORE_KEY);
  if (!raw) {
    localStorage.setItem(WORKER_STORE_KEY, JSON.stringify(DEFAULT_WORKERS));
    return DEFAULT_WORKERS;
  }

  try {
    const parsed = JSON.parse(raw) as WorkerProfile[];
    if (!isCacheValid(parsed)) {
      localStorage.setItem(WORKER_STORE_KEY, JSON.stringify(DEFAULT_WORKERS));
      return DEFAULT_WORKERS;
    }
    return parsed;
  } catch {
    // Corrupted data — fall back to defaults
    return DEFAULT_WORKERS;
  }
}

/** Persist the full worker list to localStorage. */
export function saveLocalWorkers(workers: WorkerProfile[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WORKER_STORE_KEY, JSON.stringify(workers));
}

/**
 * Find a single worker profile by email address (case-insensitive).
 * Returns `undefined` if no match is found.
 */
export function getWorkerByEmail(email: string): WorkerProfile | undefined {
  const workers = getLocalWorkers();
  return workers.find((w) => w.email.toLowerCase() === email.toLowerCase());
}

/**
 * Partially update a worker profile by email.
 * Returns `true` on success, `false` if the worker is not found.
 */
export function updateWorkerProfile(email: string, updatedData: Partial<WorkerProfile>): boolean {
  const workers = getLocalWorkers();
  const index = workers.findIndex((w) => w.email.toLowerCase() === email.toLowerCase());
  if (index === -1) return false;

  workers[index] = { ...workers[index], ...updatedData };
  saveLocalWorkers(workers);
  notifySubscribers();
  return true;
}

/**
 * Create and persist a new worker profile.
 * Automatically generates a unique ID based on the current timestamp.
 */
export function addWorker(worker: Omit<WorkerProfile, 'id'>): WorkerProfile {
  const workers = getLocalWorkers();
  const newWorker: WorkerProfile = {
    ...worker,
    id: `w-${Date.now()}`,
  };
  workers.push(newWorker);
  saveLocalWorkers(workers);
  notifySubscribers();
  return newWorker;
}

/**
 * Attach a completed onboarding questionnaire to an existing worker profile.
 * Also syncs `phone` and `role` from the questionnaire answers.
 * Returns `true` on success, `false` if the worker is not found.
 */
export function submitOnboarding(email: string, questionnaire: WorkerQuestionnaire): boolean {
  const workers = getLocalWorkers();
  const index = workers.findIndex((w) => w.email.toLowerCase() === email.toLowerCase());
  if (index === -1) return false;

  workers[index] = {
    ...workers[index],
    phone: questionnaire.phone ?? workers[index].phone,
    role: questionnaire.primaryService ?? workers[index].role,
    questionnaire,
  };
  saveLocalWorkers(workers);
  notifySubscribers();
  return true;
}

/**
 * Update the approval status of a worker by their unique ID.
 * Returns `true` on success, `false` if the worker is not found.
 */
export function updateApprovalStatus(
  id: string,
  status: 'approved' | 'pending' | 'rejected'
): boolean {
  const workers = getLocalWorkers();
  const index = workers.findIndex((w) => w.id === id);
  if (index === -1) return false;

  workers[index] = { ...workers[index], approvalStatus: status };
  saveLocalWorkers(workers);
  notifySubscribers();
  return true;
}
