import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { industryOptions, companySizeOptions, timelineOptions, locationOptions } from '../../data/mockData';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Input, Select } from '../ui/Input';
import { StepProgress } from '../ui/Progress';

interface BuyerOnboardingData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Step 2: Company Information
  companyName: string;
  companyIndustry: string;
  companySize: string;
  companyWebsite: string;
  companyDescription: string;
  
  // Step 3: Location
  city: string;
  state: string;
  country: string;
  
  // Step 4: Acquisition Preferences
  targetIndustries: string[];
  budgetMin: string;
  budgetMax: string;
  revenueMin: string;
  revenueMax: string;
  geographicFocus: string[];
  timeline: string;
  acquisitionTypes: string[];
  
  // Step 5: Experience
  previousAcquisitions: string;
  yearsOfExperience: string;
  expertise: string;
}

export const BuyerOnboarding: React.FC = () => {

  const [currentStep, setCurrentStep] = useState(1);
  const [redirecting, setRedirecting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<BuyerOnboardingData>();
  const totalSteps = 5;
  const steps = [
    { id: '1', title: 'Personal', status: (currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending') as 'completed' | 'current' | 'pending' },
    { id: '2', title: 'Company', status: (currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending') as 'completed' | 'current' | 'pending' },
    { id: '3', title: 'Location', status: (currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'pending') as 'completed' | 'current' | 'pending' },
    { id: '4', title: 'Preferences', status: (currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'pending') as 'completed' | 'current' | 'pending' },
    { id: '5', title: 'Experience', status: (currentStep === 5 ? 'current' : 'pending') as 'completed' | 'current' | 'pending' },
  ];

  // Next.js router for redirect
  const router = useRouter();

  const onSubmit = (data: BuyerOnboardingData) => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setRedirecting(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200); // 1.2s animation
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
              <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
              <p className="text-gray-600 mt-2">Tell us about your organization</p>
            </div>
            
            <div className="space-y-6">
              <Input
                label="Company Name"
                {...register('companyName', { required: 'Company name is required' })}
                error={errors.companyName?.message}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Industry"
                  options={industryOptions.map(industry => ({ value: industry, label: industry }))}
                  placeholder="Select industry"
                  {...register('companyIndustry', { required: 'Industry is required' })}
                  error={errors.companyIndustry?.message}
                />
                <Select
                  label="Company Size"
                  options={companySizeOptions.map(size => ({ value: size, label: `${size} employees` }))}
                  placeholder="Select company size"
                  {...register('companySize', { required: 'Company size is required' })}
                  error={errors.companySize?.message}
                />
              </div>
              
              <Input
                label="Website (Optional)"
                type="url"
                placeholder="https://example.com"
                {...register('companyWebsite')}
                error={errors.companyWebsite?.message}
              />
              
              <Input
                label="Company Description"
                {...register('companyDescription', { required: 'Company description is required' })}
                error={errors.companyDescription?.message}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Location</h2>
              <p className="text-gray-600 mt-2">Where is your company based?</p>
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
              <h2 className="text-2xl font-bold text-gray-900">Acquisition Preferences</h2>
              <p className="text-gray-600 mt-2">Help us find the right matches for you</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Budget Range - Minimum ($)"
                  type="number"
                  placeholder="1000000"
                  {...register('budgetMin', { required: 'Minimum budget is required' })}
                  error={errors.budgetMin?.message}
                />
                <Input
                  label="Budget Range - Maximum ($)"
                  type="number"
                  placeholder="10000000"
                  {...register('budgetMax', { required: 'Maximum budget is required' })}
                  error={errors.budgetMax?.message}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Target Revenue - Minimum ($)"
                  type="number"
                  placeholder="500000"
                  {...register('revenueMin', { required: 'Minimum revenue is required' })}
                  error={errors.revenueMin?.message}
                />
                <Input
                  label="Target Revenue - Maximum ($)"
                  type="number"
                  placeholder="5000000"
                  {...register('revenueMax', { required: 'Maximum revenue is required' })}
                  error={errors.revenueMax?.message}
                />
              </div>
              
              <Select
                label="Timeline"
                options={timelineOptions.map(timeline => ({ value: timeline, label: timeline }))}
                placeholder="Select timeline"
                {...register('timeline', { required: 'Timeline is required' })}
                error={errors.timeline?.message}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Experience & Expertise</h2>
              <p className="text-gray-600 mt-2">Tell us about your acquisition experience</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Previous Acquisitions"
                  type="number"
                  placeholder="0"
                  {...register('previousAcquisitions', { required: 'Previous acquisitions count is required' })}
                  error={errors.previousAcquisitions?.message}
                />
                <Input
                  label="Years of Experience"
                  type="number"
                  placeholder="5"
                  {...register('yearsOfExperience', { required: 'Years of experience is required' })}
                  error={errors.yearsOfExperience?.message}
                />
              </div>
              
              <Input
                label="Areas of Expertise"
                placeholder="e.g., SaaS, AI/ML, Due Diligence"
                helpText="Separate multiple areas with commas"
                {...register('expertise', { required: 'Expertise is required' })}
                error={errors.expertise?.message}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
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
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-2xl font-bold text-blue-700 mb-2">Setting up your dashboard...</h2>
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
