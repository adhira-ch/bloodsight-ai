import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import avatar from '../art_assets/avatar.png';
import bloodsight from '../art_assets/bloodsight_logo.png';

const navigation = [
  { name: 'Overview', href: '', current: false },
  { name: 'Body Status', href: '#bodystatus', current: false },
  { name: 'Disease Susceptibility', href: '#diseasesusceptibility', current: false },
  { name: 'Exercise & Diet Plan', href: '#exerciseanddiet', current: false },
  { name: 'Detailed Report Analysis', href: '#detailedreport', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavbarDefault() {
  return (
    <Disclosure as="nav" className="bg-four rounded-2xl h-25 shadow-white/[0.1] shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-full px-2 sm:px-8 lg:px-12" style={{ fontSize: '1.5vw' }}>
            <div className="relative flex h-28 items-center justify-between">
              <div className="flex items-center">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <img
                    className='w-25 h-25'
                    src={bloodsight}
                    alt="BloodSight"
                    style={{ width: '120px', height: '120px' }}
                  />
                </div>
                {/* Navigation */}
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-16">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-one text-white' : 'text-[#162939] hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {/* Profile */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-one text-lg focus:outline-none focus:ring-2 focus:ring-one">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">User Menu</span>
                      <img
                        className="h-16 w-16 rounded-full bg-three"
                        src={avatar}
                        alt="Profile"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-3xl bg-three py-1 shadow-2xl ring-1 ring-white ring-opacity-5 focus:outline-none font-vango p-3">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/settings"
                            className={classNames(active ? 'bg-two rounded-full hover:text-white' : '', 'block px-5 py-5 text-lg text-one font-vango hover:text-white rounded-full')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            className={classNames(active ? 'bg-two rounded-full hover:text-white' : '', 'block px-5 py-5 text-lg text-one font-vango hover:text-white rounded-full')}
                          >
                            Log Out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile Menu and Rest of the code remains the same */}
        </>
      )}
    </Disclosure>
  );
}