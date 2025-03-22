import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import ProfileSidebar from '@/components/profile/profile-sidebar';
import ProfileForm from '@/components/profile/profile-form';

export default function ProfilePage() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="container py-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink aria-current="page">Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <ProfileSidebar activeItem="personal" />
          </div>
          <div className="md:col-span-3">
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}
