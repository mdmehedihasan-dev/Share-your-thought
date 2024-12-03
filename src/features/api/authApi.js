/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        headers.set("Authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth",
        method: "POST",
        body,
      }),
    }),
    loggedIn: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body,
      }),
    }),
    verifiedUser: builder.mutation({
      query: ({ token, userToken }) => ({
        url: "/api/v1/auth/activate",
        method: "POST",
        body: { token },
        // headers: {
        //   Authorization: `Bearer ${userToken}`,
        // },
      }),
    }),
    reVerificition: builder.mutation({
      query: (token) => ({
        url: "/api/v1/auth/reverification",
        method: "POST",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
    }),
    matchUser: builder.mutation({
      query: (email) => ({
        url: "/api/v1/auth/resetpassword",
        method: "POST",
        body: { email },
      }),
    }),
    sendCode: builder.mutation({
      query: (email) => ({
        url: "/api/v1/auth/resetcode",
        method: "POST",
        body: { email },
      }),
    }),
    verifyCode: builder.mutation({
      query: ({ email, code }) => ({
        url: "/api/v1/auth/verifyresetcode",
        method: "POST",
        body: { email, code },
      }),
    }),
    changePassword: builder.mutation({
      query: ({ email, password }) => ({
        url: "/api/v1/auth/changepassword",
        method: "POST",
        body: { email, password },
      }),
    }),
    createPost: builder.mutation({
      query: ({ type, images, text, background, user }) => ({
        url: "/api/v1/posts/createpost",
        method: "POST",
        body: { type, images, text, background, user },
      }),
      transformResponse: (response) => ({
        status: "done",
        data: response,
      }),
    }),
    uploadImage: builder.mutation({
      query: ({ formData }) => ({
        url: "/api/v1/upload/uploadimage",
        method: "POST",
        body: formData,
      }),
    }),
    getAllPosts: builder.query({
      query: () => "/api/v1/posts/getallposts",
    }),
    getAllUser: builder.query({
      query: (userName) => `/api/v1/auth/getuser/${userName}`,
    }),
    listImage: builder.mutation({
      query: ({ path, sort, max }) => ({
        url: "/api/v1/upload/listimage",
        method: "POST",
        body: { path, sort, max },
      }),
    }),

    uploadProfilePhoto: builder.mutation({
      query: ({ url }) => ({
        url: "/api/v1/auth/updateProfilePhoto",
        method: "PUT",
        body: { url },
      }),
      transformResponse: (response) => ({
        status: "done",
        data: response,
      }),
    }),

    uploadCoverPhoto: builder.mutation({
      query: ({ url }) => ({
        url: "/api/v1/auth/updatecoverphoto",
        method: "PUT",
        body: { url },
      }),
      transformResponse: (response) => ({
        status: "done",
        data: response,
      }),
    }),

    updateDetails: builder.mutation({
      query: ({ infos }) => ({
        url: "/api/v1/auth/updatedetails",
        method: "PUT",
        body: { infos },
      }),
    }),

    addFriend: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/addfriend/${id}`,
        method: "PUT",
      }),
    }),
    cancelRequest: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/cancelrequest/${id}`,
        method: "PUT",
      }),
    }),
    follow: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/follow/${id}`,
        method: "PUT",
      }),
    }),
    unFollow: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/unfollow/${id}`,
        method: "PUT",
      }),
    }),
    acceptRequest: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/acceptrequest/${id}`,
        method: "PUT",
      }),
    }),
    unFriend: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/unfriend/${id}`,
        method: "PUT",
      }),
    }),
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/deleterequest/${id}`,
        method: "PUT",
      }),
    }),
    getAllFriendsList: builder.query({
      query: () => `/api/v1/auth/getallfriends`,
    }),
    searchQuery:builder.mutation({
      query:(searchTrem)=>({
        url:`/api/v1/auth/search/${searchTrem}`,
        method:"POST"
      })
    })



  }),
});

export const {
  useAddUserMutation,
  useLoggedInMutation,
  useVerifiedUserMutation,
  useReVerificitionMutation,
  useMatchUserMutation,
  useSendCodeMutation,
  useVerifyCodeMutation,
  useChangePasswordMutation,
  useCreatePostMutation,
  useUploadImageMutation,
  useGetAllPostsQuery,
  useGetAllUserQuery,
  useListImageMutation,
  useUploadProfilePhotoMutation,
  useUploadCoverPhotoMutation,
  useUpdateDetailsMutation,
  useAcceptRequestMutation,
  useAddFriendMutation,
  useCancelRequestMutation,
  useFollowMutation,
  useUnFollowMutation,
  useDeleteRequestMutation,
  useUnFriendMutation,
  useGetAllFriendsListQuery,
  useSearchQueryMutation,
} = authApi;
