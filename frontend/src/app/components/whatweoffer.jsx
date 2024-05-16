import { link } from '@nextui-org/react';
import React from 'react';

const WhatweOffer = () => {
    const plans = [
        {
            name: "Basic plan",
            desc : "Explore Stunning Belts: 10,800 or 5,400 Pieces.",
            link : "https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/11/regular_p_pic_2_1_1.webp?fit=400%2C400&ssl=1"
        },
        {
            name: "360 Plan",
            desc : "A Carton contains 360 Belts with 15 Designs in 30 Boxes.",
            link : "https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/11/360_v2-1.webp?fit=400%2C400&ssl=1"
        },
        {
            name: "45 Plan",
            desc : "A Carton Packed with 45 Belts has 15 Designs.",
            link : "https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/11/Untitled-design-11.jpg?fit=400%2C400&ssl=1"
        },
    ];

    return (
        <section className='py-14'>
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className='relative max-w-xl mx-auto sm:text-center'>
                    <h3 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                         What We Offer?
                    </h3>
                    <div className='mt-3 max-w-xl'>
                        <p>
                            Presenting Our Four Diverse Plans for Your Selection.
                        </p>
                    </div>
                </div>
                <div className='mt-16 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
                    {
                        plans.map((item, idx) => (
                            <div key={idx} className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2'>
                                <div>
                                    <div className='text-center text-3xl font-medium'>
                                        {item.name}
                                    </div>
                                    <div className='mt-4 text-gray-800 text-sm text-center font-semibold'>
                                        {item.desc} 
                                    </div>
                                </div>
                                <img src={item.link} className='mb-8'></img>
                                <div className="flex-1 flex items-end">
                                    <button className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'>
                                        Shop Now
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default WhatweOffer;
