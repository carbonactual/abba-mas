const routes = ['Rent', 'Buy', 'Shortlet', 'Invest', 'List property'];

const featured = [
  { ref: 'BUNK-LIST-000001', title: 'Verified 2-bedroom apartment', location: 'Wuse 2, Abuja', price: '₦3.8m / year', state: 'Partially verified' },
  { ref: 'BUNK-LIST-000002', title: 'Student hostel cluster', location: 'Samaru, Kaduna', price: 'From ₦450k / year', state: 'Submitted' },
  { ref: 'BUNK-LIST-000003', title: 'Commercial shop unit', location: 'Wuse Market, Abuja', price: '₦1.2m / year', state: 'Verification pending' }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-50">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-stone-400">BUNK / Carbon Actual</p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">Property, properly connected.</h1>
        <p className="mt-6 max-w-2xl text-lg text-stone-300">Find, verify, list, inspect, manage, and prove property activity through one trusted operating system.</p>
        <div className="mt-10 rounded-3xl border border-stone-700 bg-stone-900/70 p-4 shadow-2xl">
          <label htmlFor="search" className="sr-only">Where do you want to bunk?</label>
          <input id="search" className="w-full rounded-2xl border border-stone-700 bg-stone-950 px-5 py-4 text-lg outline-none" placeholder="Where do you want to bunk? Try: 2-bedroom near Wuse 2 under ₦4m" />
          <div className="mt-4 flex flex-wrap gap-3">
            {routes.map((route) => <button key={route} className="rounded-full border border-stone-700 px-4 py-2 text-sm hover:bg-stone-800">{route}</button>)}
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featured.map((item) => (
            <article key={item.ref} className="rounded-3xl border border-stone-800 bg-stone-900 p-5">
              <p className="text-xs text-stone-500">{item.ref}</p>
              <h2 className="mt-3 text-xl font-medium">{item.title}</h2>
              <p className="mt-2 text-stone-400">{item.location}</p>
              <p className="mt-4 text-lg">{item.price}</p>
              <p className="mt-2 text-sm text-amber-300">{item.state}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
