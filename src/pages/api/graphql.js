import request, { gql } from 'graphql-request';

const API = 'https://zls-health-app.hasura.app/v1/graphql';

export default async (req, res) => {
  const variables = {};

  const headers = {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': `${process.env.HASURA_SECRET_KEY}`,
  };

  // const fetcher = (query) => request(API, query, variables, headers);

  const query = gql`
    query getAll {
      articles {
        id
        title
        content
        created_at
      }
    }
  `;

  const data = await request(API, query, variables, headers);

  res.status(200).json({
    data,
  });
};
