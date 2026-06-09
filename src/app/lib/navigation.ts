export const DEFAULT_APP_PATH = '/dashboard';

export const normalizeAppPath = (pathname: string) => {
  if (!pathname || pathname === '/') {
    return DEFAULT_APP_PATH;
  }

  return pathname;
};

export const navigateTo = (pathname: string) => {
  const nextPath = normalizeAppPath(pathname);

  if (window.location.pathname === nextPath) {
    return;
  }

  window.history.pushState({}, '', nextPath);
  window.dispatchEvent(new PopStateEvent('popstate'));
};
