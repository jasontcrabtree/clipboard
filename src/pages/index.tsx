// import AllEntries from '../components/AllEntries';
import KBShortcutsTooltip from '../components/KBShortcutsTooltip';
import UserDailyEntries from '../components/UserDailyEntries';

interface NewType {
  props: {
    data: object;
  };
}

// eslint-disable-next-line require-jsdoc
export async function getServerSideProps(): Promise<NewType> {
  const userQuery = `query findUser { users(where: {id: {_eq: "26457118"}})
        { id, user_id }}`;

  const res = await fetch(process.env.GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query: userQuery }),
  });

  const data = await res.json().catch((error) => console.log(error));

  return { props: { data } };
}

/**
 * Homepage component, shows HTML on the index page. Each component has it's own self contained logic.
 * @param {object} data any any
 * @returns {function} JSX Stateless Component
 */
export default function Home(data: any): JSX.Element {
  const user = data?.data?.data?.users[0].user_id;

  return (
    <section className="flex flex-col w-full gap-8">
      <h1 className="font-bold text-4xl text-center pt-8 pb-2 mb-8 text-blue-400">
        Clipboard
      </h1>
      {/* <AllDailyEntries limit={3} /> */}
      {/* <UserDailyEntries userId={`123`} /> */}
      {user.length > 1 ? (
        <UserDailyEntries userId={user} />
      ) : (
        <div>Log in to view data</div>
      )}
      {/* <AllEntries /> */}
      {/* <KBShortcutsTooltip /> */}
    </section>
  );
}
