export type User = {
  usuario: string;
  is_premium: 0 | 1;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  createUser: (user:string, email: string, password: string) => Promise<void>;
};
