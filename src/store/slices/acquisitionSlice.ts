import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AcquisitionProcess, AcquisitionStep } from '../../types';

interface AcquisitionState {
  processes: AcquisitionProcess[];
  currentProcess: AcquisitionProcess | null;
  loading: boolean;
  error: string | null;
  activeSteps: AcquisitionStep[];
}

const initialState: AcquisitionState = {
  processes: [],
  currentProcess: null,
  loading: false,
  error: null,
  activeSteps: [],
};

const acquisitionSlice = createSlice({
  name: 'acquisition',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setProcesses: (state, action: PayloadAction<AcquisitionProcess[]>) => {
      state.processes = action.payload;
      state.loading = false;
      state.error = null;
    },
    addProcess: (state, action: PayloadAction<AcquisitionProcess>) => {
      state.processes.push(action.payload);
    },
    updateProcess: (state, action: PayloadAction<AcquisitionProcess>) => {
      const index = state.processes.findIndex(process => process.id === action.payload.id);
      if (index !== -1) {
        state.processes[index] = action.payload;
        
        // Update current process if it's the same one
        if (state.currentProcess && state.currentProcess.id === action.payload.id) {
          state.currentProcess = action.payload;
          state.activeSteps = action.payload.steps;
        }
      }
    },
    setCurrentProcess: (state, action: PayloadAction<AcquisitionProcess | null>) => {
      state.currentProcess = action.payload;
      state.activeSteps = action.payload?.steps || [];
    },
    updateStep: (state, action: PayloadAction<{ processId: string; step: AcquisitionStep }>) => {
      const process = state.processes.find(p => p.id === action.payload.processId);
      if (process) {
        const stepIndex = process.steps.findIndex(s => s.id === action.payload.step.id);
        if (stepIndex !== -1) {
          process.steps[stepIndex] = action.payload.step;
          
          // Update current process if it's the same one
          if (state.currentProcess && state.currentProcess.id === action.payload.processId) {
            state.currentProcess.steps[stepIndex] = action.payload.step;
            state.activeSteps = state.currentProcess.steps;
          }
        }
      }
    },
    completeStep: (state, action: PayloadAction<{ processId: string; stepId: string }>) => {
      const process = state.processes.find(p => p.id === action.payload.processId);
      if (process) {
        const step = process.steps.find(s => s.id === action.payload.stepId);
        if (step) {
          step.status = 'completed';
          step.completedAt = new Date().toISOString();
          
          // Update current step in process
          if (process.currentStep < process.steps.length) {
            process.currentStep += 1;
          }
          
          // Update current process if it's the same one
          if (state.currentProcess && state.currentProcess.id === action.payload.processId) {
            state.currentProcess = process;
            state.activeSteps = process.steps;
          }
        }
      }
    },
    advanceToNextStep: (state, action: PayloadAction<string>) => {
      const process = state.processes.find(p => p.id === action.payload);
      if (process && process.currentStep < process.totalSteps) {
        process.currentStep += 1;
        process.updatedAt = new Date().toISOString();
        
        // Update current process if it's the same one
        if (state.currentProcess && state.currentProcess.id === action.payload) {
          state.currentProcess = process;
        }
      }
    },
    setProcessStatus: (state, action: PayloadAction<{ processId: string; status: AcquisitionProcess['status'] }>) => {
      const process = state.processes.find(p => p.id === action.payload.processId);
      if (process) {
        process.status = action.payload.status;
        process.updatedAt = new Date().toISOString();
        
        // Update current process if it's the same one
        if (state.currentProcess && state.currentProcess.id === action.payload.processId) {
          state.currentProcess = process;
        }
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setProcesses,
  addProcess,
  updateProcess,
  setCurrentProcess,
  updateStep,
  completeStep,
  advanceToNextStep,
  setProcessStatus,
} = acquisitionSlice.actions;

export default acquisitionSlice.reducer;
