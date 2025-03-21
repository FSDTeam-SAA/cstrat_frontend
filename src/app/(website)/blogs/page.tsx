import { PageHeader } from '@/components/shared/page-header';

export default function BlogsPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Blogs"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blogs', href: '/blogs' },
        ]}
      />

      <div className="container py-12">
        {/* Blog content goes here */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Blog posts would go here */}
          <div className="rounded-lg border p-6">
            <h2 className="mb-2 text-xl font-bold">Sample Blog Post</h2>
            <p className="text-gray-600">This is a sample blog post content...</p>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="mb-2 text-xl font-bold">Another Blog Post</h2>
            <p className="text-gray-600">This is another sample blog post content...</p>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="mb-2 text-xl font-bold">Third Blog Post</h2>
            <p className="text-gray-600">This is a third sample blog post content...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
