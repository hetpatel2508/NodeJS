import { useState } from "react"

function AddProduct(){

    const [name,setName] = useState('');
    const [price,setPrice] = useState(0);
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');

    const sendData = async ()=>{
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        
        try{
            let result = await fetch('http://localhost:6969/add-product',{
                method:'post',
                body: JSON.stringify({name,price,category,userId,company}),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if(!result.status==201){
                throw new Error('Error adding product');
            }
            result = await result.json()
            console.log(result);
        }catch (error) {
            console.error('fetch link ma error');
        }
    }

    return <>
    <div className="border border-gray-900 rounded-lg w-[600px] h-[550px] ml-[30%] flex flex-col items-center relative">
    
        <h1 className="text-5xl text-center pt-10 pb-2">Add Products</h1>

        <input type="text" placeholder="Enter name" className="border solid border-black rounded-lg bg-gray-100 w-[60%] h-[40px] pl-4 mt-10 mb-4 pb-0.5" onChange={(e)=>setName(e.target.value)} />
        <input type="text" placeholder="Enter price" className="border solid border-black rounded-lg bg-gray-100 w-[60%] h-[40px] pl-4 mt-4 mb-4 pb-0.5" onChange={(e)=>setPrice(e.target.value)} />
        <input type="text" placeholder="Enter category" className="border solid border-black rounded-lg bg-gray-100 w-[60%] h-[40px] pl-4 mt-4 mb-4 pb-0.5" onChange={(e)=>setCategory(e.target.value)} />
        <input type="text" placeholder="Enter company" className="border solid border-black rounded-lg bg-gray-100 w-[60%] h-[40px] pl-4 mt-4 mb-4 pb-0.5" onChange={(e)=>setCompany(e.target.value)} />
        
        <button className="border solid border-black rounded-md bg-blue-700 text-white pt-1 pb-2 pr-4 pl-4 absolute bottom-[11%]" onClick={sendData}>Add Product</button>
    </div>
    </>
}

export default AddProduct;