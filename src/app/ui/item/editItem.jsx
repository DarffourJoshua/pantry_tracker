'use client'

import { Button } from "../button";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function EditItem() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
            <section className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
                <h1 className="text-3xl font-bold text-center">Pantry List</h1>
                <p className="text-center">Keep track of your pantry items and their expiration dates.</p>
                <div className="bg-orange-100 p-4 rounded-lg">
                    {/* form submission for the item list */}

                    {/* Input for the picture of the item */}
                    <form action="">
                        <label htmlFor="itemImg">Add a picture of the item: </label>
                        <input 
                            type="file"
                            placeholder="Picture of the item"
                            value={''}
                            name="itemImg"
                            id="itemImg"
                        />

                        {/* Input for the name of the item */}
                        <label htmlFor="item">Item:</label>
                        <input 
                            type="text"
                            placeholder="Name of the item"
                            className="col-span-3 p-3 border"
                            name="item"
                            value={''}
                            onChange={(e)=>console.log(e.target.value)}
                            id="item"
                            required
                        />

                        {/* Input of the quantity of the item */}
                        <label htmlFor="qty">Quantity</label>
                        <input 
                            type="text"
                            placeholder="Quantity of the item"
                            name="qty"
                            value={''}
                            onChange={(e) => console.log(e.target.value)}
                            id="qty"
                            required
                        />

                        {/* Input for the manufacturing date */}
                        <label htmlFor="mfgDate">Mfg Date:</label>
                        <input 
                            type="date"
                            placeholder="Manufacting date"
                            name="mfgDate"
                            value={''}
                            onChange={e => console.log(e.target.value)}
                            required
                            id="mfgDate"
                        />

                        {/* Input for the expiring date */}
                        <label htmlFor="bb">Best Before:</label>
                        <input 
                            type="date"
                            placeholder="Best before"
                            name="bb"
                            value={''}
                            id="bb"
                            onChange={e=> console.log(e.target.value)}
                            required
                        />
                        <Button 
                            type='submit'
                        />
                    </form>
                </div>

            </section>
        </main>
    )
}