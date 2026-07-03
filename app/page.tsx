import Home from '@/components/home/Home';
import { LOCATION_COOKIE } from '@/constants/cookies';
import { cookies } from 'next/headers';
import React from 'react';

export default async function page() {
  const cookieStore = await cookies();

  const location = cookieStore.get(LOCATION_COOKIE)?.value || null;

  return (
    <>
      <Home initialLocation={location} />
    </>
  );
}
