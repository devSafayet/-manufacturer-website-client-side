import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../Firebase.init';
import { FiShoppingCart } from "@react-icons/all-files/fi/FiShoppingCart";

const ServiceTools = () => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth)
    const [products, setProducts] = useState([])
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [page, size])


    useEffect(() => {
        fetch("http://localhost:5000/productCount")
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                const count = data.count;
                const page = Math.ceil(count / 6)
                setPageCount(page)
                // console.log(count);
            })
    }, [])

    let parts = []
    if (products) {
        // console.log("products ", products);
        parts = products

    }

    const hendelparchas = tool => {
        navigate(`/purchase/${tool._id}`)

        // console.log(user);
    }
    return (
        <div className=''>
            <h2 className="text-2xl text-blue-400 font-bold text-center py-5 ">Get  Service Parts </h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 bg-base-200 lg:px-12'>
                {
                    parts?.map(tool => <div key={tool._id} className="lg:max-w-lg transform transition duration-500 hover:scale-110 bg-white shadow-xl bg-base-100 lg:m-8  rounded">
                        <figure className="rounded">
                            <img src={tool.img} alt="Products" className="rounded h-48 w-full" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title uppercase text-1xl text-blue-400">{tool.name}</h2>
                            <div className='h-44 items-center text-center '>
                                <p className='text-black capitalize text-sm'>{tool.decreption}</p>
                                <p className='text-red-600 text-2xl'>Price: ${tool.price} </p>
                                <p className='text-black font-semibold'>Avialble:{tool.quantity} Pease</p>
                                <p>Minimum Order: {tool.minimum} Pease</p>
                                {
                                    Number(tool?.quantity) < Number(tool?.minimum)
                                    &&
                                    <p className='text-red-600 font-bold'>Out OF Stock.</p>
                                }
                            </div>
                            <div className="card-actions absolute bottom-6">
                                {(Number(tool?.quantity) < Number(tool?.minimum))
                                    ?
                                    <button className="btn btn-warning w-48" >Try Agian</button>
                                    :
                                    <button className="btn btn bg-blue-400 font-bold w-48" onClick={() => hendelparchas(tool)}>Purchas<span className='text-white font-bold m-2 text-2xl'><FiShoppingCart /></span></button>
                                }
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div className='text-center'>
                {
                    [...Array(pageCount).keys()]
                        .map(number => <button
                            className={page === number ? "bg-blue-500 text-white lg:mt-3 shadow p-2 m-1 rounded" : "bg-yellow-300 text-white p-2 m-1 lg:mt-3 rounded"}
                            onClick={() => setPage(number)}
                        >{number + 1}</button>)
                }
            </div>
        </div>
    );
};

export default ServiceTools;