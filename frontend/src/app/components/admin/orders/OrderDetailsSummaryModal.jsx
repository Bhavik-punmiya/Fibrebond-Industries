"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';

const OrderDetailsSummaryModal = ({ isOpen, onClose, orderId }) => {
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/orders/single/${orderId}`);
                setOrderData(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        if (isOpen) {
            fetchOrderData();
        }
    }, [isOpen, orderId]);

    const calculateTax = (price) => (price * 2.5) / 100;

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
                <Dialog.Content className="fixed top-[50%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-8 min-w-[75%] max-h-[75%] overflow-y-auto">
                    {orderData ? (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Order Details - {orderId}</h2>
                            <p className="mb-2">Order Total: {orderData.total}</p>
                            <p className="mb-2">Status: {orderData.status}</p>

                            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
                                <div className="max-w-full overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-2 text-left">
                                                <th className="min-w-[220px] px-4 py-4 font-medium text-black">Product</th>
                                                <th className="min-w-[150px] px-4 py-4 font-medium text-black">Quantity</th>
                                                <th className="min-w-[120px] px-4 py-4 font-medium text-black">Price</th>
                                                <th className="min-w-[120px] px-4 py-4 font-medium text-black">SGST</th>
                                                <th className="min-w-[120px] px-4 py-4 font-medium text-black">CGST</th>
                                                <th className="min-w-[120px] px-4 py-4 font-medium text-black">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderData.order_product_details.map((product, key) => (
                                                <tr key={key}>
                                                    <td className="border-b border-[#eee] px-4 py-5">
                                                        <div className="flex items-center">
                                                            <img src={`http://localhost:5000/api/v1/uploads/product/6677e9662169a1b8afc48e3d`} alt={product.name} className="w-12 h-12 object-cover mr-4" />
                                                            <div>
                                                                <h5 className="font-medium text-black">{product.name}</h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5">
                                                        <p className="text-black">{product.quantity}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5">
                                                        <p className="text-black">{product.price}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5">
                                                        <p className="text-black">{calculateTax(product.price)}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5">
                                                        <p className="text-black">{calculateTax(product.price)}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] px-4 py-5">
                                                        <p className="text-black">{product.total}</p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="font-semibold">Grand Total: {orderData.total}</p>
                            </div>

                            <div className="mt-4">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default OrderDetailsSummaryModal;
