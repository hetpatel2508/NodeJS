import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams();

  const [isName, setIsName] = useState(false);
  const [isPrice, setIsPrice] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const [tempname, setTempName] = useState("");
  const [tempprice, setTempPrice] = useState(0);
  const [tempcategory, setTempCategory] = useState("");
  const [tempcompany, setTempCompany] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(`http://localhost:6969/product/${id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
    
    setTempName(result.name);
    setTempPrice(result.price);
    setTempCategory(result.category);
    setTempCompany(result.company);
};

const updateData = async ()=>{
    try{
        if(name == tempname && price == tempprice && category == tempcategory && company == tempcompany){
            return;
        }
        let result = await fetch(`http://localhost:6969/product/update/${id}`,{
            method:'put',
            body: JSON.stringify({name,price,category,company}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if(!result.status==201){
            throw new Error('Error updating product');
        }else{
            result =await result.json()
            console.log(result);
            await getProducts()
        }
    }catch(err){
        console.log("fetch link ma error");
    }
}

const resetData = ()=>{
    setName(tempname);
    setPrice(tempprice);
    setCategory(tempcategory);
    setCompany(tempcompany);
  }
  
  return (
    <>
      <div className="border border-gray-900 rounded-lg w-[600px] h-[550px] ml-[30%] flex flex-col items-center relative">
        <h1 className="text-5xl text-center pt-10 pb-2">Update Products</h1>

        <div className="flex w-full mt-10 mb-4 ">
          <div className="ml-[15%] text-3xl">Name : </div>
          {isName ? (
            <input
              type="text"
              placeholder="Enter name"
              className="border solid border-black rounded-lg bg-gray-100 w-[47%] h-[40px] pl-4 pb-0.5 ml-4"
              onChange={(e) => setName(e.target.value)}
            ></input>
          ) : (
            <div className=" h-[40px] pl-4 pb-0.5 ml-4 flex items-center text-2xl">
              {name}
            </div>
          )}
          <input
            type="checkbox"
            className="absolute right-[13%]  w-6 h-6 mt-1.5"
            onClick={() => setIsName(!isName)}
          />
        </div>

        <div className="flex w-full mt-4 mb-4">
          <div className="ml-[15%] text-3xl">Price : </div>
          {isPrice ? (
            <input
              type="text"
              placeholder="Enter price"
              className="border solid border-black rounded-lg bg-gray-100 w-[49.5%] h-[40px] pl-4  pb-0.5 ml-4"
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          ) : (
            <div className=" h-[40px] pl-4 pb-0.5 ml-4 flex items-center text-2xl">
              {price}
            </div>
          )}
          <input
            type="checkbox"
            className="absolute right-[13%]  w-6 h-6 mt-1.5"
            onClick={() => setIsPrice(!isPrice)}
          />
        </div>

        <div className="flex w-full mt-4 mb-4">
          <div className="ml-[15%] text-3xl">Category : </div>
          {isCategory ? (
            <input
              type="text"
              placeholder="Enter category"
              className="border solid border-black rounded-lg bg-gray-100 w-[40%] h-[40px] pl-4 pb-0.5 ml-4"
              onChange={(e) => setCategory(e.target.value)}
            ></input>
          ) : (
            <div className=" h-[40px] pl-4 pb-0.5 ml-4 flex items-center text-2xl">
              {category}
            </div>
          )}
          <input
            type="checkbox"
            className="absolute right-[13%]  w-6 h-6 mt-1.5"
            onClick={() => setIsCategory(!isCategory)}
          />
        </div>

        <div className="flex w-full mt-4 mb-4">
          <div className="ml-[15%] text-3xl">Company : </div>
          {isCompany ? (
            <input
              type="text"
              placeholder="Enter company"
              className="border solid border-black rounded-lg bg-gray-100 w-[39%] h-[40px] pl-4 pb-0.5 ml-4"
              onChange={(e) => setCompany(e.target.value)}
            ></input>
          ) : (
            <div className=" h-[40px] pl-4 pb-0.5 ml-4 flex items-center text-2xl">
              {company}
            </div>
          )}
          <input
            type="checkbox"
            className="absolute right-[13%]  w-6 h-6 mt-1.5"
            onClick={() => setIsCompany(!isCompany)}
          />
        </div>

        <button className="border solid border-black rounded-md bg-green-700 text-white pt-1 pb-2 pr-4 pl-4 absolute bottom-[11%] left-[30%]" onClick={resetData}>
          Reset
        </button>
        <button className="border solid border-black rounded-md bg-blue-700 text-white pt-1 pb-2 pr-4 pl-4 absolute bottom-[11%] right-[30%]" onClick={updateData}>
          Update Product
        </button>
      </div>
    </>
  );
}

export default UpdateProduct;
