import AddNewArticle from '../components/AddNewArticle';

/**
 * New daily entry JSX page level component. Each component has it's own self contained logic.
 * @returns {function} JSX Stateless Component
 */
export default function Home() {
  return (
    <section className="flex flex-col w-full gap-8">
      <h1 className="font-bold text-4xl text-center pt-8 pb-2 mb-8">
        Clipboard
      </h1>
      <AddNewArticle />
    </section>
  );
}
