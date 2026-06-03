'use client';

import { Job } from '@/types/index';
import { JobCard } from '@/components/shared/JobCard';

interface JobListProps {
  jobs: Job[];
  searchQuery: string;
}

export function JobList({ jobs, searchQuery }: JobListProps) {
  return (
    <div className="lg:col-span-3">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900">{searchQuery ? `Results for "${searchQuery}"` : 'Recommended Jobs'}</h2>
        <select className="px-4 py-2 bg-white border border-border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]">
          <option>Most Recent</option>
          <option>Highest Salary</option>
          <option>Most Relevant</option>
        </select>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-[#FFF8E7] transition-all">
            Previous
          </button>
          <button className="px-4 py-2 bg-linear-to-r from-[#D4AF37] to-[#FFD700] text-white rounded-lg">
            1
          </button>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-[#FFF8E7] transition-all">
            2
          </button>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-[#FFF8E7] transition-all">
            3
          </button>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-[#FFF8E7] transition-all">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}