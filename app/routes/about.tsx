import type {Route} from './+types/about';

export const meta: Route.MetaFunction = () => {
  return [{title: 'About — Gander'}];
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <div className="mb-16">
        <p className="text-xs tracking-widest uppercase text-zinc-400 mb-3">
          Our Story
        </p>
        <h1 className="text-4xl font-semibold leading-tight mb-6">
          Quality clothing,
          <br />
          thoughtfully made.
        </h1>
        <p className="text-lg text-zinc-500 leading-relaxed">
          Gander was born from a frustration with fast fashion — garments that
          look great on the hanger and fall apart after six washes. We set out
          to build something different: a small, focused range of everyday
          pieces made from materials that last.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
        {[
          {
            title: 'Responsible Sourcing',
            body: 'Every fabric is traced to its origin. We work with mills that meet strict environmental and labour standards.',
          },
          {
            title: 'Made to Last',
            body: 'We over-engineer the details that matter — seams, fastenings, and finishes — so you buy less over time.',
          },
          {
            title: 'Honest Pricing',
            body: "We show you what things cost to make. No mystery markups, no fake sale prices.",
          },
        ].map((v) => (
          <div key={v.title} className="border-t border-zinc-200 pt-6">
            <h3 className="font-semibold text-zinc-900 mb-2">{v.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{v.body}</p>
          </div>
        ))}
      </div>

      {/* Shipping & Returns */}
      <div className="bg-zinc-50 p-8 mb-16">
        <h2 className="text-xl font-semibold mb-6">Shipping &amp; Returns</h2>
        <div className="space-y-4 text-sm text-zinc-600">
          <div className="flex gap-4">
            <span className="text-zinc-400 w-32 flex-shrink-0">Standard</span>
            <span>3–5 business days · Free on orders over €75</span>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-400 w-32 flex-shrink-0">Express</span>
            <span>1–2 business days · €8.95</span>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-400 w-32 flex-shrink-0">Returns</span>
            <span>Free within 30 days. Item must be unworn, with tags.</span>
          </div>
        </div>
      </div>

      {/* Size guide */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Size Guide</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                {['Size', 'Chest (cm)', 'Waist (cm)', 'Hip (cm)'].map((h) => (
                  <th
                    key={h}
                    className="py-3 pr-6 text-xs font-semibold uppercase tracking-wider text-zinc-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-zinc-600">
              {[
                ['XS', '80–84', '64–68', '88–92'],
                ['S', '84–88', '68–72', '92–96'],
                ['M', '88–92', '72–76', '96–100'],
                ['L', '96–100', '80–84', '104–108'],
                ['XL', '104–108', '88–92', '112–116'],
              ].map(([size, ...measurements]) => (
                <tr key={size} className="border-b border-zinc-100">
                  <td className="py-3 pr-6 font-medium text-zinc-900">
                    {size}
                  </td>
                  {measurements.map((m, i) => (
                    <td key={i} className="py-3 pr-6">
                      {m}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
