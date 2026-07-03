import { TrendingUp, Award, Users, MapPin } from 'lucide-react';

export function StatsBar() {
  const stats = [
    {
      icon: TrendingUp,
      value: '2,847',
      label: 'Active Jobs',
      gradient: 'from-[#D4AF37] to-[#FFD700]',
    },
    {
      icon: Users,
      value: '1,245',
      label: 'Companies',
      gradient: 'from-[#FFD700] to-[#DAA520]',
    },
    {
      icon: Award,
      value: '356',
      label: 'New Today',
      gradient: 'from-[#B8860B] to-[#D4AF37]',
    },
    {
      icon: MapPin,
      value: '48',
      label: 'Locations',
      gradient: 'from-[#DAA520] to-[#FFD700]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map(({ icon: Icon, value, label, gradient }) => (
        <div key={label} className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-10 h-10 bg-linear-to-br ${gradient} rounded-lg flex items-center justify-center`}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-medium text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
