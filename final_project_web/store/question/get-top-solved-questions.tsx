const jwt = require("jsonwebtoken");
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

const baseUrl = "";

export const getTopSolvedQuestionsApi = createApi({
  
  reducerPath: "getTopSolvedQuestionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve your access token from wherever it's stored
      const token = localStorage.getItem("token");
      // If we have a token, set the authorization header
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopSolvedQuestions: builder.query({
      query: () => {
        let url = `${URL}/codeSubmission/fetchTopSolvedQuestions`;

        return {
          url: url,
          method: "GET",
        };
      },
    }),

    getSpecificQuestionSubmissionDetail: builder.query({
      query: (param) => {
        const token = localStorage.getItem("token");
        const decodedToken = jwt.decode(token);
        const studentId = decodedToken?.id || null;
        const questionId = param.questionId;
        let url = `${URL}/codeSubmission/submissionPerStudentOnSpecificQuestion/${questionId}/${studentId}`;

        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetTopSolvedQuestionsQuery,
  useGetSpecificQuestionSubmissionDetailQuery,
} = getTopSolvedQuestionsApi;
