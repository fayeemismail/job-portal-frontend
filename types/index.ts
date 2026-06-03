export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedTime: string;
  logo?: string;
  description: string;
}

export interface FilterOptions {
  jobType?: string;
  experience?: string;
  salary?: string;
  checked?: boolean;
}
