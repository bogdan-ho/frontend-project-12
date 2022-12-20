import { channelsAdapter } from './channelsSlice';
import { messagesAdapter } from './messagesSlice';

export const selectModalInfo = (state) => state.modalInfo;
export const selectModalInfoExtra = (state) => selectModalInfo(state).extra;

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const selectCurrentChannelId = (state) => state.channels.currentChannelId;

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);

export const getCurrentChannelMessages = (state) => {
  const { currentChannelId } = state.channels;
  const messageIds = state.messages.ids;
  const messages = messageIds.map((id) => state.messages.entities[id]);
  const currentChannelMessages = messages
    .filter((message) => message.channelId === currentChannelId);

  return currentChannelMessages;
};
