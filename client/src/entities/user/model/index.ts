export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};
