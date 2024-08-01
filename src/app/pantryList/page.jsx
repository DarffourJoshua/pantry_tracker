'use client';

import { query, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import {db} from '../firebase/config';
import { useEffect, useState } from 'react';
import { CardWrapper } from '../ui/card';
import PantryTable from '../ui/table';
// import { Suspense } from 'react';
// import { CardsSkeleton, TableRowSkeleton } from '../ui/skeletons';
import { CreatePantry } from '../ui/buttons';
import Search  from '../ui/search';
import { useAuth } from '../firebase/authContext';
import { useRouter } from 'next/navigation';


// UI to render items from the databas

//calc the total items add
export default function Page() {
    const {user} = useAuth();
    const router = useRouter();
    const [totalItems, setTotalItems] = useState(0);
    const [expiredItems, setExpiredItems] = useState(0);
    const [nonExpiryItems, setNonExpiryItems] = useState(0);
    const [pantryLists, setPantryLists] = useState([]);
    
    //Redirect to login page if user is not logged in
    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [router, user]);

    useEffect(() => {
        const readPantry = async () => {
            const snapShot = query(collection(db, 'items'));
            const pantryDocs = await getDocs(snapShot);
            const pantryList = [];
            pantryDocs.forEach(doc => {
                pantryList.push({...doc.data(), id: doc.id});
            })
            setPantryLists(pantryList);
        }
        readPantry();
    }, [])

    useEffect(()=>{
        //Getting today's date
        const date = new Date();
        const todaysDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

        //calculate the total qty of the pantry
        const calTotalItems = () => {
            const overallItems = pantryLists.reduce((sum, item) => sum + parseFloat(item.qty), 0);
            setTotalItems(overallItems)
        }
        //calculate the expired items
        const expiryItems = () => {
            let filteredItems = pantryLists.filter(item => item.bb === todaysDate);
            const overallItems = filteredItems.reduce((sum, item) => sum + parseFloat(item.qty), 0);
            setExpiredItems(overallItems);
        }

        //calculate the non expiry items
        const nonExpiryItem = () => {
            let filteredItems = pantryLists.filter(item => item.bb !== todaysDate);
            const overallItems = filteredItems.reduce((sum, item) => sum + parseFloat(item.qty), 0);
            setNonExpiryItems(overallItems);
        }

        calTotalItems();
        expiryItems();
        nonExpiryItem();

    }, [pantryLists])

    //Delete Item
    const delItem = async (id) => {
        await deleteDoc(doc(db, 'items', id));
        setPantryLists(pantryLists.filter(item => item.id !== id));
    }

    // console.log(pantryLists)

    return (
        user ?
        <main className="text-black bg-white min-h-screen p-8">
            {/* <h1>Pantry Items</h1> */}

           
            
                <CardWrapper 
                    totalItems={totalItems} 
                    expiredItems={expiredItems} 
                    nonExpiryItems={nonExpiryItems}
                />
            

            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search pantries..." />
                <CreatePantry />  
            </div>

            
                <PantryTable 
                    items={pantryLists}
                    handleDelete={delItem}
                />
           
           
        </main> : null
    );
}











