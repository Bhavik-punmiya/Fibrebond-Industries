"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function CompanyForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress1: '',
    companyAddress2: '',
    companyPAN: '',
    companyGSTIN: '',
    cgstRate: '',
    sgstRate: '',
    adjustment: '',
  });

  useEffect(() => {
    fetchProformaInvoice();
  }, []);

  const fetchProformaInvoice = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/invoices/proforma-invoices');
      console.log(response.data)
      const invoiceData = response.data;
      const {
        companyName,
        companyAddress1,
        companyAddress2,
        companyPAN,
        companyGSTIN,
        cgstRate,
        sgstRate,
        adjustment,
      } = invoiceData;
      setFormData({
        companyName,
        companyAddress1,
        companyAddress2,
        companyPAN,
        companyGSTIN,
        cgstRate: cgstRate.toString(),
        sgstRate: sgstRate.toString(),
        adjustment: adjustment.toString(),
      });
    } catch (error) {
      toast.error(error, { position: 'top-center' });
      console.error('Error fetching Proforma Invoice:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/invoices/proforma-invoices', formData);
      console.log('Invoice updated successfully:', response.data);
      toast.success('Invoice updated successfully', { position: 'top-center' });
    } catch (error) {
      toast.error(error, { position: 'top-center' });
      console.error('Error updating Proforma Invoice:', error);
      // Optionally, handle errors and show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="w-[50%]">
      <ToastContainer />
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="companyAddress1" className="block text-sm font-medium text-gray-700">
              Company Address 1
            </label>
            <input
              type="text"
              name="companyAddress1"
              id="companyAddress1"
              value={formData.companyAddress1}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="companyAddress2" className="block text-sm font-medium text-gray-700">
              Company Address 2
            </label>
            <input
              type="text"
              name="companyAddress2"
              id="companyAddress2"
              value={formData.companyAddress2}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="companyPAN" className="block text-sm font-medium text-gray-700">
              Company PAN
            </label>
            <input
              type="text"
              name="companyPAN"
              id="companyPAN"
              value={formData.companyPAN}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="companyGSTIN" className="block text-sm font-medium text-gray-700">
              Company GSTIN
            </label>
            <input
              type="text"
              name="companyGSTIN"
              id="companyGSTIN"
              value={formData.companyGSTIN}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="cgstRate" className="block text-sm font-medium text-gray-700">
                CGST Rate
              </label>
              <input
                type="text"
                name="cgstRate"
                id="cgstRate"
                value={formData.cgstRate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="sgstRate" className="block text-sm font-medium text-gray-700">
                SGST Rate
              </label>
              <input
                type="text"
                name="sgstRate"
                id="sgstRate"
                value={formData.sgstRate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="adjustment" className="block text-sm font-medium text-gray-700">
              Adjustment
            </label>
            <input
              type="text"
              name="adjustment"
              id="adjustment"
              value={formData.adjustment}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
