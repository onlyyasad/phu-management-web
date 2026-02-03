import { QueryTagTypes } from "../../../constants/global";
import type { TCourse } from "../../../types/courses.types";
import type {
  TError,
  TErrorResponseRedux,
  TResponseRedux,
} from "../../../types/global.types";
import type { TSemesterRegistration } from "../../../types/semesterRegistration.types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesterRegistrations: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.length) {
          args.forEach((item: Record<string, string>) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params,
        };
      },
      providesTags: [QueryTagTypes.SEMESTER_REGISTRATIONS],
      transformResponse: (
        response: TResponseRedux<TSemesterRegistration[]>,
      ) => {
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
    addSemesterRegistration: builder.mutation({
      query: (payload) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QueryTagTypes.SEMESTER_REGISTRATIONS],
      transformErrorResponse: (errorResponse: TErrorResponseRedux) => {
        const errorRes: TError = {
          success: errorResponse.data.success,
          message: errorResponse.data.message,
        };
        return errorRes;
      },
    }),
    updateSemesterRegistrationStatus: builder.mutation({
      query: (payload) => ({
        url: `/semester-registrations/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: [QueryTagTypes.SEMESTER_REGISTRATIONS],
      transformErrorResponse: (errorResponse: TErrorResponseRedux) => {
        const errorRes: TError = {
          success: errorResponse.data.success,
          message: errorResponse.data.message,
        };
        return errorRes;
      },
    }),
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.length) {
          args.forEach((item: Record<string, string>) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/courses",
          method: "GET",
          params,
        };
      },
      providesTags: [QueryTagTypes.COURSES],
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
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
    addCourse: builder.mutation({
      query: (payload) => {
        return {
          url: "/courses/create-course",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [QueryTagTypes.COURSES],
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
  useGetAllSemesterRegistrationsQuery,
  useAddSemesterRegistrationMutation,
  useUpdateSemesterRegistrationStatusMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
} = courseManagementApi;
