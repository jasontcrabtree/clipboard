import { request } from 'graphql-request';
import useSWR from 'swr';
import { fetcher } from '../lib/utils';

/**
 *
 * @returns {function} JSX Component
 */
// export async function getServerSideProps() {
//   const data = await fetcher('/api/data');
//   return { props: { data } };
// }

/**
 *
 * @returns {function} JSX Component
 */
function AllDailyEntries() {
  // const token = 'hello';
  // const fetchWithToken = 'hello';

  // const { data } = useSWR(['/api/graphql', token], fetchWithToken);

  const { data, error } = useSWR(
    `query getAll {
      articles {
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

  // if (data) console.log(data);

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
