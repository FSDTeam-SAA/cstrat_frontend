'use client';
import React from 'react';

export default function TermsAndConditions() {
  const [termsContent, setTermsContent] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const fetchTermsContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/content/terms`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTermsContent(data.data.content);
        setLoading(false);
        /* eslint-disable @typescript-eslint/no-explicit-any */
      } catch (e: any) {
        setError(e);
        setLoading(false);
        console.error('Could not fetch terms and conditions:', e);
      }
    };

    fetchTermsContent();
  }, []);

  if (loading) {
    return <div>Loading terms and conditions...</div>;
  }

  if (error) {
    return <div>Error loading terms and conditions.</div>;
  }
  console.log(termsContent);

  return (
    <div className="container mb-20 mt-20">
      <div>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: termsContent }} />
      </div>
    </div>
  );
}
