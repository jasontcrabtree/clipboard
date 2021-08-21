import Link from 'next/link';
import { HiChartBar, HiHome, HiPlusCircle } from 'react-icons/hi';

/**
 * JSX component to display page navigation optons
 * @returns {function} JSX Stateless Component
 */
function PrimaryNav() {
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
      </ul>
    </nav>
  );
}

export default PrimaryNav;
