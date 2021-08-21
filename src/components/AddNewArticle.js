import { request, gql, GraphQLClient } from 'graphql-request';

import { useForm } from 'react-hook-form';
import { API } from '../lib/utils';

/**
 *
 * @returns {function} JSX Component
 */
export async function getServerSideProps() {
  const graphQLClient = new GraphQLClient(API, {
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': `${process.env.HASURA_SECRET_KEY}`,
    },
  });

  const mutation = gql`
    mutation insert_single_articles($object: articles_insert_input!) {
      insert_articles_one(object: $object) {
        id
        title
        author
      }
    }
  `;

  const variables = {
    object: {
      title: '20 Aug New day',
      content: 'Post 4, from code!!',
      author: 'Jason',
    },
  };

  const data = await graphQLClient.request(mutation, variables);

  // Pass data to the page via props
  return { props: { data } };
}

/**
 *
 * @returns {function} JSX Component
 */
function AddNewArticle(props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // console.log(props);

  const mutation = `mutation insert_single_articles($object: articles_insert_input!) {
    insert_articles_one(object: $object) {
      id
      title
      author
    }
  }`;

  // request('/api/graphql', query);

  const onSubmit = (values) => {
    console.log(values);

    const variables = { object: values };

    const variablesHC = {
      object: {
        title: '20 Aug New day',
        content: 'Post 6, from code, from component!!',
        author: 'Jason',
      },
    };

    console.log(variables);
    console.log(variablesHC);

    request('/api/graphql', mutation, variables);
  };

  // console.log(watch('title'), watch('author'), watch('content'));

  // const fetcher = (query) => request('/api/graphql', query);

  // const { data, error } = useSWR(
  //   `mutation insert_single_articles($object: articles_insert_input!) {
  //     insert_articles_one(object: $object) {
  //       id
  //       title
  //       author
  //     }
  //   }`,
  //   fetcher
  // );

  // if (error) {
  //   console.warn(error);
  //   return <div>Failed to load due to error {error}</div>;
  // }

  // if (!data) return <div>Loading</div>;

  // if (data) console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      className="flex flex-col gap-6 rounded min-w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* register your input into the hook by invoking the "register" function */}
      <input
        defaultValue="New Post Title"
        {...register('title')}
        className="p-2 rounded border-gray-300"
        type="text"
      />
      {/* include validation with required or other standard HTML validation rules */}
      <input
        defaultValue="Jason"
        {...register('author', { required: true })}
        className="p-2 rounded border-gray-300"
        type="text"
      />
      <input
        defaultValue="New Post Content"
        {...register('content', { required: true })}
        className="p-2 rounded border-gray-300"
        type="text"
      />
      {/* errors will return when field validation fails  */}
      {errors.city && <span>This field is required</span>}
      <input
        className="p-2 border-gray-300 bg-indigo-800 text-gray-100 font-semibold rounded-md"
        type="submit"
        value="Add New"
      />
    </form>
  );
}

export default AddNewArticle;
