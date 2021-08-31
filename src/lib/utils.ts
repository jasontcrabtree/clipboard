import request from 'graphql-request';

export const API = 'https://zls-health-app.hasura.app/v1/graphql';

// export const fetcher = (query, variables) =>
//   request('/api/graphql', query, variables);

export const fetcher = (query: string, variables: object): Promise<any> =>
  request('/api/graphql', query, variables);

/* export function fetcher(query: string, variables: object) {
  request('/api/graphql', query, variables);
} */
