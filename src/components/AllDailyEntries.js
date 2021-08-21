import useSWR from 'swr';
import { request } from 'graphql-request';
import { fetcher } from '../lib/utils';

/**
 *
 * @returns {function} JSX Component
 */
function AllDailyEntries({ limit = 1 }) {
  const ALL_ARTICLES_PAGINATED = `query ALL_ARTICLES_PAGINATED($limit: Int = 4) {
    articles(limit: $limit, order_by: {created_at: desc}) {
      id
      title
      content
    }
  }`;

  // const { data, error } = useSWR(
  //   `query ALL_ARTICLES_PAGINATED {
  //       articles {
  //         id
  //         title
  //         content
  //       }
  //     }`,
  //   fetcher
  // );

  // Working stats
  // const { data, error } = useSWR(
  //   `query getAll {
  //     articles {
  //       id
  //       title
  //       content
  //     }
  //   }`,
  //   fetcher
  // );

  // const variables = { limit: 10 };
  // const paginateFetcher = (query) => request('/api/paginate', query, variables);
  const paginateFetcher = (query) => request('/api/paginate', query);

  // const { data, error } = useSWR(
  //   [
  //     `query getAll($limit: Int = 4) {
  //     articles(limit: $limit}) {
  //       id
  //       title
  //       content
  //     }
  //   }`,
  //     { limit: 10 },
  //   ],
  //   paginateFetcher
  // );

  // Don’t do this! Deps will be changed on every render.
  // useSWR(['/api/user', { id }], query);

  // Instead, you should only pass “stable” values.
  // useSWR(['/api/user', id], (url, id) => query(url, { id }));

  /*  const {
    data,
    error,
  } = useSWR( // useSWR([`query getAll($limit: Int = 4) {
       articles(limit: $limit}) {
         id
         title
         content}
        }`,
      { limit: 10 },
  ], (url, id) => query(url, { id })); */

  //   [
  //     `query getAll($limit: Int = 4) {
  //     articles(limit: $limit}) {
  //       id
  //       title
  //       content
  //     }
  //   }`,
  //     { limit: 10 },
  //   ],
  //   paginateFetcher
  // );

  // const { data, error } = useSWR([ALL_ARTICLES_PAGINATED], paginateFetcher);

  // This is probably incorrect. Because we are using API routes to securely access data (via the fetcher function), and I don't want to change the graphql endpoint for each function, we need to change the query client side, not pass in variables, for SWR, I guess? This is the only way I can get it to work for SWR at least.
  const { data, error } = useSWR(
    `query getAll {
      articles(limit: ${limit}, order_by: {created_at: desc}) {
        id
        title
        content
      }
    }`,
    fetcher
  );

  if (error) {
    console.warn(error);
    return <div>Failed to load due to error {error}</div>;
  }

  if (!data) return <div>Loading</div>;

  return (
    <ul className="flex flex-col gap-4 mb-4">
      {data?.articles?.map((article) => (
        <li
          className="p-2 border border-gray-200 bg-white rounded shadow-md"
          key={article.id}
        >
          <h3 className="font-semibold">{article.title}</h3>
          <p>{article.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default AllDailyEntries;
