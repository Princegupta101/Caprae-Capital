import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Match, Message } from '../../types';

interface MatchesState {
  list: Match[];
  loading: boolean;
  error: string | null;
  currentMatch: Match | null;
  pendingMatches: Match[];
  acceptedMatches: Match[];
}

const initialState: MatchesState = {
  list: [],
  loading: false,
  error: null,
  currentMatch: null,
  pendingMatches: [],
  acceptedMatches: [],
};

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setMatches: (state, action: PayloadAction<Match[]>) => {
      state.list = action.payload;
      state.pendingMatches = action.payload.filter(match => match.status === 'pending');
      state.acceptedMatches = action.payload.filter(match => match.status === 'accepted');
      state.loading = false;
      state.error = null;
    },
    addMatch: (state, action: PayloadAction<Match>) => {
      state.list.push(action.payload);
      if (action.payload.status === 'pending') {
        state.pendingMatches.push(action.payload);
      } else if (action.payload.status === 'accepted') {
        state.acceptedMatches.push(action.payload);
      }
    },
    updateMatch: (state, action: PayloadAction<Match>) => {
      const index = state.list.findIndex(match => match.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        
        // Update categorized lists
        state.pendingMatches = state.pendingMatches.filter(match => match.id !== action.payload.id);
        state.acceptedMatches = state.acceptedMatches.filter(match => match.id !== action.payload.id);
        
        if (action.payload.status === 'pending') {
          state.pendingMatches.push(action.payload);
        } else if (action.payload.status === 'accepted') {
          state.acceptedMatches.push(action.payload);
        }
        
        // Update current match if it's the same one
        if (state.currentMatch && state.currentMatch.id === action.payload.id) {
          state.currentMatch = action.payload;
        }
      }
    },
    setCurrentMatch: (state, action: PayloadAction<Match | null>) => {
      state.currentMatch = action.payload;
    },
    acceptMatch: (state, action: PayloadAction<string>) => {
      const match = state.list.find(m => m.id === action.payload);
      if (match) {
        match.status = 'accepted';
        match.acceptedAt = new Date().toISOString();
        
        // Move from pending to accepted
        state.pendingMatches = state.pendingMatches.filter(m => m.id !== action.payload);
        state.acceptedMatches.push(match);
      }
    },
    rejectMatch: (state, action: PayloadAction<string>) => {
      const match = state.list.find(m => m.id === action.payload);
      if (match) {
        match.status = 'rejected';
        match.rejectedAt = new Date().toISOString();
        
        // Remove from pending
        state.pendingMatches = state.pendingMatches.filter(m => m.id !== action.payload);
      }
    },
    addMessage: (state, action: PayloadAction<{ matchId: string; message: Message }>) => {
      const match = state.list.find(m => m.id === action.payload.matchId);
      if (match) {
        match.messages.push(action.payload.message);
        
        // Update current match if it's the same one
        if (state.currentMatch && state.currentMatch.id === action.payload.matchId) {
          state.currentMatch.messages.push(action.payload.message);
        }
      }
    },
    markMessagesAsRead: (state, action: PayloadAction<{ matchId: string; userId: string }>) => {
      const match = state.list.find(m => m.id === action.payload.matchId);
      if (match) {
        match.messages = match.messages.map(message => 
          message.senderId !== action.payload.userId
            ? { ...message, read: true }
            : message
        );
        
        // Update current match if it's the same one
        if (state.currentMatch && state.currentMatch.id === action.payload.matchId) {
          state.currentMatch.messages = state.currentMatch.messages.map(message => 
            message.senderId !== action.payload.userId
              ? { ...message, read: true }
              : message
          );
        }
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setMatches,
  addMatch,
  updateMatch,
  setCurrentMatch,
  acceptMatch,
  rejectMatch,
  addMessage,
  markMessagesAsRead,
} = matchesSlice.actions;

export default matchesSlice.reducer;
