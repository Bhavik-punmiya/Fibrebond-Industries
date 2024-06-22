"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import * as Dialog from '@radix-ui/react-dialog';

const FamilyManagement = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // For adding a new family
    // Fetching all the Data
    const [familyData, setFamilyData] = useState([]);
    const [plans, setPlans] = useState([]);
    // For Open Modals and Edit
    const [selectedPlans, setSelectedPlans] = useState([]);
    const [selectedFamily, setSelectedFamily] = useState(null);
    const [newFamilyName, setNewFamilyName] = useState(''); // New family name

    const fetchFamilyData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/family');
            const data = await response.json();
            setFamilyData(data);
        } catch (error) {
            console.error('Error fetching family data:', error);
        }
    };

    const fetchPlans = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/plans');
            const fetchedPlans = response.data.map(plan => ({
                value: plan.planName,
                label: plan.planName,
            }));
            console.log('Fetched plans:', fetchedPlans)
            setPlans(fetchedPlans);
        } catch (error) {
            console.error('Error fetching plans:', error);
            toast.error('Error fetching plans');
        }
    };

    const animatedComponents = makeAnimated();

    const handlePlanChange = (selectedOptions) => {
        setSelectedPlans(selectedOptions);
    };

    const openModal = (familyItem) => {
        const selectedFamilyPlans = familyItem.plans.map(planName => ({
            value: planName,
            label: planName
        }));

        setSelectedFamily(familyItem);
        setSelectedPlans(selectedFamilyPlans);
        setIsEditModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch('http://localhost:5000/api/v1/family/update-plans', {
                familyName: selectedFamily.familyName,
                plans: selectedPlans.map(plan => plan.value)
            });
            console.log('Response:', response.data)
            if (response.status === 200) {
                toast.success('Family plans updated successfully', { position: "top-center" });
                fetchFamilyData(); // Refresh the family data
                setIsEditModalOpen(false);
            } else {
                toast.error('Error updating family plans', { position: "top-center" });
            }
        } catch (error) {
            toast.error('Error while updating', { position: "top-center" });
            console.error('Error updating family names and plans:', error);
        }
    };

    const handleDelete = async (familyName) => {
        try {
            const response = await axios.delete('http://localhost:5000/api/v1/family', {
                data: { familyName }
            });

            if (response.status === 200) {
                toast.success('Family deleted successfully', { position: "top-center" });
                fetchFamilyData(); // Refresh the family data table
            } else {
                toast.error('Error deleting family', { position: "top-center" });
            }
        } catch (error) {
            toast.error(`Error deleting family: ${error.message}`, { position: "top-center" });
            console.error('Error deleting family:', error);
        }
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
        setSelectedPlans([]);
        setNewFamilyName('');
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/v1/family', {
                familyName: newFamilyName,
                plans: selectedPlans.map(plan => plan.value)
            });

            if (response.status === 201) {
                toast.success('Family created successfully', { position: "top-center" });
                fetchFamilyData(); // Refresh the family data
                setIsAddModalOpen(false);
            } else {
                toast.error('Error creating family', { position: "top-center" });
            }
        } catch (error) {
            toast.error(`Error while creating family: ${error.message}`, { position: "top-center" });
            console.error('Error creating family:', error);
        }
    };

    useEffect(() => {
        fetchPlans();
        fetchFamilyData();
    }, []);


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Family Management
                    </h3>
                    <p className="text-gray-600 mt-2">
                        You Can Edit, Create and Delete Family Here
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                    <button
                        onClick={openAddModal}
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add Family
                    </button>
                </div>
            </div>

            <div className="max-w-full mt-5 overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Family Name
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Plans
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {familyData.map((familyItem, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {familyItem.familyName}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    {familyItem.plans.map((plan, index) => (
                                        <p
                                            key={index}
                                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${plan === "360 plan" || plan === "FullDay plan" || plan === "All30 Plan"
                                                ? "bg-success text-success"
                                                : plan === "120 plan"
                                                    ? "bg-warning text-warning"
                                                    : "bg-danger text-danger"
                                                }`}
                                        >
                                            {plan}
                                        </p>
                                    ))}
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button onClick={() => openModal(familyItem)} className="hover:text-primary">
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
                                        <button className="hover:text-primary" onClick={() => setIsDeleteModalOpen(true)}>
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
                                                    d="M9.00016 7.26562C8.57204 7.26562 8.22579 7.61187 8.22579 8.04002V13.7681C8.22579 14.1962 8.57204 14.5425 9.00016 14.5425C9.42829 14.5425 9.77454 14.1962 9.77454 13.7681V8.04002C9.77454 7.61187 9.42829 7.26562 9.00016 7.26562Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M11.5879 7.26562C11.1598 7.26562 10.8135 7.61187 10.8135 8.04002V13.7681C10.8135 14.1962 11.1598 14.5425 11.5879 14.5425C12.016 14.5425 12.3623 14.1962 12.3623 13.7681V8.04002C12.3623 7.61187 12.016 7.26562 11.5879 7.26562Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M6.41273 7.26562C5.9846 7.26562 5.63835 7.61187 5.63835 8.04002V13.7681C5.63835 14.1962 5.9846 14.5425 6.41273 14.5425C6.84085 14.5425 7.1871 14.1962 7.1871 13.7681V8.04002C7.1871 7.61187 6.84085 7.26562 6.41273 7.26562Z"
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
            <Dialog.Root open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <Dialog.Trigger as="button" className="sr-only">Open Modal</Dialog.Trigger>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-8">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-lg font-bold mb-4">Update User Roles</h2>
                        <div className="max-w-full">
                            {/* loadOptions={promiseOptions} */}
                            <input
                                type="text"
                                id="email-input"
                                aria-label="email input"
                                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={selectedFamily ? selectedFamily.familyName : ''}
                                disabled={!selectedFamily}
                            />
                            <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                defaultValue={selectedPlans}
                                isMulti
                                value={selectedPlans}
                                options={plans}
                                onChange={handlePlanChange}
                            />
                        </div>
                        {/* Add similar select for plans if needed */}
                        <button onClick={handleSubmit} className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg mt-4">Update</button>
                        <button onClick={() => setIsEditModalOpen(false)} className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-md">Close</button>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
            {/* Add Modal */}
            <Dialog.Root open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
    <Dialog.Content className="fixed top-[55%] left-[60%] transform -translate-x-1/2  -translate-y-1/2 bg-white rounded-md shadow-lg p-8 min-w-[75%] min-h-[75%]">
        <form onSubmit={handleAddSubmit}>
            <h2 className="text-lg font-bold mb-4">Add New Family</h2>
            <div className="max-w-full">
                <input
                    type="text"
                    id="family-name-input"
                    name="familyName"
                    aria-label="Family Name Input"
                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Family Name"
                    value={newFamilyName}
                    onChange={(e) => setNewFamilyName(e.target.value)}
                    required
                />
                <div className="max-h-[5%]">
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    value={selectedPlans}
                    options={plans}
                    onChange={handlePlanChange}
                    className="max-w-[30%]"
                />
                </div>
                
            </div>
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                File upload
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-white dark:text-black">
                  Attach file
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
              </div>
            <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg mt-4">Add Family</button>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-md">Close</button>
        </form>
    </Dialog.Content>
</Dialog.Root>

            {/* Delete Modal */}
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
                                    An error occurred!
                                </Dialog.Title>
                                <Dialog.Description className="mt-2 text-sm leading-relaxed text-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
                                    eget lorem dolor sed viverra ipsum nunc. venenatis.
                                </Dialog.Description>
                                <div className="items-center gap-2 mt-3 text-sm sm:flex">
                                    <Dialog.Close asChild>
                                        <button
                                            onClick={() => handleDelete(selectedFamily.familyName)}
                                            aria-label="Delete"
                                            className="w-full mt-2 p-2.5 flex-1 bg-red-600 text-white rounded-md border ring-offset-2 ring-indigo-600 focus:ring-2"
                                        >
                                            Delete
                                        </button>
                                    </Dialog.Close>
                                    <Dialog.Close asChild>
                                        <button
                                            aria-label="Cancel"
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
        </div>
    );
};

export default FamilyManagement;
