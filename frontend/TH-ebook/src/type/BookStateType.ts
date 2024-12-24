export type BookStateType<T> = {
  data: T | null;
  isLoading: boolean;
  errors: string;
};
