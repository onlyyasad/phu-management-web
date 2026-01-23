export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TResponse = {
    success: boolean;
    message: string;
    data?: Record<string, any> | Record<string, any>[];
}
