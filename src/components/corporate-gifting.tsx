import Image from 'next/image';

export default function CorporateGifting() {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2 lg:gap-[100px]">
          <div className="relative h-[300px] md:h-[400px]">
            <Image src="/Picture2.png" alt="Corporate Gifting" fill className="rounded-lg object-cover" />
          </div>
          <div className="space-y-4">
            <h2 className="text-[48px] text-xl font-[700] leading-[120%] md:text-4xl">
              Hassle-Free <br /> Corporate Gifting
            </h2>
            <p className="text-gray-600">
              Corporate gifting doesn’t have to be complicated. With our hassle-free service, you can send thoughtful,
              beautifully packaged gifts to clients, partners, or employees — all without the stress. From selection to
              delivery, we handle every detail so you can focus on what matters most: building lasting relationships.
            </p>
            {/* <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Odiosus quis vel amet adipiscing elit. Ut id augue viverra in.
              Ipsum dolor sit amet consectetur. Odiosus quis vel amet adipiscing elit.
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
