import { MOCK_SERVICES, SERVICE_CATEGORIES } from '@/components/services/constants';
import { ServiceDetails } from '@/components/services/ServiceDetails';
import { notFound } from 'next/navigation';

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = MOCK_SERVICES.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  const categoryObj = SERVICE_CATEGORIES.find((cat) => cat.id === service.category);
  const categoryLabel = categoryObj ? categoryObj.label : 'General Service';

  return <ServiceDetails service={service} categoryLabel={categoryLabel} />;
}
