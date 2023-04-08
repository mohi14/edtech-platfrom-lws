import { apiSlice } from "../../api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments",
      providesTags: ["Assignments"],
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Assignments"],
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignments"],
    }),
    updateAssignment: builder.mutation({
      query: ({ id, editData }) => ({
        url: `/assignments/${id}`,
        method: "PUT",
        body: editData,
      }),
      invalidatesTags: ["Assignments"],
    }),
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
  useUpdateAssignmentMutation,
  useGetAssignmentQuery,
} = assignmentsApi;
