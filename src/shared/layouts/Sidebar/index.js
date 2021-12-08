import classNames from 'classnames';
import style from './style.module.scss';
import { ReactComponent as Logo } from '@assets/icons/logo-white.svg';
import { ActiveLink } from '@shared/partials';
import { useSidebar } from './useSidebar';

const Sidebar = () => {
  const { items } = useSidebar();

  return (
    <div className={classNames('py-8 w-50 bg-secondary', style.sidebar)}>
      <div className="flex-center">
        <Logo className="sidebar-logo text-white" />
      </div>
      <ul className="mt-12 flex flex-col">
        {items?.map((nav, index) => (
          <li className="pl-6 mb-6" key={index}>
            <ActiveLink
              className="py-1 h-full relative flex text-base text-white hover:opacity-80 transition duration-150 ease-in-out"
              activeClassName={classNames('text-primary', style.activeLink)}
              {...nav.action}
            >
              <>
                <div
                  className={classNames('hidden absolute w-1 top-0 bottom-0 bg-primary', style.lineHr)}
                  style={{ left: '-1.5625rem' }}
                />
                <nav.icon width="1.25rem" height="1.25rem" />
                <span className="capitalize pl-5">{nav.label}</span>
              </>
            </ActiveLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar;
