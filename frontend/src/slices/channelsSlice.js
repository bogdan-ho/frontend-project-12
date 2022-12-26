/* eslint-disable no-param-reassign */
import {
  createSlice, createEntityAdapter, createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

export const fetchData = createAsyncThunk(
  'tasks/fetchData',
  async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const res = await axios.get(routes.DataPath(), { headers: { Authorization: `Bearer ${user.token}` } });
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    setChannels: channelsAdapter.setMany,
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    updateChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.addMany(state, channels);
        state.currentChannelId = currentChannelId;
      })
      .addCase(fetchData.rejected, (state, action) => {
        if (action.error.message === 'AxiosError: Request failed with status code 401') {
          localStorage.removeItem('user');
          window.location.reload();
        }
      });
  },
});

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const selectCurrentChannelId = (state) => state.channels.currentChannelId;

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
