import axios from "axios";
import { gql, request } from "graphql-request";

const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;

export const getAllPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              profile {
                url
              }
            }
            excerpt
            featuredpost
            slug
            title
            createdAt
            image {
              url
            }
            createdBy {
              id
            }
          }
        }
      }
    }
  `;

  const result = await request(endpoint, query);
  return result.postsConnection.edges;
};

export const getPostCategories = async () => {
  const query = gql`
    query MyQuery {
      categories {
        slug
        category
      }
    }
  `;

  const result = await request(endpoint, query);
  return result.categories;
};

export const getRecentPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection(orderBy: createdAt_DESC, last: 4) {
        edges {
          node {
            author {
              bio
              name
              profile {
                url
              }
            }
            image {
              url
            }
            title
            slug
            excerpt
            createdAt
          }
        }
      }
    }
  `;

  const result = await request(endpoint, query);
  return result.postsConnection.edges;
};

export const getRelatedPosts = async (slug, category) => {
  const query = gql`
    query MyQuery($category: String!, $slug: String!) {
      postsConnection(
        where: { category: { category: $category }, slug_not: $slug }
        last: 4
      ) {
        edges {
          node {
            id
            excerpt
            image {
              url
            }
            title
            slug
            author {
              bio
              name
              profile {
                url
              }
            }
          }
        }
      }
    }
  `;

  const result = await request(endpoint, query, { category, slug });
  return result.postsConnection.edges;
};

export const getDetailPost = async (slug) => {
  const query = gql`
    query MyQuery($slug: String!) {
      post(where: { slug: $slug }) {
        title
        slug
        excerpt
        createdAt
        category {
          category
          slug
        }
        image {
          url
        }
        author {
          name
          profile {
            url
          }
          bio
        }
        content {
          html
        }
      }
    }
  `;

  const result = await request(endpoint, query, { slug });
  return result;
};

export const getCategoriesPosts = async (slug) => {
  const query = gql`
    query MyQuery($slug: String!) {
      category(where: { slug: $slug }) {
        posts {
          author {
            bio
            name
            profile {
              url
            }
          }
          category {
            slug
            category
          }
          excerpt
          featuredpost
          image {
            url
          }
          title
          createdAt
        }
      }
    }
  `;

  const result = await request(endpoint, query, { slug });
  return result.category.posts;
};

export const handleSubmitComment = async (formData) => {
  const reqData = await axios.post(
    `http://localhost:3000/api/comments`,
    formData
  );
  const { data } = reqData;

  return data;
};

export const getCommentsPost = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { slug: $slug }) {
        name
        email
        id
        slug
        comment
      }
    }
  `;

  const result = await request(endpoint, query, { slug });
  return result;
};

export const getFeaturedPosts = () => {
  const query = gql`
    query GetFeaturedPosts {
      postsConnection(where: { featuredpost: true }) {
        edges {
          node {
            author {
              bio
              name
            }
            category {
              category
              slug
            }
            excerpt
            image {
              url
            }
            title
            slug
          }
        }
      }
    }
  `;

  const result = request(endpoint, query);
  return result.postsConnection.edges;
};
