import React, { PropsWithChildren } from 'react';
import type { Channel, Mute, StreamChat } from 'stream-chat';
import type { Theme } from '../components/Chat/Chat';
import type { DefaultAttachmentType, DefaultChannelType, DefaultCommandType, DefaultEventType, DefaultMessageType, DefaultReactionType, DefaultUserType } from '../../types/types';
export declare type ChatContextValue<At extends DefaultAttachmentType = DefaultAttachmentType, Ch extends DefaultChannelType = DefaultChannelType, Co extends DefaultCommandType = DefaultCommandType, Ev extends DefaultEventType = DefaultEventType, Me extends DefaultMessageType = DefaultMessageType, Re extends DefaultReactionType = DefaultReactionType, Us extends DefaultUserType<Us> = DefaultUserType> = {
    client: StreamChat<At, Ch, Co, Ev, Me, Re, Us>;
    closeMobileNav: () => void;
    mutes: Mute<Us>[];
    openMobileNav: () => void;
    setActiveChannel: (newChannel?: Channel<At, Ch, Co, Ev, Me, Re, Us>, watchers?: {
        limit?: number;
        offset?: number;
    }, event?: React.BaseSyntheticEvent) => void;
    theme: Theme;
    useImageFlagEmojisOnWindows: boolean;
    channel?: Channel<At, Ch, Co, Ev, Me, Re, Us>;
    navOpen?: boolean;
};
export declare const ChatContext: React.Context<ChatContextValue<DefaultAttachmentType, DefaultChannelType, string & {}, Record<string, unknown>, DefaultMessageType, Record<string, unknown>, DefaultUserType<import("../../types/types").DefaultUserTypeInternal>>>;
export declare const ChatProvider: <At extends DefaultAttachmentType = DefaultAttachmentType, Ch extends DefaultChannelType = DefaultChannelType, Co extends string & {} = string & {}, Ev extends Record<string, unknown> = Record<string, unknown>, Me extends DefaultMessageType = DefaultMessageType, Re extends Record<string, unknown> = Record<string, unknown>, Us extends DefaultUserType<Us> = DefaultUserType<import("../../types/types").DefaultUserTypeInternal>>({ children, value, }: React.PropsWithChildren<{
    value: ChatContextValue<At, Ch, Co, Ev, Me, Re, Us>;
}>) => JSX.Element;
export declare const useChatContext: <At extends DefaultAttachmentType = DefaultAttachmentType, Ch extends DefaultChannelType = DefaultChannelType, Co extends string & {} = string & {}, Ev extends Record<string, unknown> = Record<string, unknown>, Me extends DefaultMessageType = DefaultMessageType, Re extends Record<string, unknown> = Record<string, unknown>, Us extends DefaultUserType<Us> = DefaultUserType<import("../../types/types").DefaultUserTypeInternal>>() => ChatContextValue<At, Ch, Co, Ev, Me, Re, Us>;
/**
 * Typescript currently does not support partial inference so if ChatContext
 * typing is desired while using the HOC withChatContext the Props for the
 * wrapped component must be provided as the first generic.
 */
export declare const withChatContext: <P extends Record<string, unknown>, At extends DefaultAttachmentType = DefaultAttachmentType, Ch extends DefaultChannelType = DefaultChannelType, Co extends string & {} = string & {}, Ev extends Record<string, unknown> = Record<string, unknown>, Me extends DefaultMessageType = DefaultMessageType, Re extends Record<string, unknown> = Record<string, unknown>, Us extends DefaultUserType<Us> = DefaultUserType<import("../../types/types").DefaultUserTypeInternal>>(Component: React.ComponentType<P>) => React.FC<Pick<P, Exclude<keyof P, "client" | "mutes" | "channel" | "navOpen" | "theme" | "useImageFlagEmojisOnWindows" | "closeMobileNav" | "openMobileNav" | "setActiveChannel">>>;
//# sourceMappingURL=ChatContext.d.ts.map