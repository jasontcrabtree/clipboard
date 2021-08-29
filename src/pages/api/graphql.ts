// @ts-check

import { GraphQLClient } from 'graphql-request';
import { API } from '../../lib/utils';

/**
 * API function to safely access GraphQL API with server-side secret protection
 * @param {object} req API Call request object
 * @param {object} res API Call response object
 * @returns {Promise<any>} Returns json object
 */
export default async (req, res) => {
  const graphQLClient = new GraphQLClient(API, {
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': `${process.env.HASURA_SECRET_KEY}`,
    },
  });

  const { query } = req.body;
  const { variables } = req.body;

  const data = await graphQLClient.request(query, variables);

  res.status(200).json({
    data,
  });
};
