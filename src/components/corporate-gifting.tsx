import Image from 'next/image';

export default function CorporateGifting() {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Corporate Gifting"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold md:text-3xl">Hassle-Free Corporate Gifting</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Odiosus quis vel amet adipiscing elit. Ut id augue viverra in.
              Ipsum dolor sit amet consectetur. Odiosus quis vel amet adipiscing elit. Ut id augue viverra in. Ipsum
              dolor sit amet consectetur. Odiosus quis vel amet adipiscing elit. Ut id augue viverra in.
            </p>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Odiosus quis vel amet adipiscing elit. Ut id augue viverra in.
              Ipsum dolor sit amet consectetur. Odiosus quis vel amet adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
