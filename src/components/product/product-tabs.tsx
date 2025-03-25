'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  description?: string;
}

export default function ProductTabs({}: { product: Product }) {
  const [activeTab, setActiveTab] = useState('descriptions');

  const tabs = [
    { id: 'descriptions', label: 'Descriptions' },
    { id: 'additional', label: 'Additional Information' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'py-4 text-sm font-medium transition-colors hover:text-black',
                activeTab === tab.id ? 'border-b-2 border-black text-black' : 'text-muted-foreground',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'descriptions' && (
          <div>
            <p className="text-muted-foreground">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
              release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        )}

        {activeTab === 'additional' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <span className="font-medium">Material</span>
              <span>100% Cotton</span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <span className="font-medium">Weight</span>
              <span>180 gsm</span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <span className="font-medium">Care Instructions</span>
              <span>Machine wash cold, tumble dry low</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <span className="font-medium">Country of Origin</span>
              <span>Made in USA</span>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">John Doe</h4>
                  <div className="flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} filled={i < 5} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Verified Purchase</span>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">June 12, 2023</span>
              </div>
              <p className="text-muted-foreground">
                Great quality t-shirt! The fabric is soft and comfortable, and the design looks exactly as pictured.
                Highly recommend!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Jane Smith</h4>
                  <div className="flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} filled={i < 4} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Verified Purchase</span>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">May 28, 2023</span>
              </div>
              <p className="text-muted-foreground">
                The shirt fits well and the material is nice. I would have given 5 stars but it shrunk a bit after the
                first wash.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Star component for reviews
function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
