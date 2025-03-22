import type { Metadata } from 'next';

import { PageHeader } from '@/components/shared/page-header';

export const metadata: Metadata = {
  title: 'Drip Swag - Corporate Gifting Solutions',
  description: 'Sustainable corporate gifts for a greener future',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <PageHeader
        title="Shop"
        subtitle="Style That Speaks, Comfort That Lasts."
        backgroundImage="/images/shop-hero.png"
      />
      {children}
    </div>
  );
}
