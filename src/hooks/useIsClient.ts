'use client';

import { useEffect, useState } from 'react';

// Hook to safely check if we're on the client side (after hydration)
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
