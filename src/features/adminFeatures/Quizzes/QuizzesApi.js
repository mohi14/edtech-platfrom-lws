import { apiSlice } from "../../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => "/quizzes",
      providesTags: ["Quizzes"],
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quizzes"],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizzes"],
    }),
    updateQuiz: builder.mutation({
      query: ({ id, editData }) => ({
        url: `/quizzes/${id}`,
        method: "PUT",
        body: editData,
      }),
      invalidatesTags: ["Quizzes"],
    }),
    getQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useAddQuizMutation,
  useGetQuizQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = quizzesApi;
