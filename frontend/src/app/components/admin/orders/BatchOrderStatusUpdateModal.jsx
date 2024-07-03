import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

const BatchOrderStatusUpdateModal = ({ isOpen, onClose, onUpdateStatus }) => {
  const [selectedStatus, setSelectedStatus] = React.useState('');

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateStatus(selectedStatus);
  };

  return (
    <Dialog.Root open={isOpen} onClose={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <Dialog.Content className="fixed top-[55%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-8 min-w-[20%] max-h-[75%] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold mb-4">Batch Order Status Update</h2>

          <div className="mt-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">Select Status</label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={selectedStatus}
              onChange={handleStatusChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Draft">Draft</option>
              <option value="Failed">Failed</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Pending Payment">Pending Payment</option>
              <option value="On Hold">On Hold</option>
              <option value="Refunded">Refunded</option>
              <option value="Payment Received">Payment Received</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Update Status
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default BatchOrderStatusUpdateModal;
