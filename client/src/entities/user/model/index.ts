export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string | null;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};
