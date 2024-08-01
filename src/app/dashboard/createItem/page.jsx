'use client'

//importing firebase cloud firestore libraries
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "../../ui/button";
import {useRef, useState} from 'react';
import { db, storage } from "../../firebase/config";
import { useRouter } from "next/navigation";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
    const router = useRouter();
    const [isNumber, setIsNumber] = useState(false);
    const inputRef = useRef(null);
    const [itemFields, setItemFields] = useState({
        photo: null,
        item: '',
        qty: '',
        mfgDate: '',
        bb: '',
    })

    const handleChange = (e) => {
        const {name, value, files} = e.target
        if (name === 'photo') {
            setItemFields(prevValue => ({...prevValue, photo: files[0]}))
        }   else {
            setItemFields(prevValue => {
                return {
                    ...prevValue,
                    [name]: value
                }
            });
        }
        if (name === 'bb')  setIsNumber(value < 0 && !isNaN(value) && value === '');
    }

    // function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let photoURL = '';
        try {
            if (itemFields.photo) {
                const storageRef = ref(storage, `photos/${itemFields.photo.name}`);
                await uploadBytes(storageRef, itemFields.photo);
                photoURL = await getDownloadURL(storageRef);
            }
    
            const newItem = {
                ...itemFields,
                photo: photoURL,
            };
            await addDoc(collection(db, "items"), newItem);
    
            setItemFields(
                {
                    photo: null,
                    item: '',
                    qty: '',
                    mfgDate: '',
                    bb: '',
                }
            );
            router.push('../pantryList');
        }   catch (err) {
            console.log(err);
        }
    }
    
    return (
        <main className="flex min-h-screen flex-col items-center text-black justify-between bg-white sm:p-8 p-4">
            <section className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
                <h1 className="text-3xl font-bold text-center ">Pantry List</h1>
                <p className="text-center">Keep track of your pantry items and their expiration dates.</p>
                <div className="bg-orange-100 p-4 rounded-lg">
                    {/* form submission for the item list */}

                    {/* Input for the picture of the item */}
                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="photo" className="w-full">Add a picture of the item: </label>
                        <input 
                            type="file"
                            placeholder="Picture of the item"
                            // value={itemFields.photo}
                            name="photo"
                            id="photo"
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />

                        {/* Input for the name of the item */}
                        <label htmlFor="item" className="block mt-5 ml-5">Item:</label>
                        <input 
                            type="text"
                            placeholder="Name of the item"
                            className="col-span-3 p-2 mx-auto mb-5 border w-3/4 block capitalise"
                            name="item"
                            value={itemFields.item}
                            onChange={handleChange}
                            id="item"
                            required
                        />

                        {/* Input of the quantity of the item */}
                        <label htmlFor="qty" className="block ml-5 mt-2">Quantity:</label>
                        <input 
                            type="text"
                            ref={inputRef}
                            placeholder="Quantity of the item"
                            name="qty"
                            value={itemFields.qty}
                            onChange={handleChange}
                            id="qty"
                            required
                            className="col-span-3 p-2 mx-auto mb-3 border w-3/4 block"
                        />
                        {!isNumber && <span className="text-red block font-medium mb-2">Please enter a valid number</span>}

                        {/* Input for the manufacturing date */}
                        <label htmlFor="mfgDate">Mfg Date:</label>
                        <input 
                            type="date"
                            placeholder="Manufacting date"
                            name="mfgDate"
                            value={itemFields.mfgDate}
                            onChange={handleChange}
                            required
                            id="mfgDate"
                        />

                        {/* Input for the expiring date */}
                        <label htmlFor="bb">Best Before:</label>
                        <input 
                            type="date"
                            placeholder="Best before"
                            name="bb"
                            value={itemFields.bb}
                            id="bb"
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                        />
                        <Button 
                            type='submit'
                            className={'w-32 text-white mx-auto my-10'}
                        > Add item </Button>
                    </form>
                </div>

            </section>
        </main>
    )
}