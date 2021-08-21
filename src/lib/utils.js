import request from 'graphql-request';

export const API = 'https://zls-health-app.hasura.app/v1/graphql';

export const fetcher = (query) => request('/api/graphql', query);
