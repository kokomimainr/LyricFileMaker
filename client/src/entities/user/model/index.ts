export type User = {
  id: number;
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
