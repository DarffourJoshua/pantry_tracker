'use client';

import Link from 'next/link';
import NavLinks from './nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import PantryLogo from './pantry-logo';
import { useAuth } from '../firebase/authContext';
import { useRouter } from 'next/navigation';


export default function SideNav() {
  const router = useRouter()
  const {logOut} = useAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/');
    } catch(err) {
      console.log(err)
    }
  }
  return (
    <div className="flex bg-white h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-orange-500 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <PantryLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        
          <button className="flex h-[48px] w-full grow items-center 
          justify-center gap-2 rounded-md bg-gray-50 p-3 
          text-sm font-medium hover:bg-sky-100 
          hover:text-orange-600 md:flex-none 
          md:justify-start md:p-2 md:px-3 text-black" onClick={handleSignOut}>
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
      </div>
    </div>
  );
}

/**
 * action={async () => {
          'use server';
          await signOut();
        }}
 */