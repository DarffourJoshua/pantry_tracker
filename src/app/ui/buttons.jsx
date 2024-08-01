import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import { deleteInvoice } from './item/createItem';


// CreateInvoice component
export function CreatePantry() {
  return (
    <Link
      href="/dashboard/createItem"
      className="flex h-10 items-center rounded-lg bg-orange-600 
        px-4 text-sm font-medium text-white transition-colors 
        hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-orange-600"
    >
      <span className="hidden md:block">Add Item</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

// UpdateInvoice component
export function UpdatePantry({ id }) {
  return (
    <Link
      href={``}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}


// DeleteInvoice component
export function DeletePantry( {id, handleClick} ) {
  return (
    <>
      <button className="rounded-md border p-2 hover:bg-gray-100"  onClick={() => handleClick(id)}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}