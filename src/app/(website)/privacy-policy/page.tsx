import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacy Policy | drip-swag",
  description:
    "Read our Privacy Policy to understand how drip-swag collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: May 19, 2025</p>

      <Card className="shadow-md">
        <CardContent className="space-y-8 p-6">
          <div>
            <p>
              At <strong>drip-swag</strong>, we are committed to protecting your
              privacy and safeguarding your personal information. This Privacy
              Policy explains how we collect, use, and protect your information
              when you visit our website,{" "}
              <a
                href="https://www.drip-swag.com"
                className="text-blue-600 underline"
              >
                www.drip-swag.com
              </a>
              . By using our Website, you agree to the terms of this Privacy
              Policy.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <strong>Personal Information:</strong> Name, email address, or
                other contact details you provide.
              </li>
              <li>
                <strong>Non-Personal Information:</strong> IP address, browser
                type, device info, and website usage data collected via cookies.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Improve website functionality and user experience.</li>
              <li>Respond to inquiries or provide support.</li>
              <li>Send updates, newsletters, or promotions (if opted in).</li>
              <li>Analyze usage data to enhance services.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. No Sharing or Reselling</h2>
            <p className="text-sm text-gray-700">
              We do <strong>not share, sell, rent, or resell</strong> your personal
              information, except:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mt-2">
              <li>With your explicit consent.</li>
              <li>
                With trusted service providers (e.g., hosting, analytics) under
                confidentiality.
              </li>
              <li>If required by law or legal process.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Cookies and Tracking</h2>
            <p className="text-sm text-gray-700">
              We use cookies to enhance your experience and analyze performance.
              You may manage cookie preferences via your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
            <p className="text-sm text-gray-700">
              We take reasonable steps to protect your information. However, no
              system is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Request access or updates to your data.</li>
              <li>Unsubscribe from communications at any time.</li>
              <li>Request deletion of your data (subject to legal obligations).</li>
            </ul>
            <p className="mt-2 text-sm">
              Contact us at{" "}
              <a
                href="mailto:privacy@drip-swag.com"
                className="text-blue-600 underline"
              >
                privacy@drip-swag.com
              </a>{" "}
              to exercise these rights.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Third-Party Links</h2>
            <p className="text-sm text-gray-700">
              Our Website may link to third-party websites. We are not responsible
              for their privacy practices. Please review their policies separately.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Children’s Privacy</h2>
            <p className="text-sm text-gray-700">
              We do not knowingly collect data from individuals under 13. If we
              become aware of such collection, we will promptly delete the data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">9. Changes to Policy</h2>
            <p className="text-sm text-gray-700">
              We may update this policy from time to time. The “Last Updated” date
              reflects the most recent changes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
            <p className="text-sm text-gray-700">
              For questions or concerns, contact us at:
            </p>
            <ul className="text-sm mt-2">
              <li>Email: <a href="mailto:privacy@drip-swag.com" className="text-blue-600 underline">privacy@drip-swag.com</a></li>
              <li>Address: 334 Marshall Way STE A Layton UT 84041</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}







// 'use client';
// import React from 'react';

// export default function PrivacyPolicy() {
//   const [privacyContent, setPrivacyContent] = React.useState('');
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState<Error | null>(null); // Explicitly type 'error' state

//   React.useEffect(() => {
//     const fetchPrivacyContent = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/content/privacy`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setPrivacyContent(data.data.content);
//         setLoading(false);
//         /* eslint-disable @typescript-eslint/no-explicit-any */
//       } catch (e: any) {
//         // Type 'e' as 'any' or 'Error' for broader compatibility
//         setError(e);
//         setLoading(false);
//         console.error('Could not fetch privacy content:', e);
//       }
//     };

//     fetchPrivacyContent();
//   }, []);

//   if (loading) {
//     return <div>Loading privacy policy...</div>;
//   }

//   if (error) {
//     return <div>Error loading privacy policy.</div>;
//   }

//   return (
//     <div className="container py-8 md:py-12">
//       <div>
//         <div dangerouslySetInnerHTML={{ __html: privacyContent }} />
//       </div>
//     </div>
//   );
// }




