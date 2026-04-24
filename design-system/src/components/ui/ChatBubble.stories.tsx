import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { ChatBubble } from './ChatBubble';
import { colors, spacing } from '../../tokens';

const meta: Meta<typeof ChatBubble> = {
  title:     'UI/ChatBubble',
  component: ChatBubble,
  decorators: [
    (Story) => (
      <View style={{ width: 360, padding: spacing.xxxs, backgroundColor: colors.bgSubtle, gap: 4 }}>
        <Story />
      </View>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const Mine: Story = {
  args: { isMine: true, text: 'Hey, what should I cook tonight?', status: 'seen', timestamp: '9:41 AM' },
};

export const Theirs: Story = {
  args: {
    isMine:          false,
    text:            'How about chicken stir-fry? You have all the ingredients.',
    showAvatar:      true,
    avatarInitials:  'AI',
    timestamp:       '9:41 AM',
  },
};

export const Sending: Story = {
  args: { isMine: true, text: 'Sounds great!', status: 'sending' },
};

export const Failed: Story = {
  args: { isMine: true, text: 'Message failed to send.', status: 'failed' },
};

export const Typing: Story = {
  args: { isMine: false, type: 'typing', showAvatar: true, avatarInitials: 'AI' },
};

export const Conversation: Story = {
  render: () => (
    <View style={{ width: 360, padding: spacing.xxxs, backgroundColor: colors.bgSubtle, gap: 4 }}>
      <ChatBubble isMine={false} text="Hi! What's in your pantry today?" showAvatar avatarInitials="AI" timestamp="9:40 AM" />
      <ChatBubble isMine text="Chicken, rice, garlic, and some veggies." status="seen" timestamp="9:40 AM" />
      <ChatBubble isMine={false} text="Perfect! I can suggest a few recipes with that." showAvatar avatarInitials="AI" timestamp="9:41 AM" />
      <ChatBubble isMine text="Please do!" status="delivered" timestamp="9:41 AM" />
      <ChatBubble isMine={false} type="typing" showAvatar avatarInitials="AI" />
    </View>
  ),
};
