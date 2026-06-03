import { Job } from '@/types/index';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    location: 'New York, NY',
    salary: '$120k - $160k',
    type: 'Full-time',
    postedTime: '2 hours ago',
    description:
      'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building and maintaining web applications using React and TypeScript.',
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Creative Studio',
    location: 'San Francisco, CA',
    salary: '$100k - $140k',
    type: 'Full-time',
    postedTime: '5 hours ago',
    description:
      'Join our design team to create beautiful and intuitive user experiences. Experience with Figma and design systems required.',
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'DataCorp Solutions',
    location: 'Austin, TX',
    salary: '$130k - $170k',
    type: 'Full-time',
    postedTime: '1 day ago',
    description:
      'Looking for a talented Backend Engineer with expertise in Node.js, Python, and cloud infrastructure to build scalable APIs.',
  },
  {
    id: '4',
    title: 'Marketing Manager',
    company: 'Growth Marketing Co.',
    location: 'Chicago, IL',
    salary: '$90k - $120k',
    type: 'Full-time',
    postedTime: '1 day ago',
    description:
      'Lead our marketing initiatives and drive growth through innovative campaigns. Experience with digital marketing and analytics required.',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Cloud Systems Ltd.',
    location: 'Seattle, WA',
    salary: '$140k - $180k',
    type: 'Full-time',
    postedTime: '2 days ago',
    description:
      'Join our infrastructure team to manage and optimize our cloud deployment pipelines. AWS and Kubernetes experience preferred.',
  },
  {
    id: '6',
    title: 'UI/UX Designer',
    company: 'Design Labs',
    location: 'Los Angeles, CA',
    salary: '$95k - $130k',
    type: 'Contract',
    postedTime: '3 days ago',
    description:
      'Create engaging user interfaces and delightful user experiences for our suite of mobile and web applications.',
  },
];

export const suggestedLocations = [
  { city: 'New York', state: 'NY', country: 'USA' },
  { city: 'San Francisco', state: 'CA', country: 'USA' },
  { city: 'Los Angeles', state: 'CA', country: 'USA' },
  { city: 'Chicago', state: 'IL', country: 'USA' },
  { city: 'Austin', state: 'TX', country: 'USA' },
  { city: 'Seattle', state: 'WA', country: 'USA' },
  { city: 'Boston', state: 'MA', country: 'USA' },
  { city: 'Denver', state: 'CO', country: 'USA' },
];
