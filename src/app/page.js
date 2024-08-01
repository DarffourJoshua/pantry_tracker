'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {lusitana} from './ui/fonts'
import Image from 'next/image';
import PantryLogo from './ui/pantry-logo';
import { useAuth } from './firebase/authContext';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { useRouter } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

export default function Page() {
  const { googleSignIn} = useAuth();
  const router = useRouter();

  const handleSignIn = async() => {
    try {
      await googleSignIn();
      router.push('/pantryList');
    } catch(err) {
      console.log(err)
    }
  }
  
  return (
    
      <main className="flex min-h-screen flex-col p-6"> 
        <div className={`
          flex h-20 shrink-0 
          items-end rounded-lg bg-orange-500 p-4 md:h-52`}>
          <PantryLogo />
        </div>
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg 
                bg-orange-50 px-6 py-10 md:w-2/5 md:px-20">
            <p className={` ${lusitana.className} text-xl text-gray-800 md:text-3xl 
                md:leading-normal`}>
              <strong>Welcome to Urban Pantry Tracker.</strong> This is a webapp {' '}
              to keep track of your pantry items and their expiration dates.
            </p>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start 
                rounded-lg bg-orange-500 px-6 py-3 text-sm 
                font-medium text-white transition-colors 
                hover:bg-blue-400 md:text-base
              "
            >
              <span> LogIn</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
            <div className={`border-2 text-gray-800 rounded-lg border-solid 
              py-5 gap-5 flex items-center cursor-pointer hover:bg-orange-100`}            
              onClick={handleSignIn}
            >
              <p className="text-sm  ml-auto">
                Sign in with Google 
              </p>
              <FontAwesomeIcon icon={faGoogle} className='mr-auto'/>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-24 md:py-10 bg-orange-50 rounded-lg">
            {/* Add Hero Images Here */}
            <Image
              src="https://thepantryrestaurant.com/wp-content/uploads/2020/06/better-pantry-logo-1.png"
              width={1500}
              height={1000}
              className="hidden md:block"
              style={{ objectFit: 'cover'}}
              alt="Screenshots of the dashboard project showing desktop version"
            />
            {/* Adding the mobile hero app here */}
            <Image 
              src="https://thepantryrestaurant.com/wp-content/uploads/2020/06/better-pantry-logo-1.png"
              width={660}
              height={520}
              className='block md:hidden'
              alt="Screenshots of the dashboard project showing mobile version"
            />
          </div>
        </div>
      </main>
    
  );
}