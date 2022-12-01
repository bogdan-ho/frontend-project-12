/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

export const fetchData = createAsyncThunk(
  'tasks/fetchData',
  async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await axios.get(routes.DataPath(), { headers: { Authorization: `Bearer ${user.token}` } });
    // console.log('res is', res);
    return res.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.setMany,
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.addMany(state, channels);
        state.currentChannelId = currentChannelId;
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
