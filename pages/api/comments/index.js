import { NextRequest, NextResponse } from "next/server";
import { GraphQLClient, gql } from "graphql-request";

const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;
const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTg5MzAwMzAsImF1ZCI6WyJodHRwczovL2FwaS1hcC1ub3J0aGVhc3QtMS5oeWdyYXBoLmNvbS92Mi9jbDVnanBkdjk0MGpjMDF0Nzl4amJmdnE1L21hc3RlciIsIm1hbmFnZW1lbnQtbmV4dC5ncmFwaGNtcy5jb20iXSwiaXNzIjoiaHR0cHM6Ly9tYW5hZ2VtZW50LmdyYXBoY21zLmNvbS8iLCJzdWIiOiJjMTYxYWFlMy1mZmUzLTRkY2YtYWJkYi1jYmRjZTY3NTQ2YmUiLCJqdGkiOiJjbDYzbzN2ZmI3M3BnMDF1dGQ5dGc3dDBrIn0.IZSqapQZP7eEVgkWgeX8mVfHynIbMDXQuqJsMG_lO9xMJZfzPVQwL5koOvhFzNsbgqeiTXVWwhenmoIzk3g0mH_VOd5nhSQXjHD6bOrcFi3SR9doy2Et1BBTk3EKPu-0HA2gyvyKAIIcRfB6jcNtliBhu7MxedhfhoyP8tmbRdFfoyVvNT2FHS21oPrmug9MrLMB7Y9tdNzv4-1DKY0hdnKE_90-C6AHZUzmigYCrh9EUrQa554g-AQwRFPkCrPGiFu7snpnpiz_UNzG9QvJ6-G3UYvGENpgmmoYcrrePQczXVX9hKRVpwyeCzFeQj0vXaJ_xPhDxPbfA86zq2GCISJ8ykgSYEwiiy2EyugWSPxMSdWUtCfhTToQHwMkYXv4VN-GThdU60R_gnz5Kkqz6z_ueB9EZs_CQMVJW90Lww1rXRvfkwgKQJObR6kCy9lcuXZILAFMSuwsgSThrxz_OWZKCT7Q8PLPCjNMFzWOHnJQ8s4jDNqWXWQZEwNXT5PqtquA7ducm7fIBdUxSjQj1T-p96R5sHUbdGuHTYbwz8-aP34cA0ShCpAS5igB3M2UQDJd_-ThI2nk6cUnTQzRbMPcyWADgExZdCAXxv4wR0qe-8Tzfxn4n_8rVZhSpt5RoMeM9RbleSfYN_kZSZqzVjjjz8U6pzMDgJ2l8cE96yg";

export default async function commentHandler(req, res) {
  const graphAPI = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          slug: $slug
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  const result = await graphAPI.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
  });

  return res.status(200).send(result);
}
