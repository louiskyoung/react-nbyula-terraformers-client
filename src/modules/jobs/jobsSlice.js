import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../utils/apiService';

const initialState = {
  list: [],
};

export const postJob = createAsyncThunk('jobs/post', async (data) => {
  const response = await apiService.post('/jobs', data);
  return response.data;
});

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postJob.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
  },
});

export const selectJobsList = (state) => state.jobs.list;

export default jobsSlice.reducer;
