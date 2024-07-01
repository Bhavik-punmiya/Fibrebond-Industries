"use client";

import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import * as Dialog from '@radix-ui/react-dialog';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TableTwo = () => {

  const [productData, setProductData] = useState([]);
  const [checkedItems, setCheckedItems] = useState(
    new Array(productData.length).fill(false)
  );
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [isTaxApplicable, setIsTaxApplicable] = useState(true);
  const [stockQuantity, setStockQuantity] = useState('');
  const [isInStock, setIsInStock] = useState(true);
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState({ length: '', breadth: '', height: '' });
  const [plans, setPlans] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const animatedComponents = makeAnimated();


  const handleCheckboxChange = (index, productId) => {
    setCheckedItems((prev) => {
      const newCheckedItems = [...prev];
      newCheckedItems[index] = !newCheckedItems[index];

      setSelectedProductIds((prevIds) => {
        if (newCheckedItems[index]) {
          // Add productId to selectedProductIds if it's not already included
          if (!prevIds.includes(productId)) {
            return [...prevIds, productId];
          }
        } else {
          // Remove productId from selectedProductIds
          return prevIds.filter((id) => id !== productId);
        }
        return prevIds; // Return previous state if no changes needed
      });

      return newCheckedItems;
    });
  };



  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/products/');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProductData(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/plans');
      const plansData = response.data.map(plan => ({ value: plan.planName, label: plan.planName }));
      setPlans(plansData);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (!productName.trim()) {
      setFormErrors({ productName: 'Product Name is required.' });
      toast.error('Product Name is required.', { position: 'top-center' });
      return;
    }
    if (!productPrice.trim()) {
      setFormErrors({ productPrice: 'Product Price is required.' });
      toast.error('Product Price is required.', { position: 'top-center' });
      return;
    }
    if (isNaN(Number(productPrice))) {
      setFormErrors({ productPrice: 'Product Price must be a number.' });
      toast.error('Product Price must be a number.', { position: 'top-center' });
      return;
    }
    if (weight && isNaN(Number(weight))) {
      setFormErrors({ weight: 'Weight must be a number.' });
      toast.error('Weight must be a number.', { position: 'top-center' });
      return;
    }
    if (dimensions.length && isNaN(Number(dimensions.length))) {
      setFormErrors({ dimensions: { ...formErrors.dimensions, length: 'Length must be a number.' } });
      toast.error('Length must be a number.', { position: 'top-center' });
      return;
    }
    if (dimensions.breadth && isNaN(Number(dimensions.breadth))) {
      setFormErrors({ dimensions: { ...formErrors.dimensions, breadth: 'Breadth must be a number.' } });
      toast.error('Breadth must be a number.', { position: 'top-center' });
      return;
    }
    if (dimensions.height && isNaN(Number(dimensions.height))) {
      setFormErrors({ dimensions: { ...formErrors.dimensions, height: 'Height must be a number.' } });
      toast.error('Height must be a number.', { position: 'top-center' });
      return;
    }
    if (!stockQuantity.trim()) {
      setFormErrors({ stockQuantity: 'Stock Quantity is required.' });
      toast.error('Stock Quantity is required.', { position: 'top-center' });
      return;
    }

    try {
      // First upload images and get their IDs
      const uploadedImageIds = await Promise.all(
        imageFiles.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          const response = await axios.post('http://localhost:5000/api/v1/uploads/product/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          return response.data.file.id;
        })
      );

      console.log(uploadedImageIds);

      const newProduct = {
        name: productName,
        price: productPrice,
        shortDescription: shortDescription,
        description: description,
        isTaxApplicable: isTaxApplicable,
        stockQuantity: stockQuantity,
        isInStock: isInStock,
        weight: weight,
        dimensions: dimensions,
        plans: selectedPlans.map(plan => plan.value),
        images: uploadedImageIds, // Save image IDs
      };

      console.log(newProduct);

      // Submit the new product
      const response = await axios.post('http://localhost:5000/api/v1/products', newProduct);

      console.log('Product added successfully:', response.data);
      toast.success("Product Added Successfully", { position: "top-center", });
      setIsAddModalOpen(false);
      await fetchProducts(); // Refresh product list
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error, { position: "top-center", });
    }
  };

  const handleDeleteSelectedProducts = async () => {
    try {
      console.log('Deleting products:', selectedProductIds);
      await axios.post('http://localhost:5000/api/v1/products/products/delete', { productIds: selectedProductIds });
      // Refresh or update the product data here after deletion if needed
      await fetchProducts();
      console.log('Products deleted successfully');
    } catch (err) {
      console.error('Error deleting products:', err);
    }
  };

  const handleAddPlanSubmit = (e) => {
    e.preventDefault();
    addProductsToPlans();
  };



  const handleImageClick = (image) => {
    setMainImage(image);
  };


  const addProductsToPlans = async () => {
    try {

      const response = await axios.post('http://localhost:5000/api/v1/products/add-products-to-plans', {
        productIds: selectedProductIds,
        selectedPlans: selectedPlans.map(plan => plan.value)
      });

      if (response.status === 200) {
        // Handle successful response
        const result = response.data;
        console.log('Products added to plans:', result);
        setIsAddPlanModalOpen(false);
        toast.success("Plans Assigned to the Product Successfully", { position: "top-center", });
        await fetchProducts();
        // Optionally, refresh product data or other state here
      } else {
        // Handle error response
        toast.error(error, { position: "top-center", });
        console.error('Failed to add products to plans:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding products to plans:', error);
    }
  };

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
    const fileUrls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
    setThumbnails(fileUrls);
    if (fileUrls.length > 0) {
      setMainImage(fileUrls[0]);
    } else {
      setMainImage(""); // Clear mainImage if no files selected
    }
  };
  useEffect(() => {
    fetchPlans();
    fetchProducts();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <ToastContainer />

      <div className="px-4 py-6 md:px-6 xl:px-7.5 items-start justify-between md:flex">
        <div className="max-w-lg">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Top Products
          </h4>

          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
      </div>
      <div className="px-4 py-6 md:px-6 xl:px-7.5 items-start justify-between md:flex space-x-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Products
        </h4>

        <div className="flex space-x-3 items-center">
          <form onSubmit={(e) => e.preventDefault()} className="px-4 mx-auto">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="w-80 py-1 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Options
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>
            </div>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block w-full text-left px-4 py-2 text-sm`}
                      >
                        Delete Selected Products
                      </button>
                    )}
                  </Menu.Item>
                  <MenuItem>
                    {({ focus }) => (
                      <a
                        href="#"
                        onClick={() => setIsAddPlanModalOpen(true)}
                        className={classNames(
                          focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Add Plan
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ focus }) => (
                      <a
                        href="#"
                        className={classNames(
                          focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        License
                      </a>
                    )}
                  </MenuItem>
                  <form method="POST" action="#">
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          type="submit"
                          className={classNames(
                            focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block w-full px-4 py-2 text-left text-sm'
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </form>
                </div>
              </MenuItems>
            </Transition>
          </Menu>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Options
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>
            </div>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <MenuItem>
                    {({ focus }) => (
                      <a
                        href="#"
                        className={classNames(
                          focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Account settings
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ focus }) => (
                      <a
                        href="#"
                        className={classNames(
                          focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Support
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ focus }) => (
                      <a
                        href="#"
                        className={classNames(
                          focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        License
                      </a>
                    )}
                  </MenuItem>
                  <form method="POST" action="#">
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          type="submit"
                          className={classNames(
                            focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block w-full px-4 py-2 text-left text-sm'
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </form>
                </div>
              </MenuItems>
            </Transition>
          </Menu>

          <div className="mt-3 md:mt-0">
            <button
              onClick={openAddModal}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>


      <div className="px-2 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[80px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  CheckBox
                </th>
                <th className="min-w-[240px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Product Name
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Plans
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Price
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Stock Quantity
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {productData.map((product, index) => (
                <tr key={product._id}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <input
                      type="checkbox"
                      checked={checkedItems[index]}
                      onChange={() => handleCheckboxChange(index, product._id)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="h-12.5 w-15 rounded-md">
                        {/* Assuming product.image is a URL to your product image */}

                        <Image
                          src={product.images && product.images.length > 0
                            ? `http://localhost:5000/api/v1/uploads/product/${product.images[0]}`
                            : '/images/product/product-01.png'}
                          width={60}
                          height={50}
                          alt="Product"
                        />

                      </div>
                      <p className="text-sm text-black dark:text-white">{product.name}</p>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{product.plans.join(', ')}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{product.price}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{product.stockQuantity}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary">
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </button>
                      <button className="hover:text-primary">
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </button>
                      <button className="hover:text-primary">
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                            fill=""
                          />
                          <path
                            d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Dialog.Root open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Dialog.Content className="fixed top-[55%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-8 min-w-[75%] max-h-[75%] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <form onSubmit={handleAddSubmit}>
                  <h2 className="text-lg font-bold mb-4">Add New Product</h2>

                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter Product Name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Product Price</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder="Enter Product Price"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Select Plans</label>
                    <div className="mt-2">
                      <Select
                        isMulti
                        components={animatedComponents}
                        value={selectedPlans}
                        onChange={setSelectedPlans}
                        options={plans}
                      />
                      {/* className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" */}
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Short Description</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        placeholder="Enter Short Description"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full mt-3">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                    <div className="mt-2">

                      <ReactQuill
                        id="description"
                        name="description"
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write a detailed description of the product."
                  
                        theme="snow" />
                    </div>
                  </div>

                  <div className="mt-3 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="tax-applicable"
                          name="tax-applicable"
                          type="checkbox"
                          checked={isTaxApplicable}
                          onChange={() => setIsTaxApplicable(!isTaxApplicable)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="tax-applicable" className="font-medium text-gray-900">Tax Applicable</label>
                        <p className="text-gray-500">Check if tax is applicable to this product.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Stock Quantity</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        placeholder="Enter Stock Quantity"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="in-stock"
                          name="in-stock"
                          type="checkbox"
                          checked={isInStock}
                          onChange={() => setIsInStock(!isInStock)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="in-stock" className="font-medium text-gray-900">In Stock</label>
                        <p className="text-gray-500">Check if this product is currently in stock.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Weight</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter Weight"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Dimensions (L x B x H)</label>
                    <div className="flex items-center gap-4.5 mt-2">
                      <input
                        type="text"
                        value={dimensions.length}
                        onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                        placeholder="Length"
                        className="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="text"
                        value={dimensions.breadth}
                        onChange={(e) => setDimensions({ ...dimensions, breadth: e.target.value })}
                        placeholder="Breadth"
                        className="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="text"
                        value={dimensions.height}
                        onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                        placeholder="Height"
                        className="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                    </div>
                  </div>



                  <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg mt-4">Add Product</button>
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-md">Close</button>
                </form>
              </div>


              {/* Images Section */}

              <div>
                <div className="flex items-start">
                  <div className={mainImage ? "w-[60%] ml-[10%]" : "hidden"}>
                    <img src={mainImage} alt="main" className="w-full rounded-xl mb-4" />
                  </div>
                  <div className={mainImage ? "flex flex-col gap-2 ml-4" : "hidden"}>
                    {thumbnails.map((thumb, index) => (
                      <img
                        key={index}
                        src={thumb}
                        alt={`thumbnail-${index}`}
                        className={`cursor-pointer rounded-xl w-20 h-20 ${mainImage === thumb ? 'ring-2 ring-indigo-500' : ''}`}
                        onClick={() => setMainImage(thumb)}
                      />
                    ))}
                  </div>
                  <div className={!mainImage ? "ml-[10%]  flex flex-col items-center justify-center pt-5 pb-6  w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer" : "hidden"}>
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                </div>
                <div className="mt-4">
                  <form onSubmit={handleAddSubmit}>
                    <div className="ml-[10%]">
                      <label className="block mb-2">
                        <span className="sr-only">Choose product images</span>
                        <input
                          type="file"
                          className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:text-neutral-500 dark:file:bg-blue-500 dark:hover:file:bg-blue-400"
                          multiple
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </form>
                </div>
              </div>


            </div>




          </Dialog.Content>
        </Dialog.Root>

        <Dialog.Root open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
            <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-4 w-full max-w-lg">
              <div className="bg-white rounded-md shadow-lg px-4 py-6 sm:flex">
                <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-red-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mt-2 text-center sm:ml-4 sm:text-left">
                  <Dialog.Title className="text-lg font-medium text-gray-800">
                    {" "}
                    An error occurred!
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-sm leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
                    eget lorem dolor sed viverra ipsum nunc. venenatis.
                  </Dialog.Description>
                  <div className="items-center gap-2 mt-3 text-sm sm:flex">
                    <Dialog.Close asChild>
                      <div className="bg-redd-600">
                        <button
                          aria-label="Close"
                          className="w-full mt-2 p-2.5 flex-1 bg-red-600 text-gray-800 rounded-md border ring-offset-2 ring-indigo-600 focus:ring-2"
                          onClick={() => {
                            handleDeleteSelectedProducts();
                            setIsDeleteModalOpen(false);
                          }}

                        >
                          Delete
                        </button>
                      </div>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                      <button
                        aria-label="Close"
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md border ring-offset-2 ring-indigo-600 focus:ring-2"
                      >
                        Cancel
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        {/* Add selected plans to products  */}
        <Dialog.Root open={isAddPlanModalOpen} onClose={() => setIsAddPlanModalOpen(false)}>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Dialog.Content className="fixed top-[55%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-8 min-w-[50%] max-h-[75%] overflow-y-auto">
            <form onSubmit={handleAddPlanSubmit}>
              <h2 className="text-lg font-bold mb-4">Add Plan to Selected Products</h2>
              <div className="mt-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Select Plans</label>
                <div className="mt-2">
                  <Select
                    isMulti
                    components={animatedComponents}
                    value={selectedPlans}
                    onChange={setSelectedPlans}
                    options={plans}
                  />
                </div>
              </div>
              <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg mt-4">Add Plan</button>
              <button type="button" onClick={() => setIsAddPlanModalOpen(false)} className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-md">Close</button>
            </form>
          </Dialog.Content>
        </Dialog.Root>


      </div>
    </div >
  );
};



export default TableTwo;
