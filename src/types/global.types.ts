import type { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  success: boolean;
  message: string;
};

export type TResponse<TData> = {
  success: boolean;
  message: string;
  data?: TData;
  meta?: TMeta;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type TResponseRedux<TData> = {
  success: boolean;
  message: string;
  meta?: TMeta;
  data: TData;
} & BaseQueryApi;

export type TErrorResponseRedux = {
  data: {
    success: boolean;
    message: string;
    stack: string;
    errorSources: Record<string, string>[];
  };
  status: number;
};

export type TQueryParam = {
  name: string;
  value: unknown;
};
