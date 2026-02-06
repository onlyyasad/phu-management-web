import { QueryTagTypes } from "../../../constants/global";
import type {
  TError,
  TErrorResponseRedux,
  TResponseRedux,
} from "../../../types/global.types";
import type { TMyEnrolledCourse } from "../../../types/myEnrolledCourse.types";
import type { TMyOfferedCourse } from "../../../types/offeredCourse.types";
import { baseApi } from "../../api/baseApi";

const studentCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.length) {
          args.forEach((item: Record<string, string>) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params,
        };
      },
      providesTags: [QueryTagTypes.MY_OFFERED_COURSES],
      transformResponse: (response: TResponseRedux<TMyOfferedCourse[]>) => {
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
    getMyEnrolledCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.length) {
          args.forEach((item: Record<string, string>) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/enrolled-courses/my-enrolled-courses",
          method: "GET",
          params,
        };
      },
      providesTags: [QueryTagTypes.MY_ENROLLED_COURSES],
      transformResponse: (response: TResponseRedux<TMyEnrolledCourse[]>) => {
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
    enrollInCourse: builder.mutation({
      query: (payload) => {
        return {
          url: "/enrolled-courses/create-enrolled-course",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [QueryTagTypes.MY_OFFERED_COURSES],
    }),
  }),
});

export const {
  useGetMyOfferedCoursesQuery,
  useEnrollInCourseMutation,
  useGetMyEnrolledCoursesQuery,
} = studentCourseManagementApi;
