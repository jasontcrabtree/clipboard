import Link from 'next/link';
import { HiChartBar, HiHome, HiPlusCircle } from 'react-icons/hi';

/**
 *
 * @returns {function} JSX Stateless Component
 */
function PrimaryNav() {
  return (
    <nav className="bg-yellow-400 p-4 rounded-xl absolute bottom-8 max-w-3xl flex justify-center w-10/12 ml-4">
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
      </ul>
    </nav>
  );
}

export default PrimaryNav;
