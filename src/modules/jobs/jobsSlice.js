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

export const showInterest = createAsyncThunk('jobs/mark', async (id) => {
  const response = await apiService.patch(`/jobs/${id}/mark`);
  return response.data;
});

export const updateOrder = createAsyncThunk(
  'jobs/updateOrder',
  async (data) => {
    const { sourceId, targetId: id } = data;
    const response = await apiService.patch(`/jobs/${sourceId}/updateOrder`, {
      id,
    });
    return response.data;
  }
);

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
    builder.addCase(showInterest.fulfilled, (state, { payload }) => {
      const index = state.list.findIndex((job) => job.id === payload.id);
      state.list.splice(index, 1, { ...payload });
    });
    builder.addCase(updateOrder.fulfilled, (state, { payload }) => {
      state.list = [...payload];
    });
  },
});

export const selectJobsList = (state) => state.jobs.list;

export default jobsSlice.reducer;
