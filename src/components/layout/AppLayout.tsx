import { Outlet } from 'react-router-dom';
import { AppNavbar } from './AppNavbar';

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <AppNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
