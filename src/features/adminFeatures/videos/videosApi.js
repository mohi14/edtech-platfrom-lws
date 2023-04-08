import { apiSlice } from "../../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      providesTags: ["Videos"],
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
    updateVideo: builder.mutation({
      query: ({ id, editData }) => ({
        url: `/videos/${id}`,
        method: "PUT",
        body: editData,
      }),
      invalidatesTags: ["Videos"],
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
  }),
});

export const {
  useGetVideosQuery,
  useAddVideoMutation,
  useDeleteVideoMutation,
  useUpdateVideoMutation,
  useGetVideoQuery,
} = videosApi;
