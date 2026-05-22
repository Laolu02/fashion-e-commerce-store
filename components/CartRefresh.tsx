'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartRefresh() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return null;
}
