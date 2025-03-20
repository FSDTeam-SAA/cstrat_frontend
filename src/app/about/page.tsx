import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="relative h-[300px] md:h-[400px] w-full bg-cover bg-center flex flex-col items-center justify-center text-white z-20"
          style={{
            backgroundImage: "url('/images/about-hero.jpg')",
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">About Us</h1>
          <p className="text-xl max-w-2xl text-center px-4">
            Need assistance? We are here to help. To inquire about the products and services found on our website,
            please contact us by phone or e-mail, and we'll gladly assist you.
          </p>
        </div>
      </div>

      <div className="container py-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>About Us</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg mb-4">
              Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu tortor vehicula. Fames dolor
              nibh cursus pulvinar diam risus. Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu
              tortor vehicula.
            </p>
            <p className="text-lg mb-4">
              Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu tortor vehicula. Fames dolor
              nibh cursus pulvinar diam risus. Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu
              tortor vehicula.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg mb-4">
              Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu tortor vehicula. Fames dolor
              nibh cursus pulvinar diam risus. Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu
              tortor vehicula.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p>We are committed to providing high-quality products that exceed customer expectations.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p>We strive to minimize our environmental impact through sustainable practices.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p>We continuously innovate to provide the best products and services to our customers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

