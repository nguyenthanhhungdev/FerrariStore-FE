export type UserStateType<T> = {
  data: T | null;
  isLogin: boolean;
  errors: string;
};
