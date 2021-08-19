import { request } from 'graphql-request';
import useSWR from 'swr';

/**
 *
 * @returns {function} JSX Component
 */
function AllDailyEntries() {
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

  if (error) {
    console.warn(error);
  } else {
    console.log(data);
  }

  if (error) return <div>Failed to load due to error {error}</div>;

  if (!data) return <div>Loading</div>;

  if (data) console.log(data);

  return (
    <div>
      {data?.articles?.map((article) => (
        <p key={article.id}>
          {article.title}, {article.created_at}, {article.content}
        </p>
      ))}
    </div>
  );
}

export default AllDailyEntries;
