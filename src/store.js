import { configureStore } from '@reduxjs/toolkit';

import authReducer from './modules/auth/authSlice';
import jobsReducer from './modules/jobs/jobsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
  },
});

export default store;
