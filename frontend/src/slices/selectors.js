import { channelsAdapter } from './channelsSlice';
import { messagesAdapter } from './messagesSlice';

export const selectModalInfo = (state) => state.modalInfo;
export const selectModalInfoExtra = (state) => selectModalInfo(state).extra;

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const selectCurrentChannelId = (state) => state.channels.currentChannelId;

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
