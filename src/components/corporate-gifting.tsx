import Image from "next/image"

export default function CorporateGifting() {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Corporate Gifting"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Hassle-Free Corporate Gifting</h2>
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
  )
}

