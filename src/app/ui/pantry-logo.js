import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from './fonts';

export default function PantryLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Urban Pantry</p>
    </div>
  );
}