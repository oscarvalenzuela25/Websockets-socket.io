import { Message, User } from './auth';

// on
export type OnEvents = {
  'list-users': (users: User[]) => void;
  'personal-message': (message: Message) => void;
};

// emit
export type EmitEvents = {
  'personal-message': ({
    from,
    to,
    message,
  }: {
    from: string;
    to: string;
    message: string;
  }) => void;
};
