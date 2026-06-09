import { useEffect, useState } from 'react';
import { DEFAULT_APP_PATH, normalizeAppPath } from '@/app/lib/navigation';

export const useCurrentPath = () => {
  const [pathname, setPathname] = useState(() =>
    typeof window === 'undefined' ? DEFAULT_APP_PATH : normalizeAppPath(window.location.pathname),
  );

  useEffect(() => {
    const handlePathChange = () => {
      setPathname(normalizeAppPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  return pathname;
};
