export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};
