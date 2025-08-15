import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuyerProfile, SellerProfile } from '../../types';

interface ProfilesState {
  buyers: BuyerProfile[];
  sellers: SellerProfile[];
  loading: boolean;
  error: string | null;
  currentProfile: BuyerProfile | SellerProfile | null;
  filteredProfiles: BuyerProfile[];
  filters: {
    industry: string[];
    budgetRange: { min: number; max: number };
    location: string[];
    timeline: string;
  };
}

const initialState: ProfilesState = {
  buyers: [],
  sellers: [],
  loading: false,
  error: null,
  currentProfile: null,
  filteredProfiles: [],
  filters: {
    industry: [],
    budgetRange: { min: 0, max: 100000000 },
    location: [],
    timeline: '',
  },
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setBuyerProfiles: (state, action: PayloadAction<BuyerProfile[]>) => {
      state.buyers = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSellerProfiles: (state, action: PayloadAction<SellerProfile[]>) => {
      state.sellers = action.payload;
      state.loading = false;
      state.error = null;
    },
    addBuyerProfile: (state, action: PayloadAction<BuyerProfile>) => {
      state.buyers.push(action.payload);
    },
    addSellerProfile: (state, action: PayloadAction<SellerProfile>) => {
      state.sellers.push(action.payload);
    },
    updateBuyerProfile: (state, action: PayloadAction<BuyerProfile>) => {
      const index = state.buyers.findIndex(buyer => buyer.id === action.payload.id);
      if (index !== -1) {
        state.buyers[index] = action.payload;
      }
    },
    updateSellerProfile: (state, action: PayloadAction<SellerProfile>) => {
      const index = state.sellers.findIndex(seller => seller.id === action.payload.id);
      if (index !== -1) {
        state.sellers[index] = action.payload;
      }
    },
    setCurrentProfile: (state, action: PayloadAction<BuyerProfile | SellerProfile | null>) => {
      state.currentProfile = action.payload;
    },
    setFilteredProfiles: (state, action: PayloadAction<BuyerProfile[]>) => {
      state.filteredProfiles = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<ProfilesState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredProfiles = [];
    },
  },
});

export const {
  setLoading,
  setError,
  setBuyerProfiles,
  setSellerProfiles,
  addBuyerProfile,
  addSellerProfile,
  updateBuyerProfile,
  updateSellerProfile,
  setCurrentProfile,
  setFilteredProfiles,
  updateFilters,
  clearFilters,
} = profilesSlice.actions;

export default profilesSlice.reducer;
