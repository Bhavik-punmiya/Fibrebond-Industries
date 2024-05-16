// Import React and necessary dependencies
import React from 'react';

// Import the horizontal slider CSS
import './ProductDisplay.css';

// Define the product data
const products = [
  {
    id: 1,
    name: 'Belt for Men with Auto lock Buckle',
    href: '#',
    imageSrc: 'https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/10/1.png?fit=1324%2C1368&ssl=1',
    imageAlt: "Belt for Men with Auto lock Buckle",
    price: '₹44',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Elastic Stretchable And Adjustable Belt For Men',
    href: '#',
    imageSrc: 'https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/10/2-1.png?fit=1620%2C1620&ssl=1',
    imageAlt: "Belt for Men with Auto lock Buckle",
    price: '₹44',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Men’s Reversible TPU Leather Belt',
    href: '#',
    imageSrc: 'https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/10/3-1.png?fit=1080%2C1080&ssl=1',
    imageAlt: "Belt for Men with Auto lock Buckle",
    price: '₹44',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Reversible PU Leather Formal Belt For Men',
    href: '#',
    imageSrc: 'https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/10/4-1.png?fit=1080%2C1080&ssl=1',
    imageAlt: "Belt for Men with Auto lock Buckle",
    price: '₹44',
    color: 'Black',
  },
  {
    id: 5,
    name: 'Urban Spanish Leather For Men',
    href: '#',
    imageSrc: 'https://i0.wp.com/fibrebondindustries.com/wp-content/uploads/2023/10/5-1.png?fit=741%2C721&ssl=1',
    imageAlt: "Belt for Men with Auto lock Buckle",
    price: '₹44',
    color: 'Black',
  }
];

// Define the ProductSlider component
const ProductSlider = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="flex m-20 pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
            {/* Map through products and generate slider items */}
            {products.map((product) => (
              <div key={product.id} className="inline-block px-3">
                <div className="w-80 h-80 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover object-center" />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};












// Export the ProductSlider component
export default ProductSlider;
