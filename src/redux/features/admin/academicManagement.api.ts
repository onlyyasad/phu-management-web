import type { TAcademicSemesterResponse } from "../../../types/academicSemester.types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
      transformResponse: (response) => {
        const responseData: TAcademicSemesterResponse = {
            data: response.data,
            meta: response.meta,
        }
        return responseData;
      }
    }),
    addAcademicSemester: builder.mutation({
      query: (payload) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetAllSemestersQuery, useAddAcademicSemesterMutation } =
  academicManagementApi;
