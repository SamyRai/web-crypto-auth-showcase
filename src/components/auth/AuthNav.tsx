import { Link } from 'react-router-dom';

interface AuthNavProps {
  onViewLearn: () => void;
}

/** Navigation on the auth page: link to Learn (theory) and Encrypt. */
export function AuthNav({ onViewLearn }: AuthNavProps) {
  return (
    <>
      <button
        type="button"
        onClick={onViewLearn}
        className="w-full rounded-xl border border-stone-300 dark:border-stone-600 py-3 px-4 text-stone-700 dark:text-stone-300 font-medium transition hover:bg-stone-100 dark:hover:bg-stone-800"
      >
        View theory & best practices (no login)
      </button>
      <nav className="flex flex-wrap gap-3 pt-2 text-sm text-stone-500 dark:text-stone-400">
        <Link to="/encrypt" className="underline hover:text-stone-700 dark:hover:text-stone-300">
          Encrypt a secret (Web Crypto)
        </Link>
        <Link to="/learn" className="underline hover:text-stone-700 dark:hover:text-stone-300">
          Learn (theory & references)
        </Link>
      </nav>
    </>
  );
}
