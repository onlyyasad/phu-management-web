import { QueryTagTypes } from "../../../constants/global";
import type {
  TError,
  TErrorResponseRedux,
  TResponseRedux,
} from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";
import type {TFacultyCourse} from "../../../types/facultyCourse.types.ts";

const facultyCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFacultyCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.length) {
          args.forEach((item: Record<string, string>) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/enrolled-courses",
          method: "GET",
          params,
        };
      },
      providesTags: [QueryTagTypes.MY_OFFERED_COURSES],
      transformResponse: (response: TResponseRedux<TFacultyCourse[]>) => {
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
    addCourseMarks: builder.mutation({
      query: (payload) => {
        return {
          url: "/enrolled-courses/update-enrolled-course-marks",
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: [QueryTagTypes.MY_OFFERED_COURSES],
    }),
  }),
});

export const { useGetFacultyCoursesQuery, useAddCourseMarksMutation } =
  facultyCourseManagementApi;
