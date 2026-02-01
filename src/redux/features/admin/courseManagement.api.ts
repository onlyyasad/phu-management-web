import { QueryTagTypes } from "../../../constants/global";
import type { TError, TErrorResponseRedux } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useAddSemesterRegistrationMutation } = courseManagementApi;
