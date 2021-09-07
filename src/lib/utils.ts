import request from 'graphql-request';

export const API = 'https://zls-health-app.hasura.app/v1/graphql';

// export const fetcher = (query, variables) =>
//   request('/api/graphql', query, variables);

export const fetcher = (query: string, variables: object | any): Promise<any> =>
  request('/api/graphql', query, variables);

/* export function fetcher(query: string, variables: object) {
  request('/api/graphql', query, variables);
} */

export const formatDate = function (timestamp: string | number | Date): string {
  // Create a date object from the timestamp
  const date = new Date(timestamp);

  // Create a list of names for the months
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // return a formatted date
  return (
    months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
  );
};
