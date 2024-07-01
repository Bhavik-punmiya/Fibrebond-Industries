"use client"

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../../../components/navbar.jsx';
import Footer from '../../../components/Footer.jsx';
import Loader from "../../../components/admin/common/Loader";

const ProductDetailPage = () => {
    const router = useRouter();
    const { id } = useParams();
    console.log(id);
    const [product, setProduct] = useState(null);

    const fetchProductDetails = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/products/${productId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProductDetails(id);
        }
    }, [id]);

    if (!product) return <Loader />;

    return (
        <div className="bg-white">
            <Header />
            <div className="min-h-fit w-full mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2">
                    <div className="img">
                        <div className="img-box h-full max-lg:mx-auto">
                            <img
                                src={`http://localhost:5000/api/v1/uploads/product/${product.images[0]}`}
                                alt={product.name}
                                className="max-lg:mx-auto lg:ml-auto h-full"
                            />
                        </div>
                    </div>
                    <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                        <div className="data w-full max-w-xl">
                            <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">{product.category}&nbsp;/&nbsp;{product.subcategory}</p>
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">{product.name}</h2>
                            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                                <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                                    ${product.price}
                                </h6>
                                <div className="flex items-center gap-2">
                                <div class="flex space-x-2 mt-4">
                    <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg class="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                </div>
                                    <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">{product.reviews.length} reviews</span>
                                </div>
                            </div>
                            <p className="text-gray-500 text-base font-normal mb-5">{product.description}</p>
                            <ul className="grid gap-y-4 mb-8">
                                <li className="flex items-center gap-3">
                                    {/* Paste SVG here */}
                                    <span className="text-gray-900 font-medium text-lg leading-7">{product.highlight1}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    {/* Paste SVG here */}
                                    <span className="text-gray-900 font-medium text-lg leading-7">{product.highlight2}</span>
                                </li>
                            </ul>
                            <div className="mb-8">
                                <p className="text-lg leading-6 font-medium text-gray-900 mb-2">Share:</p>
                                <div className="flex items-center gap-3">
                                    <a href="#" className="text-gray-500 hover:text-indigo-600 transition duration-150 ease-in-out">
                                        {/* Paste SVG here */}
                                    </a>
                                    <a href="#" className="text-gray-500 hover:text-indigo-600 transition duration-150 ease-in-out">
                                        {/* Paste SVG here */}
                                    </a>
                                    <a href="#" className="text-gray-500 hover:text-indigo-600 transition duration-150 ease-in-out">
                                        {/* Paste SVG here */}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetailPage;
