import type React from 'react';
import ProfileSidebar from '@/components/profile/profile-sidebar';
import { UserProfile } from '@/components/profile/user-profile';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex min-h-screen flex-col gap-8 px-4 py-8 md:flex-row">
      <div className="md:w-1/4 md:max-w-[250px]">
        <UserProfile   />
        <ProfileSidebar />
      </div>
      <div className="overflow-hidden md:w-3/4">{children}</div>
    </div>
  );
}
