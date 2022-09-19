import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../utils/apiService';

const initialState = {
  list: [],
};

export const postJob = createAsyncThunk('jobs/post', async (data) => {
  const response = await apiService.post('/jobs', data);
  return response.data;
});

export const fetchJobs = createAsyncThunk('jobs/fetch', async () => {
  const response = await apiService.get('/jobs');
  return response.data;
});

export const archiveJob = createAsyncThunk('jobs/archive', async (id) => {
  await apiService.delete('/jobs/' + id);
  return id;
});

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postJob.fulfilled, (state, { payload }) => {
      state.list.push(payload);
    });
    builder.addCase(fetchJobs.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
    builder.addCase(archiveJob.fulfilled, (state, { payload: id }) => {
      const index = state.list.findIndex((job) => job.id === id);
      state.list.splice(index, 1);
    });
  },
});

export const selectJobsList = (state) => state.jobs.list;

export default jobsSlice.reducer;
