import { apiSlice } from "../../api/apiSlice";

export const assignmentMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: () => "/assignmentMark",
      providesTags: ["AssignmentMarks"],
    }),
  }),
});

export const { useGetAssignmentMarksQuery } = assignmentMarksApi;
