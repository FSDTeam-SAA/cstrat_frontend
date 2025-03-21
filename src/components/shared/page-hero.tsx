interface PageHeroProps {
  title: string;
  description?: string;
}

export default function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="w-full bg-gray-100">
      <div className="container py-16 text-center md:py-24">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        {description && <p className="mx-auto max-w-2xl text-lg text-gray-600">{description}</p>}
      </div>
    </section>
  );
}
