import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  isComplete: boolean;
  data: Record<string, unknown>;
  loading: boolean;
  error: string | null;
}

const initialState: OnboardingState = {
  currentStep: 1,
  totalSteps: 5,
  isComplete: false,
  data: {},
  loading: false,
  error: null,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    updateStepData: (state, action: PayloadAction<{ step: number; data: Record<string, unknown> }>) => {
      state.data = {
        ...state.data,
        [`step${action.payload.step}`]: action.payload.data,
      };
    },
    completeOnboarding: (state) => {
      state.isComplete = true;
      state.currentStep = state.totalSteps;
    },
    resetOnboarding: (state) => {
      state.currentStep = 1;
      state.isComplete = false;
      state.data = {};
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setTotalSteps: (state, action: PayloadAction<number>) => {
      state.totalSteps = action.payload;
    },
  },
});

export const {
  setCurrentStep,
  nextStep,
  previousStep,
  updateStepData,
  completeOnboarding,
  resetOnboarding,
  setLoading,
  setError,
  setTotalSteps,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
