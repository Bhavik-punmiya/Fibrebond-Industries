"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import DeleteSingleModal from './DeleteSingleModal';
import BatchDeleteModal from './BatchDeleteModal';
import BatchOrderStatusUpdateModal from './BatchOrderStatusUpdateModal'; // Im

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBatchDeleteModalOpen, setIsBatchDeleteModalOpen] = useState(false);
  const [isBatchStatusModalOpen, setIsBatchStatusModalOpen] = useState(false); // State for Batch Order Status Update Modal
  // Order Table
  const fetchOrdersTable = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/orders/table/details');
      setOrders(response.data);
      setCheckedItems(new Array(response.data.length).fill(false));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Three Action Buttons 
  const fetchSingleOrderData = async (id) => {
    try {
      console.log(id)
      const response = await axios.get(`http://localhost:5000/api/v1/orders/single/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching single order data:', error);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/orders/single/${selectedOrderId}`);
      console.log(`Order ${selectedOrderId} deleted successfully`);
      setIsDeleteModalOpen(false); // Close modal after deletion
      fetchOrdersTable(); // Refresh orders after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const viewInvoice = (id) => {
    window.open(`http://localhost:5000/api/v1/invoices/${id}`, '_blank');
  };

  // Drop Down Menu 
  const handleBatchDeleteConfirm = async () => {
    try {
      await axios.post('http://localhost:5000/api/v1/orders/batch/delete', { orderIds: selectedOrderIds });
      console.log('Batch delete successful');
      setIsBatchDeleteModalOpen(false); // Close modal after deletion
      fetchOrdersTable(); // Refresh orders after deletion
    } catch (error) {
      console.error('Error deleting orders:', error);
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  const handleBatchStatusUpdateClick = () => {
    setIsBatchStatusModalOpen(true);
  };

  // Handle updating batch order status
  const handleBatchStatusUpdate = async (status) => {
    try {
      await axios.post('http://localhost:5000/api/v1/orders/batch/status/update', {
        orderIds: selectedOrderIds,
        status: status
      });
      console.log(`Batch status update to '${status}' successful`);
      setIsBatchStatusModalOpen(false); // Close modal after update
      fetchOrdersTable(); // Refresh orders after update
    } catch (error) {
      console.error('Error updating batch order status:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Failed':
        return 'bg-danger text-danger';
      case 'Completed':
        return 'bg-success text-success';
      case 'On Hold':
        return 'bg-warning text-warning';
      case 'Payment Received':
        return 'bg-success text-success';
      case 'Processing' || 'processing':
        return 'bg-primary text-primary';
      case 'Refunded':
        return 'bg-secondary text-secondary';
      case 'Pending Payment':
        return 'bg-danger text-danger';
      case 'Draft':
        return 'bg-secondary text-secondary';
      default:
        return 'bg-secondary text-secondary';
    }
  };

  useEffect(() => {
    fetchOrdersTable();
  }, []);

  const handleCheckboxChange = (index, orderId) => {
    setCheckedItems(prev => {
      const newCheckedItems = [...prev];
      newCheckedItems[index] = !newCheckedItems[index];

      setSelectedOrderIds(prevIds => {
        if (newCheckedItems[index]) {
          if (!prevIds.includes(orderId)) {
            return [...prevIds, orderId];
          }
        } else {
          return prevIds.filter(id => id !== orderId);
        }
        return prevIds;
      });

      return newCheckedItems;
    });
  };

  const handleSelectAllChange = () => {
    const allChecked = checkedItems.every(item => item);
    setCheckedItems(new Array(orders.length).fill(!allChecked));
    setSelectedOrderIds(!allChecked ? orders.map(order => order.orderId) : []);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
                        onClick={() => setIsBatchDeleteModalOpen(true)}
                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block w-full text-left px-4 py-2 text-sm`}
                      >
                        Delete Selected Products
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleBatchStatusUpdateClick}
                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block w-full text-left px-4 py-2 text-sm`}
                      >
                        Update Status 
                      </button>
                    )}
                  </Menu.Item>

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
            {/* // onClick={openAddModal} */}
            <button
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="w-3 px-4 py-4 text-black font-small text-sm dark:text-white xl:pl-11">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked={checkedItems.every(item => item)}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th className="min-w-[200px] px-4 py-4 text-black font-small text-sm dark:text-white xl:pl-11">
                Package
              </th>
              <th className="min-w-[120px] px-4 py-4 text-sm text-black dark:text-white">
                Invoice date
              </th>
              <th className="min-w-[100px] px-4 py-4 text-sm text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[120px] px-4 py-4 text-sm text-black dark:text-white">
                Purchase Type
              </th>
              <th className="min-w-[120px] px-4 py-4 text-sm text-black dark:text-white">
                Total
              </th>
              <th className="min-w-[100px] px-4 py-4 text-sm text-black dark:text-white">
                Shipping Status
              </th>
              <th className="min-w-[100px] px-4 py-4 text-sm text-black dark:text-white">
                UPI Payment
              </th>
              <th className="px-4 py-4 text-sm text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.orderId}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <input
                    type="checkbox"
                    checked={checkedItems[index]}
                    onChange={() => handleCheckboxChange(index, order.orderId)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="text-sm text-black dark:text-white">
                    {order.billingName}
                  </h5>
                  <p className="text-xs">${order.total}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black text-xs dark:text-white">
                    {new Date(order.invoiceDate).toLocaleDateString()}
                  </p>
                </td>
                <td className="border-b text-xs border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xs ${getStatusClass(order.status)}`}>
                    {order.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black text-xs dark:text-white">
                    {order.purchaseType}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black text-xs dark:text-white">
                    ₹ {order.total}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black text-xs dark:text-white">
                    {order.shippingStatus}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black text-xs dark:text-white">
                    {order.upiPayment ? 'Yes' : 'No'}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary" onClick={() => fetchSingleOrderData(order.orderId)}>
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
                    <button className="hover:text-primary" onClick={handleDeleteClick}>
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
                    <button className="hover:text-primary" onClick={handleDeleteClick}>
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
      <DeleteSingleModal
        isOpen={isDeleteModalOpen}
        onClose={setIsDeleteModalOpen}
        onDelete={handleDeleteConfirm}
      />
      <BatchDeleteModal
        isOpen={isBatchDeleteModalOpen}
        onClose={setIsBatchDeleteModalOpen}
        onDelete={handleBatchDeleteConfirm}
      />
      <BatchOrderStatusUpdateModal
        isOpen={isBatchStatusModalOpen}
        onClose={() => setIsBatchStatusModalOpen(false)}
        onUpdateStatus={handleBatchStatusUpdate}
      />
    </div>
  );
};

export default OrdersTable;
