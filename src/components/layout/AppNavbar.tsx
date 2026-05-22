import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/auth', label: 'Auth' },
  { to: '/encrypt', label: 'Encrypt' },
  { to: '/cert-chat', label: 'Cert / Chat' },
  { to: '/learn', label: 'Learn' },
] as const;

export function AppNavbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 dark:border-stone-700 bg-stone-100/95 dark:bg-stone-900/95 backdrop-blur supports-[backdrop-filter]:bg-stone-100/80 dark:supports-[backdrop-filter]:bg-stone-900/80">
      <nav className="max-w-5xl mx-auto px-4 h-12 flex items-center gap-6" aria-label="Main">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive
                ? 'text-stone-900 dark:text-stone-100'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
