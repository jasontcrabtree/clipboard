import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { HiChartBar, HiHome, HiPlusCircle, HiUser } from 'react-icons/hi';
import { GiExitDoor } from 'react-icons/gi';

/**
 * JSX component to display page navigation optons
 * @returns {function} JSX Stateless Component
 */
function PrimaryNav() {
  const [session, loading] = useSession();

  return (
    <nav className="mx-auto bg-yellow-400 p-0 rounded-xl max-w-md w-96 flex justify-center inset-x-0 bottom-20 fixed shadow-lg">
      <ul className="flex flex-row justify-center gap-6 w-full">
        <li>
          <Link href="/">
            <a className="p-4 m-auto flex flex-row justify-center content-center gap-2">
              <HiHome size="24" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/new">
            <a className="p-4 m-auto flex flex-row justify-center content-center gap-2">
              <HiPlusCircle size="24" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <a className="p-4 m-auto flex flex-row justify-center content-center gap-2">
              <HiChartBar size="24" />
            </a>
          </Link>
        </li>

        {!session && (
          <li className="flex self-center font-semibold">
            <a
              href="/api/auth/signin"
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <HiUser size="24" />
            </a>
          </li>
        )}
        {session && (
          <li className="flex flex-row gap-4 self-center">
            {session.user.image && (
              <span style={{ backgroundImage: `url(${session.user.image})` }} />
            )}
            <a
              href="/api/auth/signout"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              <GiExitDoor size="24" />
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default PrimaryNav;
