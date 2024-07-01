"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function Example() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const fetchUserProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/products/user-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '666546ff021a844541b46884', // Replace with actual userId or retrieve dynamically
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProducts(data); // Assuming the response is an array of products
    } catch (error) {
      console.error('Error fetching user products:', error);
    }
  };

  useEffect(() => {
    fetchUserProducts();
  }, []);

  const handleProductClick = (id) => {
    router.push(`/shop/product/${id}`);
  };

  return (
    <div className="bg-white" >
      <Header />
      <div className="font-[sans-serif] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Premium Sneakers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative"
              onClick={() => handleProductClick(product._id)}
            >
              <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-gray-800 inline-block" viewBox="0 0 64 64">
                  <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.53 18.53 0 0 0 18.5 4C9.55 4 2 11.55 2 20.5 2 36.74 32 60 32 60s30-23.26 30-39.5C62 11.55 54.45 4 45.5 4zM32 54.88S6 34.27 6 20.5C6 12.6 12.6 6 20.5 6a16.53 16.53 0 0 1 11.5 4.75L32 10.77l-.01-.01A16.53 16.53 0 0 1 43.5 6C51.4 6 58 12.6 58 20.5 58 34.27 32 54.88 32 54.88z" />
                </svg>
              </div>
              <img
                src={`http://localhost:5000/api/v1/uploads/product/${product.images[0]}`}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="px-4 py-3">
                <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-gray-500">{product.shortDescription}</p>
                <div className="flex items-center mt-2">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-yellow-500">
                      <path d="M9.049 2.927C9.423 2.079 10.577 2.079 10.951 2.927L12.414 6.25C12.554 6.568 12.864 6.776 13.206 6.835L16.832 7.479C17.744 7.646 18.109 8.784 17.456 9.437L14.61 12.283C14.374 12.519 14.27 12.879 14.333 13.227L15.018 16.786C15.199 17.723 14.208 18.42 13.387 17.95L10.218 16.078C9.907 15.894 9.593 15.894 9.282 16.078L6.113 17.95C5.292 18.42 4.301 17.723 4.482 16.786L5.167 13.227C5.23 12.879 5.126 12.519 4.89 12.283L2.044 9.437C1.391 8.784 1.756 7.646 2.668 7.479L6.294 6.835C6.636 6.776 6.946 6.568 7.086 6.25L8.549 2.927H9.049Z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
