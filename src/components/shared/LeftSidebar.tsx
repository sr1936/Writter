import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { INavLink } from '@/types';
import { sidebarLinks } from '@/constants';
import { Button } from '../ui/button'


const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])
  return (
    <nav className='leftsidebar '>
      <div className="flex flex-col gap-10 ">
        <Link to='/' className='flex gap-3 items-center'>
          <img
            src='/public/assets/images/logo.svg'
            alt='logo'
            width={160}
            height={26} />
        </Link>
        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img src={user.imageUrl || '/public/assets/icons/profile-placeholder.svg'} alt="profile" className='h-11 w-11 rounded-full' />
          <div className='flex flex-col '>
            <p className='body-bold'>
              {user.name}
            </p>
            <p className='small-regular text-light-3'>
              @{user.username}
            </p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>


      <Button variant='ghost'  className='shad-button_ghost ' onClick=  {() => signOut()}>
        <img src='/public/assets/icons/logout.svg' alt='logout' />
        <p className='small-medium lg:base-medium'> Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar