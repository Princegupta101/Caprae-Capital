import React from 'react';
import { AcquisitionProcess, AcquisitionStep as StepType } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/Progress';
import { formatDate } from '../../utils';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  AlertCircle, 
  Calendar,
  User,
  Download,
  Upload,
  MessageSquare
} from 'lucide-react';

interface AcquisitionDashboardProps {
  process: AcquisitionProcess;
  onStepClick: (stepId: string) => void;
  onUploadDocument: (stepId: string) => void;
  onAddNote: (stepId: string) => void;
}

export const AcquisitionDashboard: React.FC<AcquisitionDashboardProps> = ({
  process,
  onStepClick,
  onUploadDocument,
  onAddNote
}) => {
  const getStatusColor = (status: StepType['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'blocked':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: StepType['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'blocked':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Acquisition Process</h1>
        <div className="flex items-center justify-between">
          <Badge 
            variant={process.status === 'completed' ? 'success' : 'info'}
            size="lg"
          >
            {process.status.replace('_', ' ').toUpperCase()}
          </Badge>
          <span className="text-sm text-gray-500">
            Last updated: {formatDate(process.updatedAt)}
          </span>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar 
            current={process.currentStep} 
            total={process.totalSteps}
            size="lg"
          />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{process.currentStep}</div>
              <div className="text-sm text-gray-500">Current Step</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {process.steps.filter(s => s.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {process.steps.filter(s => s.status === 'in_progress').length}
              </div>
              <div className="text-sm text-gray-500">In Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-4">
        {process.steps.map((step, index) => (
          <Card 
            key={step.id} 
            className={`transition-all duration-200 ${
              step.status === 'in_progress' ? 'border-blue-300 shadow-md' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(step.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Step {index + 1}: {step.title}
                      </h3>
                      <Badge variant={getStatusColor(step.status)}>
                        {step.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    {step.dueDate && (
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        Due: {formatDate(step.dueDate)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onStepClick(step.id)}
                  >
                    View Details
                  </Button>
                  {step.status === 'in_progress' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUploadDocument(step.id)}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAddNote(step.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Note
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Documents */}
              {step.documents.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Documents</h4>
                  <div className="space-y-2">
                    {step.documents.map((doc) => (
                      <div 
                        key={doc.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <div>
                            <span className="text-sm font-medium text-gray-900">
                              {doc.name}
                            </span>
                            <div className="text-xs text-gray-500">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB • {formatDate(doc.uploadedAt)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={doc.status === 'approved' ? 'success' : 'warning'} size="sm">
                            {doc.status.replace('_', ' ')}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {step.tasks.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tasks</h4>
                  <div className="space-y-2">
                    {step.tasks.map((task) => (
                      <div 
                        key={task.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            task.status === 'completed' 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300'
                          }`}>
                            {task.status === 'completed' && (
                              <CheckCircle className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span className={`text-sm font-medium ${
                              task.status === 'completed' 
                                ? 'text-gray-500 line-through' 
                                : 'text-gray-900'
                            }`}>
                              {task.title}
                            </span>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <User className="h-3 w-3" />
                              <span>Assigned to: {task.assignedTo}</span>
                              {task.dueDate && (
                                <>
                                  <span>•</span>
                                  <span>Due: {formatDate(task.dueDate)}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'default'}
                          size="sm"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {step.notes && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-1">Notes</h4>
                  <p className="text-sm text-blue-800">{step.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <Button variant="outline">
          Export Progress Report
        </Button>
        <div className="space-x-3">
          <Button variant="outline">
            Schedule Meeting
          </Button>
          <Button variant="primary">
            Continue to Next Step
          </Button>
        </div>
      </div>
    </div>
  );
};
