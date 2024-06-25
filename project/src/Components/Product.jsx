import React from "react";
import { Link } from "react-router-dom";

function Product() {
    const [product, setProduct] = React.useState([]);
    const [searchProduct, setSearchProduct] = React.useState([]);
    const [filter, setFilter] = React.useState('');
    const [isSearch, setIsSearch] = React.useState(false);

    React.useEffect(() => {
        getProducts();
    }, []);

    React.useEffect(() => {
        if (filter) {
            getSearchedData();
        }
    }, [filter]);

    const getProducts = async () => {
        let result = await fetch('http://localhost:6969/products');
        result = await result.json();
        setProduct(result);
    };

    const deleteData = async (data) => {
        let result = await fetch(`http://localhost:6969/products/delete/${data._id}`, {
            method: 'DELETE'
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    };

    const getSearchedData = async () => {
        let result = await fetch(`http://localhost:6969/search/${filter}`);
        result = await result.json();
        setSearchProduct(result);
        setIsSearch(true);
    };

    return (
        <div className="w-3/4 mx-auto bg-gray-200 p-8 rounded-lg shadow-lg">
            <div className="text-4xl text-center mb-8">Products</div>
            <div className="relative">
                <input
                    type="text"
                    className="py-2 px-4 border border-blue-400 text-2xl w-[60%] h-[45px] ml-[18%] mb-8 bg-gray-100"
                    onChange={(e) => {
                        setFilter(e.target.value);
                        setIsSearch(false);
                    }}
                    value={filter}
                />
                <button
                    className="border border-teal-900 rounded-lg text-white pt-1 pb-1 pl-2 pr-2 absolute right-[15%] top-1 bg-red-600"
                    onClick={() => {
                        setFilter('');
                        setIsSearch(false);
                        getProducts();
                    }}
                >
                    Clear
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-blue-400">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border border-blue-400">Sr.No</th>
                            <th className="py-2 px-4 border border-blue-400">Name</th>
                            <th className="py-2 px-4 border border-blue-400">Price</th>
                            <th className="py-2 px-4 border border-blue-400">Company</th>
                            <th className="py-2 px-4 border border-blue-400">Category</th>
                            <th className="py-2 px-4 border border-blue-400">Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isSearch ? (
                            searchProduct.map((data, index) => (
                                <tr key={index} className="text-center">
                                    <td className="py-2 px-4 border border-blue-400">{index + 1}</td>
                                    <td className="py-2 px-4 border border-blue-400">{data.name}</td>
                                    <td className="py-2 px-4 border border-blue-400">{data.price}</td>
                                    <td className="py-2 px-4 border border-blue-400">{data.company}</td>
                                    <td className="py-2 px-4 border border-blue-400">{data.category}</td>
                                    <td className="py-2 px-4 border border-blue-400 flex justify-evenly">
                                        <Link
                                            className="border border-teal-900 rounded-lg text-white pt-1 pb-1 pl-2 pr-2 bg-blue-600"
                                            to={`/update/${data._id}`}
                                        >
                                            Update
                                        </Link>
                                        <button
                                            className="border border-teal-900 rounded-lg text-white pt-1 pb-1 pl-2 pr-2 bg-red-600"
                                            onClick={() => {
                                                deleteData(data);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            product.map((data, index) => (
                                <tr key={index} className="text-center">
                                    <td className="py-2 px-4 border border-blue-400">{index + 1}</td>
                                    <td className="py-2 px-4 border border-blue-400">{data.name}</td>
                                    <td className="py-2 px-4 border border-blue-400">{data.price}</td>
                                    <td className="py-2 px-4 border border-blue-400">{data.company}</td>
                                    <td className="py-2 px-4 border border-blue-400">{data.category}</td>
                                    <td className="py-2 px-4 border border-blue-400 flex justify-evenly">
                                        <Link
                                            className="border border-teal-900 rounded-lg text-white pt-1 pb-1 pl-2 pr-2 bg-blue-600"
                                            to={`/update/${data._id}`}
                                        >
                                            Update
                                        </Link>
                                        <button
                                            className="border border-teal-900 rounded-lg text-white pt-1 pb-1 pl-2 pr-2 bg-red-600"
                                            onClick={() => {
                                                deleteData(data);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Product;
