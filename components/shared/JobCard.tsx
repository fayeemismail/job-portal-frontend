'use client';

import { Briefcase, MapPin, DollarSign, Clock, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { Job } from '@/types/index';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all hover:border-[#D4AF37] cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#FFF8E7] to-[#FFD700]/20 flex items-center justify-center border border-[#D4AF37]/20">
            {job.logo ? (
              <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg" />
            ) : (
              <Briefcase className="w-7 h-7 text-[#D4AF37]" />
            )}
          </div>
          <div>
            <h3 className="mb-1 text-gray-900">{job.title}</h3>
            <p className="text-gray-500">{job.company}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          className="p-2 rounded-lg hover:bg-[#FFF8E7] transition-colors"
        >
          <Bookmark
            className={`w-5 h-5 ${isSaved ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-400'}`}
          />
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-gray-700">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-gray-700">{job.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-gray-700">{job.postedTime}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="px-3 py-1 bg-[#FFF8E7] text-[#7A5800] rounded-full text-sm">
          {job.type}
        </span>
        <button className="px-6 py-2 bg-linear-to-r from-[#D4AF37] to-[#FFD700] text-white rounded-lg hover:from-[#B8860B] hover:to-[#DAA520] transition-all">
          Apply Now
        </button>
      </div>
    </div>
  );
}
