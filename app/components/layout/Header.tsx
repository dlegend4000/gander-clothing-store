import {Link, useLocation} from 'react-router';
import {useState, useEffect} from 'react';

const leftLinks = [
  {label: 'Home', to: '/'},
  {label: 'Gallery', to: '/gallery'},
  {label: 'Contact', to: '/contact'},
];

export function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-sm border-b border-zinc-100'
            : 'bg-transparent'
        }`}
        style={{height: 'var(--header-height)'}}
      >
        <div className="h-full px-6 sm:px-10 flex items-center justify-between relative">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {leftLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                prefetch="intent"
                className={`text-[10px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-1 text-zinc-700"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Center logo */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 text-[11px] tracking-[0.5em] uppercase font-black text-zinc-900 hover:text-zinc-600 transition-colors"
          >
            GANDER
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <Link
              to="/search"
              aria-label="Search"
              className="text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </Link>
            <Link
              to="/cart"
              className="text-[10px] tracking-[0.2em] uppercase font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Cart (0)
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 left-0 h-full w-72 bg-[#F2EFF6] flex flex-col p-8 gap-6">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="self-end text-zinc-500 hover:text-zinc-900"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Link
              to="/"
              className="text-xl font-black tracking-widest uppercase text-zinc-900 mb-4"
              onClick={() => setMobileOpen(false)}
            >
              GANDER
            </Link>
            {[...leftLinks, {label: 'Cart', to: '/cart'}].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-[11px] tracking-[0.25em] uppercase font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
