import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { industryOptions, timelineOptions, locationOptions } from '../../data/mockData';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Input, Select, Textarea } from '../ui/Input';
import { StepProgress } from '../ui/Progress';

interface SellerOnboardingData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Step 2: Business Information
  businessName: string;
  industry: string;
  yearEstablished: string;
  employees: string;
  website: string;
  description: string;
  
  // Step 3: Location
  city: string;
  state: string;
  country: string;
  
  // Step 4: Financial Information
  annualRevenue: string;
  ebitda: string;
  assets: string;
  askingPrice: string;
  
  // Step 5: Sale Details
  sellingReason: string;
  timeline: string;
  keyAssets: string;
}

export const SellerOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [redirecting, setRedirecting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SellerOnboardingData>();
  const totalSteps = 5;
  const steps = [
    { id: '1', title: 'Personal', status: (currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending') as 'completed' | 'current' | 'pending' },
    { id: '2', title: 'Business', status: (currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending') as 'completed' | 'current' | 'pending' },
    { id: '3', title: 'Location', status: (currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'pending') as 'completed' | 'current' | 'pending' },
    { id: '4', title: 'Financials', status: (currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'pending') as 'completed' | 'current' | 'pending' },
    { id: '5', title: 'Sale Details', status: (currentStep === 5 ? 'current' : 'pending') as 'completed' | 'current' | 'pending' },
  ];
  const router = useRouter();

  const onSubmit = (data: SellerOnboardingData) => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setRedirecting(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <p className="text-gray-600 mt-2">Tell us about yourself to get started</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                {...register('firstName', { required: 'First name is required' })}
                error={errors.firstName?.message}
              />
              <Input
                label="Last Name"
                {...register('lastName', { required: 'Last name is required' })}
                error={errors.lastName?.message}
              />
              <Input
                label="Email Address"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                })}
                error={errors.email?.message}
              />
              <Input
                label="Phone Number"
                type="tel"
                {...register('phone', { required: 'Phone number is required' })}
                error={errors.phone?.message}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
              <p className="text-gray-600 mt-2">Tell us about your business</p>
            </div>
            
            <div className="space-y-6">
              <Input
                label="Business Name"
                {...register('businessName', { required: 'Business name is required' })}
                error={errors.businessName?.message}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Industry"
                  options={industryOptions.map(industry => ({ value: industry, label: industry }))}
                  placeholder="Select industry"
                  {...register('industry', { required: 'Industry is required' })}
                  error={errors.industry?.message}
                />
                <Input
                  label="Year Established"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  {...register('yearEstablished', { required: 'Year established is required' })}
                  error={errors.yearEstablished?.message}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Number of Employees"
                  type="number"
                  min="1"
                  {...register('employees', { required: 'Number of employees is required' })}
                  error={errors.employees?.message}
                />
                <Input
                  label="Website (Optional)"
                  type="url"
                  placeholder="https://example.com"
                  {...register('website')}
                  error={errors.website?.message}
                />
              </div>
              
              <Textarea
                label="Business Description"
                rows={4}
                placeholder="Describe your business, products/services, and what makes it unique..."
                {...register('description', { required: 'Business description is required' })}
                error={errors.description?.message}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Business Location</h2>
              <p className="text-gray-600 mt-2">Where is your business located?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="City"
                {...register('city', { required: 'City is required' })}
                error={errors.city?.message}
              />
              <Select
                label="State/Province"
                options={locationOptions.map(state => ({ value: state, label: state }))}
                placeholder="Select state"
                {...register('state', { required: 'State is required' })}
                error={errors.state?.message}
              />
              <Input
                label="Country"
                defaultValue="United States"
                {...register('country', { required: 'Country is required' })}
                error={errors.country?.message}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Financial Information</h2>
              <p className="text-gray-600 mt-2">Help buyers understand your business value</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Annual Revenue ($)"
                  type="number"
                  min="0"
                  placeholder="1000000"
                  {...register('annualRevenue', { required: 'Annual revenue is required' })}
                  error={errors.annualRevenue?.message}
                />
                <Input
                  label="EBITDA ($) - Optional"
                  type="number"
                  min="0"
                  placeholder="300000"
                  {...register('ebitda')}
                  error={errors.ebitda?.message}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Total Assets ($)"
                  type="number"
                  min="0"
                  placeholder="500000"
                  {...register('assets', { required: 'Total assets is required' })}
                  error={errors.assets?.message}
                />
                <Input
                  label="Asking Price ($) - Optional"
                  type="number"
                  min="0"
                  placeholder="3000000"
                  {...register('askingPrice')}
                  error={errors.askingPrice?.message}
                  helpText="You can leave this blank if you prefer to negotiate"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Sale Details</h2>
              <p className="text-gray-600 mt-2">Tell us about your sale preferences</p>
            </div>
            
            <div className="space-y-6">
              <Select
                label="Sale Timeline"
                options={timelineOptions.map(timeline => ({ value: timeline, label: timeline }))}
                placeholder="Select timeline"
                {...register('timeline', { required: 'Timeline is required' })}
                error={errors.timeline?.message}
              />
              
              <Textarea
                label="Reason for Selling"
                rows={4}
                placeholder="e.g., Retirement, strategic growth, pursuing new opportunities..."
                {...register('sellingReason', { required: 'Reason for selling is required' })}
                error={errors.sellingReason?.message}
              />
              
              <Textarea
                label="Key Business Assets"
                rows={4}
                placeholder="e.g., Customer base, proprietary technology, brand recognition, distribution network..."
                helpText="List your main business assets that add value"
                {...register('keyAssets', { required: 'Key assets is required' })}
                error={errors.keyAssets?.message}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <StepProgress steps={steps} />
        </div>

        {/* Main Card */}
        <Card className="shadow-xl">
          <CardContent className="p-8">
            {redirecting ? (
              <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
                <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-2xl font-bold text-green-700 mb-2">Setting up your dashboard...</h2>
                <p className="text-gray-500">Please wait while we prepare your personalized experience.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {renderStep()}
                {/* Navigation */}
                <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={goBack}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => console.log('Save draft')}
                    >
                      Save Draft
                    </Button>
                    <Button type="submit">
                      {currentStep === totalSteps ? 'Complete Setup' : 'Next Step'}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
