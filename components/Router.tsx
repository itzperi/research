import React, { useState, useEffect, createContext, useContext } from 'react';

const RouterContext = createContext<{ path: string; navigate: (path: string) => void }>({ path: '/', navigate: () => { } });

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      // Remove the '#' and handle empty hash as '/'
      const currentHash = window.location.hash.slice(1);
      setPath(currentHash || '/');
      window.scrollTo(0, 0); // Scroll to top on navigation
    };

    // Set initial hash if empty or just '#'
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '/';
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newPath: string) => {
    window.location.hash = newPath;
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

export const Link: React.FC<{ to: string; children: React.ReactNode; className?: string; onClick?: () => void } & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ to, children, className, onClick, ...props }) => {
  const isActive = window.location.hash === `#${to}`;

  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        if (onClick) onClick();
      }}
      {...props}
    >
      {children}
    </a>
  );
};
