import {Link, useLocation} from 'react-router';
import {useEffect} from 'react';

type MobileMenuProps = {
  links: {label: string; to: string}[];
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({links, isOpen, onClose}: MobileMenuProps) {
  const location = useLocation();

  // Close on navigation
  useEffect(() => {
    onClose();
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-100">
          <Link
            to="/"
            className="text-lg font-bold tracking-widest uppercase"
          >
            GANDER
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-zinc-500 hover:text-zinc-900"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="px-6 py-8 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-3 text-base text-zinc-700 hover:text-zinc-900 border-b border-zinc-50 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Footer links */}
        <div className="absolute bottom-8 left-6 right-6 space-y-1">
          <Link
            to="/search"
            className="block py-2 text-sm text-zinc-500 hover:text-zinc-900"
          >
            Search
          </Link>
          <Link
            to="/about"
            className="block py-2 text-sm text-zinc-500 hover:text-zinc-900"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-sm text-zinc-500 hover:text-zinc-900"
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}
