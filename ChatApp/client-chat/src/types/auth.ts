export type AuthInfo = {
  uid: string | null;
  checking: boolean;
  logged: boolean;
  name: string | null;
  email: string | null;
  token: string | null;
};

export type User = {
  uid: string;
  name: string;
  email: string;
  online: boolean;
};

export type LoginApiResponse = {
  token: string;
  user: User;
};

export type RegisterApiResponse = {
  token: string;
  user: User;
};

export type RenewApiResponse = {
  token: string;
  user: User;
};

export type Message = {
  _id: string;
  from: string;
  to: string;
  message: string;
  createdAt: Date;
};
