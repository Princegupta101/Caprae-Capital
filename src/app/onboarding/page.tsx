'use client';

import React from 'react';
import { BuyerOnboarding } from '../../components/onboarding/BuyerOnboarding';
import { SellerOnboarding } from '../../components/onboarding/SellerOnboarding';
import { useSearchParams } from 'next/navigation';

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  if (type === 'seller') {
    return <SellerOnboarding />;
  } else if (type === 'buyer') {
    return <BuyerOnboarding />;
  }

  // Default selection if no type specified
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-2xl">CC</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Caprae Capital
        </h1>
        <p className="text-gray-600 mb-8">
          Are you looking to buy or sell a business?
        </p>
        <div className="space-y-4">
          <a
            href="/onboarding?type=seller"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors block"
          >
            I&apos;m Selling a Business
          </a>
          <a
            href="/onboarding?type=buyer"
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors block"
          >
            I&apos;m Looking to Buy
          </a>
        </div>
      </div>
    </div>
  );
}
