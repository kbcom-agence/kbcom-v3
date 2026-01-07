export function TrustBar() {
  const clients = [
    { name: 'Client 1', logo: '🏢' },
    { name: 'Client 2', logo: '🏪' },
    { name: 'Client 3', logo: '🏭' },
    { name: 'Client 4', logo: '🏛️' },
    { name: 'Client 5', logo: '🏦' },
    { name: 'Client 6', logo: '🏥' },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <p className="mb-8 text-center text-sm font-medium tracking-wider text-gray-600 uppercase">
          Ils nous font confiance
        </p>

        <div className="grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-3 lg:grid-cols-6">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex h-20 w-full items-center justify-center rounded-lg bg-white shadow-sm grayscale transition-shadow duration-300 hover:shadow-md hover:grayscale-0"
            >
              <div className="text-5xl" aria-label={client.name}>
                {client.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
