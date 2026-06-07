export type ApiListResponse<T> = {
  data: T[];
  meta: {
    total: number;
  };
};

export type ApiDataResponse<T> = {
  data: T;
};
