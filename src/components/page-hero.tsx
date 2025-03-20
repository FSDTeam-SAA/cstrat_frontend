interface PageHeroProps {
  title: string
  description?: string
}

export default function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="w-full bg-gray-100">
      <div className="container py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
        {description && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>}
      </div>
    </section>
  )
}

