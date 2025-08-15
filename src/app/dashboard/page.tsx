'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { AcquisitionDashboard } from '../../components/acquisition/AcquisitionDashboard';
import { BuyerCard } from '../../components/profiles/BuyerCard';
import { Button } from '../../components/ui/Button';
import { mockBuyerProfiles, mockAcquisitionProcesses } from '../../data/mockData';

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('profiles');
  // Animation state for tab transitions
  const [tabAnim, setTabAnim] = useState(false);

  // Tab switch with animation
  const handleTabSwitch = (tab: string) => {
    setTabAnim(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTabAnim(false);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">CC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Caprae Capital</h1>
              </div>
            </Link>
            <Link href="/onboarding">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Navigation */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Caprae Capital Demo Dashboard</h1>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={() => handleTabSwitch('profiles')}
              className={`px-6 py-2 rounded-full font-semibold shadow transition-all duration-300 ${
                activeTab === 'profiles'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Buyer Profiles
            </button>
            <button
              onClick={() => handleTabSwitch('acquisition')}
              className={`px-6 py-2 rounded-full font-semibold shadow transition-all duration-300 ${
                activeTab === 'acquisition'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Acquisition Dashboard
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 shadow flex flex-col items-center animate-fade-in">
            <span className="text-3xl font-bold text-blue-700 mb-2">{mockBuyerProfiles.length}</span>
            <span className="text-gray-700 font-medium">Qualified Buyers</span>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 shadow flex flex-col items-center animate-fade-in">
            <span className="text-3xl font-bold text-green-700 mb-2">{mockAcquisitionProcesses.length}</span>
            <span className="text-gray-700 font-medium">Active Acquisitions</span>
          </div>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 shadow flex flex-col items-center animate-fade-in">
            <span className="text-3xl font-bold text-purple-700 mb-2">$2B+</span>
            <span className="text-gray-700 font-medium">Total Deal Value</span>
          </div>
        </div>

        {/* Demo Content with animation */}
        <div className={`transition-opacity duration-300 ${tabAnim ? 'opacity-0' : 'opacity-100'}`}>
          {activeTab === 'profiles' && (
            <div>
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Browse Qualified Buyers
                </h2>
                <p className="text-gray-600">
                  As a seller, you can browse through buyer profiles and initiate contact with those that match your criteria.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockBuyerProfiles.slice(0, 6).map((buyer) => (
                  <div key={buyer.id} className="hover:scale-105 transition-transform duration-300">
                    <BuyerCard 
                      buyer={buyer} 
                      onAccept={() => alert('Contact initiated!')}
                      onReject={() => alert('Buyer rejected')}
                      onViewDetails={() => alert('View details')}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'acquisition' && (
            <div>
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Acquisition Process Management
                </h2>
                <p className="text-gray-600">
                  Track your acquisition progress with our comprehensive dashboard that guides you through every step.
                </p>
              </div>
              <div className="rounded-xl shadow-lg bg-white p-6 animate-fade-in">
                <AcquisitionDashboard 
                  process={mockAcquisitionProcesses[0]} 
                  onStepClick={() => {}}
                  onUploadDocument={() => {}}
                  onAddNote={() => {}}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
