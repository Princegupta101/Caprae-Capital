import React from 'react';
import { BuyerProfile } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge, Avatar } from '../ui/Badge';
import { formatCompactCurrency, getInitials, getIndustryColor } from '../../utils';
import { 
  MapPin, 
  Building2, 
  Clock, 
  DollarSign, 
  Trophy,
  Heart,
  X
} from 'lucide-react';

interface BuyerCardProps {
  buyer: BuyerProfile;
  onAccept: (buyerId: string) => void;
  onReject: (buyerId: string) => void;
  onViewDetails: (buyerId: string) => void;
}

export const BuyerCard: React.FC<BuyerCardProps> = ({
  buyer,
  onAccept,
  onReject,
  onViewDetails
}) => {
  const handleAccept = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAccept(buyer.id);
  };

  const handleReject = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReject(buyer.id);
  };

  return (
    <div 
      className="max-w-sm mx-auto transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={() => onViewDetails(buyer.id)}
    >
      <Card hover>
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <Avatar
              src={buyer.avatar}
              initials={getInitials(buyer.firstName, buyer.lastName)}
              size="lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {buyer.firstName} {buyer.lastName}
              </h3>
              <p className="text-sm text-gray-500 truncate">{buyer.company.name}</p>
              <div className="flex items-center mt-1">
                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">
                  {buyer.location.city}, {buyer.location.state}
                </span>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Industry Focus</span>
              </div>
              <Badge 
                className={getIndustryColor(buyer.company.industry)}
                size="sm"
              >
                {buyer.company.industry}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Budget Range</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {formatCompactCurrency(buyer.acquisitionPreferences.budgetRange.min)} - {formatCompactCurrency(buyer.acquisitionPreferences.budgetRange.max)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Timeline</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {buyer.acquisitionPreferences.timeline}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Trophy className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Experience</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {buyer.experience.previousAcquisitions} deals
              </span>
            </div>
          </div>

          {/* Industries of Interest */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Industries of Interest</h4>
            <div className="flex flex-wrap gap-2">
              {buyer.acquisitionPreferences.industries.slice(0, 3).map((industry) => (
                <Badge 
                  key={industry} 
                  variant="info" 
                  size="sm"
                  className={getIndustryColor(industry)}
                >
                  {industry}
                </Badge>
              ))}
              {buyer.acquisitionPreferences.industries.length > 3 && (
                <Badge variant="default" size="sm">
                  +{buyer.acquisitionPreferences.industries.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Company Description */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 line-clamp-3">
              {buyer.company.description}
            </p>
          </div>

          {/* Match Score */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Compatibility Score</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
                    style={{ width: '85%' }}
                  />
                </div>
                <span className="text-sm font-bold text-green-600">85%</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-6 pb-6">
          <div className="flex space-x-3 w-full">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
              onClick={handleReject}
            >
              <X className="h-4 w-4 mr-2" />
              Pass
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={handleAccept}
            >
              <Heart className="h-4 w-4 mr-2" />
              Connect
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};interface BuyerDetailModalProps {
  buyer: BuyerProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (buyerId: string) => void;
  onReject: (buyerId: string) => void;
}

export const BuyerDetailModal: React.FC<BuyerDetailModalProps> = ({
  buyer,
  isOpen,
  onClose,
  onAccept,
  onReject
}) => {
  if (!isOpen || !buyer) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-6 pt-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Avatar
                  src={buyer.avatar}
                  initials={getInitials(buyer.firstName, buyer.lastName)}
                  size="xl"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {buyer.firstName} {buyer.lastName}
                  </h2>
                  <p className="text-gray-600">{buyer.company.name}</p>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">
                      {buyer.location.city}, {buyer.location.state}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6 mb-6">
              {/* Company Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Overview</h3>
                <p className="text-gray-600 mb-4">{buyer.company.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Industry:</span>
                    <p className="font-medium">{buyer.company.industry}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Company Size:</span>
                    <p className="font-medium">{buyer.company.size} employees</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Website:</span>
                    <p className="font-medium text-blue-600">
                      <a href={buyer.company.website} target="_blank" rel="noopener noreferrer">
                        {buyer.company.website}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Acquisition Preferences */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Acquisition Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Budget Range:</span>
                    <p className="font-medium">
                      {formatCompactCurrency(buyer.acquisitionPreferences.budgetRange.min)} - {formatCompactCurrency(buyer.acquisitionPreferences.budgetRange.max)}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Target Revenue:</span>
                    <p className="font-medium">
                      {formatCompactCurrency(buyer.acquisitionPreferences.revenueRange.min)} - {formatCompactCurrency(buyer.acquisitionPreferences.revenueRange.max)}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Timeline:</span>
                    <p className="font-medium">{buyer.acquisitionPreferences.timeline}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Geographic Focus:</span>
                    <p className="font-medium">{buyer.acquisitionPreferences.geographicFocus.join(', ')}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className="text-sm text-gray-500">Industries of Interest:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {buyer.acquisitionPreferences.industries.map((industry) => (
                      <Badge 
                        key={industry}
                        className={getIndustryColor(industry)}
                        size="sm"
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-sm text-gray-500">Acquisition Types:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {buyer.acquisitionPreferences.acquisitionType.map((type) => (
                      <Badge key={type} variant="info" size="sm">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience & Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Previous Acquisitions:</span>
                    <p className="font-medium">{buyer.experience.previousAcquisitions}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Years of Experience:</span>
                    <p className="font-medium">{buyer.experience.yearsOfExperience} years</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-500">Areas of Expertise:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {buyer.experience.expertise.map((skill) => (
                      <Badge key={skill} variant="default" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Email:</span>
                    <p className="font-medium">{buyer.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Phone:</span>
                    <p className="font-medium">{buyer.contact.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-gray-500">LinkedIn:</span>
                    <p className="font-medium text-blue-600">
                      <a href={buyer.contact.linkedin} target="_blank" rel="noopener noreferrer">
                        {buyer.contact.linkedin}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
                onClick={() => {
                  onReject(buyer.id);
                  onClose();
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Not a Good Fit
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  onAccept(buyer.id);
                  onClose();
                }}
              >
                <Heart className="h-4 w-4 mr-2" />
                Start Conversation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
