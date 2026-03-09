import {Link} from 'react-router';

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-20 pb-10">

        {/* Top: brand + links */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-12 md:gap-20 mb-20">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-[11px] tracking-[0.5em] uppercase font-black text-white block mb-5"
              style={{fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.4em'}}
            >
              GANDER
            </Link>
            <p className="text-[12px] leading-relaxed text-zinc-500 max-w-[220px]">
              Quality clothing. Thoughtfully made for everyday life.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[9px] tracking-[0.3em] uppercase text-white mb-5 font-semibold">Shop</h4>
            <ul className="space-y-3">
              {[
                {label: "Men's", to: '/collections/mens'},
                {label: "Women's", to: '/collections/womens'},
                {label: 'New Arrivals', to: '/collections/new-arrivals'},
                {label: 'Sale', to: '/collections/sale'},
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[11px] tracking-wide text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[9px] tracking-[0.3em] uppercase text-white mb-5 font-semibold">Info</h4>
            <ul className="space-y-3">
              {[
                {label: 'About Us', to: '/about'},
                {label: 'Contact', to: '/contact'},
                {label: 'Shipping & Returns', to: '/about'},
                {label: 'Size Guide', to: '/about'},
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[11px] tracking-wide text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[9px] tracking-[0.3em] uppercase text-white mb-5 font-semibold">Newsletter</h4>
            <p className="text-[11px] text-zinc-500 mb-4 max-w-[200px] leading-relaxed">
              New drops, exclusive offers. No spam.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-zinc-800 text-white text-[11px] px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-zinc-500 placeholder-zinc-600"
              />
              <button
                type="submit"
                className="bg-white text-zinc-900 text-[11px] px-3 py-2.5 font-semibold hover:bg-zinc-200 transition-colors flex-shrink-0"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] tracking-wider text-zinc-600">
            © {new Date().getFullYear()} Gander. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
              <Link
                key={item}
                to="/about"
                className="text-[10px] tracking-wider text-zinc-600 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
