import {useState} from 'react';
import type {Route} from './+types/gallery';

export const meta: Route.MetaFunction = () => [
  {title: 'GANDER — Gallery'},
];

export function loader() {
  return {};
}

const sections = [
  {id: 'campaign', label: 'Campaign', code: 'FILE-01'},
  {id: 'lookbook', label: 'Lookbook', code: 'FILE-02'},
  {id: 'archive',  label: 'Archive',  code: 'FILE-03'},
];

export default function GalleryPage() {
  const [active, setActive] = useState(sections[0].id);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{top: 'var(--header-height)'}}
    >
      {/* ── Detective board background ── */}
      <div className="absolute inset-0">
        <img
          src="/images/gander/detective-board.JPG"
          alt="Gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{backgroundColor: 'rgba(6,6,6,0.55)'}} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)'}}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)'}}
        />
      </div>

      {/* ── Floating left menu (always on top) ── */}
      <nav
        className="absolute top-1/2 left-10 -translate-y-1/2 flex flex-col gap-2"
        style={{fontFamily: "'Courier New', monospace", zIndex: 30}}
      >
        {sections.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className="text-left transition-all duration-200"
              style={{
                borderLeft: isActive ? '2px solid #4ade80' : '2px solid rgba(255,255,255,0.2)',
                paddingLeft: '14px',
                background: 'none',
              }}
            >
              <p
                className="text-[8px] tracking-[0.35em] uppercase mb-0.5"
                style={{color: isActive ? '#4ade80' : 'rgba(255,255,255,0.3)'}}
              >
                {s.code}
              </p>
              <p
                className="text-[15px] font-bold tracking-[0.12em] uppercase"
                style={{color: isActive ? '#ffffff' : 'rgba(255,255,255,0.45)'}}
              >
                {s.label}
              </p>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
