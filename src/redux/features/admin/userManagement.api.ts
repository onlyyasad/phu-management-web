import { QueryTagTypes } from "../../../constants/global";
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
      providesTags: [QueryTagTypes.STUDENTS],
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
    getStudentById: builder.query({
      query: ({ studentId }) => {
        return {
          url: `/students/${studentId}`,
          method: "GET",
        };
      },
      providesTags: (_result, _error, { studentId }) => [
        { type: QueryTagTypes.STUDENTS, id: studentId },
      ],
      transformResponse: (response: TResponseRedux<TStudent>) => {
        const responseData = {
          data: response.data,
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
      invalidatesTags: [QueryTagTypes.STUDENTS],
      transformErrorResponse: (errorResponse: TErrorResponseRedux) => {
        const errorRes: TError = {
          success: errorResponse.data.success,
          message: errorResponse.data.message,
        };
        return errorRes;
      },
    }),
    editStudent: builder.mutation({
      query: ({ payload, studentId }) => {
        return {
          url: `/students/${studentId}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: (_result, _error, { studentId }) => [
        { type: QueryTagTypes.STUDENTS, id: studentId },
        { type: QueryTagTypes.STUDENTS },
      ],
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

export const {
  useGetAllStudentsQuery,
  useAddStudentMutation,
  useGetStudentByIdQuery,
  useEditStudentMutation,
} = userManagementApi;
