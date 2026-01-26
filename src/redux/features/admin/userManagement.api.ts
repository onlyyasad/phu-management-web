import type {
  TError,
  TErrorResponseRedux,
  TResponseRedux,
} from "../../../types/global.types";
import type { TStudent } from "../../../types/student.types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.length) {
          args.forEach((item: Record<string, string>) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        const responseData = {
          data: response.data,
          meta: response.meta,
        };
        return responseData;
      },
      transformErrorResponse: (errorResponse: TErrorResponseRedux) => {
        const errorRes: TError = {
          success: errorResponse.data.success,
          message: errorResponse.data.message,
        };
        return errorRes;
      },
    }),
    addStudent: builder.mutation({
      query: (payload) => ({
        url: "/users/create-student",
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: (errorResponse: TErrorResponseRedux) => {
        const errorRes: TError = {
          success: errorResponse.data.success,
          message: errorResponse.data.message,
        };
        return errorRes;
      },
    }),
  }),
});

export const { useGetAllStudentsQuery, useAddStudentMutation } =
  userManagementApi;
