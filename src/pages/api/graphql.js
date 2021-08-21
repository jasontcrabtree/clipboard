import request, { gql, GraphQLClient } from 'graphql-request';
import { API } from '../../lib/utils';

export default async (req, res) => {
  /*   //  Method One: Passing Headers in each Request
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
  const response = await request(API, query, variables, headers); */

  // Method two: Authentication via HTTP header via GraphQLClient
  const graphQLClient = new GraphQLClient(API, {
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': `${process.env.HASURA_SECRET_KEY}`,
    },
  });

  const apiQuery = req.body.query;

  // console.log(apiQuery);

  console.log(req.body);

  // const queryClient = gql`
  //   query getAll {
  //     articles {
  //       id
  //       title
  //       content
  //       created_at
  //     }
  //   }
  // `;

  // const mutation = gql`
  //   mutation insert_single_articles($object: articles_insert_input!) {
  //     insert_articles_one(object: $object) {
  //       id
  //       title
  //       author
  //     }
  //   }
  // `;

  // const variables = {
  //   object: {
  //     title: '20 Aug New day',
  //     content: 'Post 4, from code!!',
  //     author: 'Jason',
  //   },
  // };

  const { query } = req.body;
  const { variables } = req.body;

  const data = await graphQLClient.request(query, variables);
  // const data = await graphQLClient.request(mutation, variables);
  // const data = await graphQLClient.request(apiClient);

  // console.log('Print:', JSON.stringify(data, undefined, 2));

  res.status(200).json({
    data,
  });
};
