import { request } from 'graphql-request';
import { useForm } from 'react-hook-form';

/**
 *
 * @returns {function} JSX Component
 */
function AddNewArticle() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = `mutation insert_single_articles($object: articles_insert_input!) {
    insert_articles_one(object: $object) {
      id
      title
      author
    }
  }`;

  const onSubmit = (values) => {
    const variables = { object: values };
    request('/api/graphql', mutation, variables);
    reset({
      title: '',
      author: '',
      content: '',
    });
  };

  return (
    <form
      className="flex flex-col gap-6 rounded min-w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        defaultValue="New Post Title"
        {...register('title')}
        className="p-2 rounded border-gray-300"
        type="text"
      />
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
