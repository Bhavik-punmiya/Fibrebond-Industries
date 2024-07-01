"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../navbar.jsx';
import Footer from '../Footer.jsx'

const ProductCard = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);

    const fetchProductDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/products/${id}`);
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

    if (!product) return <div>Loading...</div>;

    return (
        <div className="bg-white">
            <Header />
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
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
                            <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">{product.category}&nbsp; /&nbsp; {product.subcategory}</p>
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">{product.name}</h2>
                            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                                <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                                    ${product.price}
                                </h6>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, index) => (
                                            <svg key={index} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_12029_1640)">
                                                    <path
                                                        d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                        fill="#FBBF24"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_12029_1640">
                                                        <rect width="20" height="20" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">{product.reviews.length} reviews</span>
                                </div>
                            </div>
                            <p className="text-gray-500 text-base font-normal mb-5">{product.description}</p>
                            <ul className="grid gap-y-4 mb-8">
                                <li className="flex items-center gap-3">
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="26" height="26" rx="13" fill="#4F46E5" />
                                        <path d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3145 15.3913L18.3334 9.37238" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-gray-900 font-medium text-lg leading-7">{product.highlight1}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="26" height="26" rx="13" fill="#4F46E5" />
                                        <path d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3145 15.3913L18.3334 9.37238" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-gray-900 font-medium text-lg leading-7">{product.highlight2}</span>
                                </li>
                            </ul>
                            <div className="mb-8">
                                <p className="text-lg leading-6 font-medium text-gray-900 mb-2">Share:</p>
                                <div className="flex items-center gap-3">
                                    <a href="#" className="text-gray-500 hover:text-indigo-600 transition duration-150 ease-in-out">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.0667 0.333344H2.93333C1.3 0.333344 0 1.63334 0 3.26668V16.7333C0 18.3667 1.3 19.6667 2.93333 19.6667H17.0667C18.7 19.6667 20 18.3667 20 16.7333V3.26668C20 1.63334 18.7 0.333344 17.0667 0.333344ZM6.66667 15.8333H4.16667V7.5H6.66667V15.8333ZM5.41667 6.25C4.52167 6.25 3.75 5.47834 3.75 4.58334C3.75 3.68834 4.52167 2.91668 5.41667 2.91668C6.31167 2.91668 7.08333 3.68834 7.08333 4.58334C7.08333 5.47834 6.31167 6.25 5.41667 6.25ZM17.5 15.8333H15V11.6667C15 10.7 14.3 10 13.3333 10H13.3C12.3333 10 11.6667 10.7 11.6667 11.6667V15.8333H9.16667V7.5H11.6667V8.58334C12.1883 7.79667 13.1667 7.33334 14.1667 7.33334C16.3333 7.33334 17.5 8.83334 17.5 11.1V15.8333Z" fill="currentColor" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-500 hover:text-indigo-600 transition duration-150 ease-in-out">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.1249 2.53001C18.3498 2.87667 17.5175 3.09001 16.6534 3.16001C17.5375 2.65251 18.2025 1.87251 18.5034 0.942507C17.6734 1.41751 16.7584 1.74834 15.8025 1.91751C15.0175 1.09834 13.9134 0.580007 12.6975 0.580007C10.6017 0.580007 8.90169 2.28001 8.90169 4.37501C8.90169 4.68501 8.92919 4.98501 8.98769 5.27001C5.95169 5.10001 3.2134 3.66834 1.39252 1.42668C1.03919 2.01001 0.836692 2.68668 0.836692 3.40501C0.836692 4.73668 1.5084 5.90668 2.5634 6.58001C1.8684 6.56668 1.20419 6.37251 0.646692 6.05334V6.10334C0.646692 7.92334 1.97085 9.40168 3.66169 9.73001C3.32669 9.82418 2.97135 9.87668 2.60269 9.87668C2.34052 9.87668 2.08085 9.85084 1.82852 9.80001C2.35427 11.2525 3.72435 12.2733 5.33769 12.3033C4.13269 13.2475 2.61477 13.8367 0.978027 13.8367C0.65344 13.8367 0.332526 13.8183 0.0158587 13.7808C1.6456 14.7825 3.59835 15.3767 5.69119 15.3767C12.6934 15.3767 16.1817 10.0008 16.1817 5.03168C16.1817 4.87001 16.1767 4.71168 16.1692 4.55168C17.0077 3.97334 17.7429 3.25251 18.3627 2.41084L19.1249 2.53001Z" fill="currentColor" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-500 hover:text-indigo-600 transition duration-150 ease-in-out">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.125 0.208344H1.875C0.839625 0.208344 0 1.04797 0 2.08334V17.9167C0 18.9521 0.839625 19.7917 1.875 19.7917H18.125C19.1604 19.7917 20 18.9521 20 17.9167V2.08334C20 1.04797 19.1604 0.208344 18.125 0.208344ZM7.29167 15.625H4.375V7.5H7.29167V15.625ZM5.83333 6.25C4.87833 6.25 4.16667 5.53834 4.16667 4.58334C4.16667 3.62834 4.87833 2.91668 5.83333 2.91668C6.78833 2.91668 7.5 3.62834 7.5 4.58334C7.5 5.53834 6.78833 6.25 5.83333 6.25ZM16.6667 15.625H13.75V11.4583C13.75 10.4927 13.0073 9.75 12.0417 9.75C11.0761 9.75 10.3333 10.4927 10.3333 11.4583V15.625H7.5V7.5H10.4167V8.58334C10.805 7.78834 11.7017 7.29168 12.7083 7.29168C14.68 7.29168 16.25 8.86168 16.25 10.8333V15.625H16.6667Z" fill="currentColor" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 flex justify-end px-4 py-4 sm:px-6">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCardList;
