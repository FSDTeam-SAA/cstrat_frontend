'use client';
import React from 'react';

export default function PrivacyPolicy() {
  const [privacyContent, setPrivacyContent] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null); // Explicitly type 'error' state

  React.useEffect(() => {
    const fetchPrivacyContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/content/privacy`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPrivacyContent(data.data.content);
        setLoading(false);
        /* eslint-disable @typescript-eslint/no-explicit-any */
      } catch (e: any) {
        // Type 'e' as 'any' or 'Error' for broader compatibility
        setError(e);
        setLoading(false);
        console.error('Could not fetch privacy content:', e);
      }
    };

    fetchPrivacyContent();
  }, []);

  if (loading) {
    return <div>Loading privacy policy...</div>;
  }

  if (error) {
    return <div>Error loading privacy policy.</div>;
  }

  return (
    <div className="container py-8 md:py-12">
      <div>
        <div dangerouslySetInnerHTML={{ __html: privacyContent }} />
      </div>
    </div>
  );
}
