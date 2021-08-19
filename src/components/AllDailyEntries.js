/* eslint-disable require-jsdoc */
import { gql, GraphQLClient, request } from 'graphql-request';
import useSWR from 'swr';

const API = 'https://zls-health-app.hasura.app/v1/graphql';

// This chunk of code successfully works, but exposes the HASURA_SECRET in the browser, so is a no go
/* const variables = {};
const headers = {
  'Content-Type': 'application/json',
  //   'x-hasura-admin-secret': `${process.env.NEXT_PUBLIC_HASURA_SECRET_KEY}`,
  'x-hasura-admin-secret': `${process.env.HASURA_SECRET_KEY}`,
};
const fetcher = (query) => request(API, query, variables, headers); */

export function getServerSideProps() {
  console.log('In server land');
  const headers = {
    // 'Content-Type': 'application/json',
    'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_SECRET_KEY,
  };

  console.log(headers);

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

  const variables = {};

  const data = request(API, query, variables, headers);

  console.log(`data:`, data);

  return {
    props: {
      data,
    },
  };
}

// export async function getServerSideProps() {
//   console.log(process.env.HASURA_SECRET_KEY);

//   const graphQLClient = new GraphQLClient(API, {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-hasura-admin-secret': process.env.HASURA_SECRET_KEY,
//     },
//   });

// const query = gql`
//   query getAll {
//     articles {
//       id
//       title
//       content
//       created_at
//     }
//   }
// `;
//   const data = await graphQLClient.request(query);
//   return {
//     props: { data },
//   };
// }

/**
 *
 * @returns {function} JSX Component
 */
function AllDailyEntries() {
  // const fetcher = query => request(API, query, variables, headers);

  const fetcher = (query) => request('/api/graphql', query);

  const { data, error } = useSWR(
    `query getAll {
      articles {
          id
          title
          content
          created_at
      }
      }`,
    fetcher
  );

  console.log(fetcher);

  // const query = gql`
  // query getAll {
  //   articles {
  //     id
  //     title
  //     content
  //     created_at
  //   }
  // }
  // `;

  // const { data, error } = useSWR(
  //   `{
  //     query getAll {
  //     articles {
  //       id
  //       title
  //       content
  //       created_at
  //     }
  //   }
  //   }`,
  //   fetcher
  // );

  // const fetcher = () => request('/api/graphql', query);

  // console.log(fetcher);

  // const { data, error } = useSWR('/api/graphql', fetcher);

  // console.log(data, error);

  console.log(data);

  if (error) return <div>failed to load</div>;

  if (!data) return <div>loading...</div>;

  if (data) console.log(data);

  return <div>hello</div>;

  //   if (error) {
  //     console.warn(error);
  //   } else {
  //     console.log(data);
  //   }
}

export default AllDailyEntries;
