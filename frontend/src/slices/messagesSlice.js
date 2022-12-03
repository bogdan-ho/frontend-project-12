import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData, actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    setMessages: messagesAdapter.setMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        messagesAdapter.addMany(state, messages);
      })
      .addCase(channelsActions.removeChannel, (state, action) => {
        const channelIdForRemove = action.payload;

        const restMessages = Object.values(state.entities)
          .filter(({ channelId }) => channelId !== channelIdForRemove);

        messagesAdapter.setAll(state, restMessages);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
