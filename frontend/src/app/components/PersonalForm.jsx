import React, { useState, useEffect, useRef } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import countriesData from '../../../public/countries.json';
import 'intl-tel-input/build/css/intlTelInput.css';

const PersonalDetailsForm = () => {
  const countries = countriesData;
  const phoneInputRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    billingAddress: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      region: '',
      postalCode: '',
    },
    shippingAddress: {
      sameAsBilling: false,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      region: '',
      postalCode: '',
    },
    taxInformation: {
      gstNumber: '',
      gstName: '',
      gstType: '',
      panNumber: '',
    },
    document: null,
    photo: null,
    termsAccepted: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      shippingAddress: {
        ...prevFormData.shippingAddress,
        sameAsBilling: checked,
        ...(checked && { ...prevFormData.billingAddress }),
      },
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nameKeys = name.split('.');

    setFormData((prevFormData) => {
      let formDataRef = prevFormData;

      for (let i = 0; i < nameKeys.length - 1; i++) {
        formDataRef = formDataRef[nameKeys[i]];
      }

      formDataRef[nameKeys[nameKeys.length - 1]] = value;

      return { ...prevFormData };
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      photo: file,
    }));
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      document: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object and append all form data except photo and document
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'photo' && key !== 'document') {
        formDataObj.append(key, value);
      }
    });

    // Append photo and document separately
    if (formData.photo) {
      formDataObj.append('photo', formData.photo);
    }
    if (formData.document) {
      formDataObj.append('document', formData.document);
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/customers', {
        method: 'POST',
        body: formDataObj,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error: ${errorMessage}`);
      }

      const data = await response.json();
      console.log('Customer created:', data.customer);
    } catch (error) {
      console.error('Error creating customer:', error.message);
    }
  };

  useEffect(() => {
    const loadIntlTelInput = async () => {
      if (phoneInputRef.current) {
        const intlTelInput = (await import('intl-tel-input')).default;
        intlTelInput(phoneInputRef.current, {
          autoPlaceholder: 'polite',
          preferredCountries: ['us', 'gb'],
          separateDialCode: true,
        });
      }
    };

    loadIntlTelInput();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Profile Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange} // Add an onChange event handler
                />
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <label
                  htmlFor="photo"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                >
                  Change
                </label>
              </div>
            </div>


            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base mt-5 font-semibold leading-7 text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Please provide your contact details</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastName"
                      id="last-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      id="phone-number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">

              </div>
              <h2 className="text-base mt-5 font-semibold leading-7 text-gray-900">Billing Address</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Please provide the address associated with your payment method for accurate billing and invoicing
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="billingAddress.firstName"
                      id="first-name"
                      value={formData.billingAddress.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="billingAddress.lastName"
                      value={formData.billingAddress.lastName}
                      onChange={handleChange}
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="billingAddress.email"
                      value={formData.billingAddress.email}
                      onChange={handleChange}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      value={formData.billingAddress.phoneNumber}
                      onChange={handleChange}
                      id="phone-number"
                      name="billingAddress.phoneNumber"
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                    Address Line 1
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="billingAddress.addressLine1"
                      value={formData.billingAddress.addressLine1}
                      onChange={handleChange}
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                    Address Line 2
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="billingAddress.addressLine2"
                      value={formData.billingAddress.addressLine2}
                      onChange={handleChange}
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {countries.map((country, index) => (
                        <option key={index} value={country.code}>
                          {`${country.name}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div> */}






                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="billingAddress.city"
                      id="city"
                      value={formData.billingAddress.city}
                      onChange={handleChange}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="billingAddress.region"
                      value={formData.billingAddress.region}
                      onChange={handleChange}
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="billingAddress.postalCode"
                      value={formData.billingAddress.postalCode}
                      onChange={handleChange}
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">

              </div>
              <div className="mt-5 relative flex gap-x-3 items-center">
                <div className="flex items-center">
                  <input
                    id="same-as-billing"
                    name="shippingAddress.sameAsBilling"
                    type="checkbox"
                    checked={formData.shippingAddress.sameAsBilling}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="same-as-billing" className="font-medium text-gray-900">
                    Same as Billing Address
                  </label>
                  <p className="text-gray-500">Check this box if the shipping address is the same as the billing address.</p>
                </div>
              </div>


              <h2 className="text-base mt-5 font-semibold leading-7 text-gray-900">Shipping Address</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Enter the address where you would like your items to be delivered
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="shippingAddress.firstName"
                      value={formData.shippingAddress.firstName}
                      onChange={handleChange}
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="shippingAddress.lastName"
                      value={formData.shippingAddress.lastName}
                      onChange={handleChange}
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="shippingAddress.email"
                      value={formData.shippingAddress.email}
                      onChange={handleChange}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      id="phone-number"
                      name="shippingAddress.phoneNumber"
                      value={formData.shippingAddress.phoneNumber}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                    Address Line 1
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="shippingAddress.addressLine1"
                      id="street-address"
                      value={formData.shippingAddress.addressLine1}
                      onChange={handleChange}
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                    Address Line 2
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="shippingAddress.addressLine2"
                      id="street-address"
                      value={formData.shippingAddress.addressLine2}
                      onChange={handleChange}
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {countries.map((country, index) => (
                        <option key={index} value={country.code}>
                          {`${country.name}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div> */}






                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="shippingAddress.city"
                      id="city"
                      value={formData.shippingAddress.city}
                      onChange={handleChange}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="shippingAddress.region"
                      id="region"
                      value={formData.shippingAddress.region}
                      onChange={handleChange}
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="shippingAddress.postalCode"
                      value={formData.shippingAddress.postalCode}
                      onChange={handleChange}
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">

            </div>
            <h2 className="text-base mt-5 font-semibold leading-7 text-gray-900">Tax Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Enter your tax-related details for compliance and accurate processing.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="gst-number" className="block text-sm font-medium leading-6 text-gray-900">
                  GST Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="taxInformation.gstNumber"
                    value={formData.taxInformation.gstNumber}
                    onChange={handleChange}
                    id="gst-number"
                    autoComplete="gst-number"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="gst-name" className="block text-sm font-medium leading-6 text-gray-900">
                  GST Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="taxInformation.gstName"
                    value={formData.taxInformation.gstName}
                    onChange={handleChange}
                    id="gst-name"
                    autoComplete="gst-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="gst-type" className="block text-sm font-medium leading-6 text-gray-900">
                  GST Type
                </label>
                <div className="mt-2">
                  <select
                    name="taxInformation.gstType"
                    id="gst-type"
                    autoComplete="gst-type"
                    value={formData.taxInformation.gstType}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select GST Type</option>
                    <option value="regular">Regular</option>
                    <option value="composition">Composition</option>
                    <option value="unregistered">Unregistered</option>
                    <option value="input-service-distributor">Input Service Distributor</option>
                    <option value="casual-taxable-person">Casual Taxable Person</option>
                    <option value="non-resident-taxable-person">Non-Resident Taxable Person</option>
                    <option value="ecommerce-operator">E-commerce Operator</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="pan-number" className="block text-sm font-medium leading-6 text-gray-900">
                  PAN Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="taxInformation.panNumber"
                    value={formData.taxInformation.panNumber}
                    onChange={handleChange}
                    id="pan-number"
                    autoComplete="pan-number"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">





              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Upload Supported Documents in a Single PDF
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload"
                        name="document"
                        value={formData.document}
                        onChange={handleDocumentUpload} 
                        type="file" 
                        className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 relative flex gap-x-3 items-center">
          <input
            id="terms-and-conditions"
            name="termsAccepted"
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            required
          />
          <label htmlFor="terms-and-conditions" className="font-medium text-gray-900">
            I accept the terms and conditions
          </label>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;

