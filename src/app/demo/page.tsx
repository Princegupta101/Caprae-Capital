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

        {/* Short Modern Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200 animate-fade-in">
            <span className="text-xl font-bold text-blue-600 mb-1">{mockBuyerProfiles.length}</span>
            <span className="text-xs text-gray-500">Qualified Buyers</span>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200 animate-fade-in">
            <span className="text-xl font-bold text-green-600 mb-1">{mockAcquisitionProcesses.length}</span>
            <span className="text-xs text-gray-500">Active Acquisitions</span>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200 animate-fade-in">
            <span className="text-xl font-bold text-purple-600 mb-1">$2B+</span>
            <span className="text-xs text-gray-500">Total Deal Value</span>
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
                  <div className="hover:scale-105 transition-transform duration-300">
                    <BuyerCard 
                      key={buyer.id} 
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
