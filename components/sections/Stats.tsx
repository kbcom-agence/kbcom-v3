const stats = [
  {
    value: '5+',
    label: "Années d'Expérience",
  },
  {
    value: '50+',
    label: 'Projets Réalisés',
  },
  {
    value: '40+',
    label: 'Clients Satisfaits',
  },
];

export function Stats() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-primary mb-2 text-5xl font-bold md:text-6xl">{stat.value}</div>
              <div className="text-sm font-medium tracking-wider text-gray-600 uppercase md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
