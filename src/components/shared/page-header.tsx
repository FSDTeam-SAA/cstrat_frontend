import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  breadcrumbs?: Array<{
    label: string;
    href: string;
  }>;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  description,
  backgroundImage = 'https://images.pexels.com/photos/8363071/pexels-photo-8363071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  breadcrumbs = [],
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('relative w-full', className)}>
      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/60"></div>

      {/* Background image */}
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          height: description ? '400px' : '300px',
        }}
      >
        {/* Content container */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-white">
          {/* Page title */}
          <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">{title}</h1>

          {/* Optional subtitle */}
          {subtitle && <p className="max-w-3xl text-center text-xl">{subtitle}</p>}

          {/* Optional description */}
          {description && <p className="mt-4 max-w-3xl text-center text-base md:text-lg">{description}</p>}
        </div>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="flex items-center justify-center bg-white py-4">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center">
              <Link href={item.href} className="text-black transition-colors hover:text-gray-600">
                {item.label}
              </Link>
              {index < breadcrumbs.length - 1 && <span className="mx-2">›</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
