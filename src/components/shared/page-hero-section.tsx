import type { ReactNode } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';

interface PageHeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  breadcrumbs?: Array<{
    href: string;
    label: string;
    isCurrent?: boolean;
  }>;
  children?: ReactNode;
}

export default function PageHeroSection({
  title,
  subtitle,
  backgroundImage = 'https://images.pexels.com/photos/8363071/pexels-photo-8363071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  breadcrumbs,
  children,
}: PageHeroSectionProps) {
  return (
    <>
      <div className="relative w-full">
        <div className="absolute inset-0 z-10 bg-black/50"></div>
        <div
          className="relative z-20 flex h-[300px] w-full flex-col items-center justify-center bg-cover bg-center text-white md:h-[400px]"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        >
          <div className="container mx-auto h-full w-full bg-white/10 backdrop-blur-md">
            <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">{title}</h1>
            {subtitle && <p className="max-w-2xl px-4 text-center text-xl">{subtitle}</p>}
            {children}
          </div>
        </div>
      </div>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="container py-6">
          <Breadcrumb>
            {breadcrumbs.map((crumb, index) => (
              <BreadcrumbItem key={index} data-is-current-page={crumb.isCurrent}>
                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </div>
      )}
    </>
  );
}
