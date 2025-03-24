import Image from 'next/image';

export default function CorporateGifting() {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="container">
        <div className="grid grid-cols-1 items-center lg:gap-[100px] gap-5 md:grid-cols-2">
          <div className="relative h-[300px] md:h-[400px]">
            <Image src="/images/hassel.png" alt="Corporate Gifting" fill className="rounded-lg object-cover" />
          </div>
          <div className="space-y-4">
          <h2 className="text-xl md:text-4xl font-[700] text-[48px] leading-[120%]">Hassle-Free <br /> Corporate Gifting</h2>
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
