// pages/professional-services.js

import React from 'react';

const ProfessionalServices = () => {
    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto md:px-8">
                <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                    <div className="flex-1 sm:hidden lg:block">
                        <img src="https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/11/about-us-1.jpg?fit=1600%2C1066&ssl=1" className="md:max-w-lg sm:rounded-lg" alt="Professional Services" />
                    </div>
                    <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                        <h3 className="text-indigo-600 font-semibold">
                            Introducing,
                        </h3>
                        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            India's Largest Vegan Leather Belt Manufacturer
                        </p>
                        <p className="mt-3 text-gray-600">
                        Fibre Bond Industries, a pioneer in the vegan leather belt manufacturing industry, began its journey as an import business in 2005. With rich industry experience and unwavering commitment to quality, we ventured into our own manufacturing in 2013.

Today, we proudly hold the title of the largest vegan leather belt manufacturer in India, producing a staggering 2.5 million belts every month, with a daily production capacity of 97,200 pieces.
                        </p>
                        <a href="javascript:void(0)" className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium">
                            Know more
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfessionalServices;
