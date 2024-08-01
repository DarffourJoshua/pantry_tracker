import Image from 'next/image';
// import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import { UpdatePantry, DeletePantry } from './buttons';


export default function PantryTable({items, handleDelete}) {

return (
    (items.length <= 0) ? <span>No item added yet</span> :(
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-orange-50 p-2 md:pt-0">
        <div className="md:hidden">
            {items.map((item) => (
              <div
                key={item.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className='flex items-center gap-5'>
                      <Image
                        src={item.photo}
                        className=" mb-2"
                        width={80}
                        height={80}
                        alt={`${item.item}'s picture`}
                      />
                    <div className="mb-2 ">
                      {/* <p>{item.name}</p> */}
                      <p className="text-sm text-black-500">{item.item}</p>
                      <p className="text-xl font-medium">
                        {item.qty}
                      </p>
                    </div>
                  </div>
                  
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>BB: {item.bb.slice(5,)}</p>
                  </div>
                  <div className="flex flex-col justify-end gap-2">
                    <UpdatePantry id={item.id}  />
                    <DeletePantry id={item.id} handleClick={handleDelete}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Picture
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Item
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Qty
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Mfg. Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Best Before
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none 
                  [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                  [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.photo}
                        className="rounded"
                        width={128}
                        height={128}
                        alt={`${item.item}'s picture`}
                      />
                      
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.item}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.qty}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.mfgDate}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.bb}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePantry id={item.id}/>
                      <DeletePantry id={item.id}  handleClick={handleDelete}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>)
  );
}