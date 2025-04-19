import ContactInformation from '@/components/contact/contact-information';
import Contactwithus from '@/components/contact/Contactwithus';
import { PageHeader } from '@/components/shared/page-header';

export default function ContactPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Contact Us here"
        description="Need assistance? We are here to help. To inquire about the products and services found on our website, please contact us by phone or e-mail, and we'll gladly assist you."
        backgroundImage="/images/contact-hero.png"
      />
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="flex h-auto items-center gap-7 flex-col lg:flex-row">
          <div className="h-full">
            <ContactInformation />
          </div>
          <div className="h-full w-full flex-1">
            <Contactwithus />
          </div>
        </div>
      </div>
    </div>
  );
}
