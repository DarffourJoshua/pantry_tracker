'use client';

import { query, collection, querySnapshot, getDoc, onSnapshot, deleteDoc,doc } from 'firebase/firestore';
import {db} from '../firebase/config';
import { useEffect, useState } from 'react';

// UI to render items from the databas

//calc the total items add



export default function Page() {
    const [items, setItems] = useState({
        photo: null,
        item: '',
        qty: '',
        mfgDate: '',
        bb: ''
    })

    const [totalItems, setTotalItems] = useState(0);
    const [expiredItems, setExpiredItems] = useState(0);
    const [nonExpiryItems, setNonExpiryItems] = useState(0);

    
    //function to read Items from database
    useEffect(() => {
        const q = query(collection(db, 'items'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let itemsArr = [];
            const date = new Date();
            todaysDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            
            querySnapshot.forEach(doc => {
                itemsArr.push({...doc.data, id: doc.id})
            })
            setItems(itemsArr);

            //read total items
            const calTotalItems = () => {
                const overallItems = itemsArr.reduce((sum, item) => sum + parseFloat(item.qty), 0);
                setTotalItems(overallItems)
            }
            calTotalItems();

            //read expiry items
            const expiryItems = () => {
                let filteredItems = itemsArr.filter(item => item.bb === todaysDate);
                const overallItems = filteredItems.reduce((sum, item) => sum + parseFloat(item), 0);
                setExpiredItems(overallItems);
            }
            expiryItems();

            return () => unsubscribe();
        })
    }, [])

    //Delete Item
    const delItem = async (id) => {
        await deleteDoc(db, 'items', id)
    }

    return (
        <main className="text-black bg-white min-h-screen">
            <h1>Pantry Items</h1>
        </main>
    );
}