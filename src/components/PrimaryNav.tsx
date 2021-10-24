import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  HiArchive,
  HiChartBar,
  HiChevronDown,
  HiDotsCircleHorizontal,
  HiHome,
  HiLightBulb,
  HiOutlineCalendar,
  HiOutlinePlusCircle,
  HiOutlineTrash,
  HiPencil,
  HiPencilAlt,
  HiTrash,
  HiUser,
} from 'react-icons/hi';
import { GiExitDoor } from 'react-icons/gi';

/**
 * JSX component to display page navigation optons
 * @returns {function} JSX Stateless Component
 */
function PrimaryNav(): JSX.Element {
  const [session, loading] = useSession();

  if (loading) return null;

  return (
    <nav className="mx-auto bg-blue-500 p-0 rounded-xl max-w-3xl w-112 flex justify-center inset-x-0 bottom-20 fixed shadow-lg z-10 text-gray-900">
      <ul className="flex flex-row justify-center gap-6 w-full flex-wrap flex-nowrap">
        <li>
          <Link href="/">
            <a className="p-4 m-auto flex flex-row justify-center content-center gap-2">
              <HiHome size="24" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/traffic-lights">
            <a className="p-4 m-auto flex flex-row justify-center content-center gap-2">
              <HiLightBulb size="24" />
            </a>
          </Link>
        </li>
        {/* <li>
          <Link href="/new">
            <a className="p-4 m-auto flex flex-row justify-center content-center gap-2">
              <HiPlusCircle size="24" />
            </a>
          </Link>
        </li> */}
        <li>
          <Link href="/new-v2">
            <a className="p-4 m-auto flex flex-row justify-center content-center gap-2">
              <HiOutlinePlusCircle size="24" />
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
        <li>
          <Link href="/calendar">
            <a className="p-4 m-auto flex flex-row justify-center content-center gap-2">
              <HiOutlineCalendar size="24" />
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
          <li>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="p-4 m-auto flex flex-row justify-center content-center gap-2 border-none">
                  <HiDotsCircleHorizontal size="24" />
                </Menu.Button>
              </div>

              <Menu.Items className="absolute bottom-16 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-2 flex flex-col gap-2">
                  <Menu.Item>
                    {({ active }) => (
                      <li className="flex flex-row gap-4 self-center bg-violet-500 text-gray-900 rounded-md items-center w-full px-2  text-sm border-gray-200 bg-gray-100">
                        {session.user.image && (
                          <span
                            style={{
                              backgroundImage: `url(${session.user.image})`,
                            }}
                          />
                        )}
                        <a
                          className="flex flex-row gap-2 w-full h-full py-2"
                          href="/api/auth/signout"
                          onClick={(e) => {
                            e.preventDefault();
                            signOut();
                          }}
                        >
                          <GiExitDoor size="24" />
                          Log Out
                        </a>
                      </li>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? 'bg-violet-500 text-gray-400'
                            : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <HiPencil
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <HiPencilAlt
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        )}
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-2 flex flex-col gap-2">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? 'bg-violet-500 text-gray-400'
                            : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <HiArchive
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <HiArchive
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        )}
                        Archive
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default PrimaryNav;
