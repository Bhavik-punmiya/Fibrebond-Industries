"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Dialog from "@radix-ui/react-dialog";
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const usersTable = () => {
    const [users, setUsers] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [familyOptions, setFamilyOptions] = useState([]);
    const [selectedFamilyOptions, setSelectedFamilyOptions] = useState([]);

    const fetchFamilyNames = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/family/');
            const families = response.data; // This should be an array of family names
            const options = families.map(familyName => ({
                value: familyName,
                label: familyName
            }));
            setFamilyOptions(options);
        } catch (error) {
            console.error('Error fetching family names:', error);
        }
    };

    const animatedComponents = makeAnimated();


    const handleFamilyChange = (selectedOptions) => {
        setSelectedFamilyOptions(selectedOptions);
    };

    const promiseOptions = (inputValue) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(familyOptions.filter((i) =>
                    i.label.includes(inputValue)
                ));
            }, 1000);
        });


    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const openModal = (user) => {
        setSelectedUser(user);
        setSelectedRole(user.role);
        setSelectedFamilyOptions(user.families || []);
        setIsEditModalOpen(true);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Extract family names from selected options
            const familyNames = selectedFamilyOptions.map(option => option.value);
            console.log(selectedRole)
            console.log(selectedUser.email)
            console.log(familyNames)
            // Update the user's role
            const roleResponse = await axios.patch('http://localhost:5000/api/v1/roles/updateRole', {
                email: selectedUser.email,
                role: selectedRole,
            });

            // Assign families to the user
            const familyResponse = await axios.patch('http://localhost:5000/api/v1/family/assign', {
                email: selectedUser.email,
                familyNames: familyNames
            });
            toast.success("Roles & Family Updated Successfully", { position: "top-center", });
            console.log('Role updated successfully:', roleResponse.data);
            console.log('Family updated successfully:', familyResponse.data);
            setIsEditModalOpen(false); // Close the modal after successful update
            // Optionally, refresh the user list to reflect changes
            await fetchUsers();
        } catch (error) {
            toaster.error('Error while Updating', { position: "top-center", })
            console.error('Error updating role and families:', error);
        }
    };


    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/users/');
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchFamilyNames();
        
    }, []);



    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <ToastContainer position="top-center" />
            
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Team members
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div className="mt-3 md:mt-0">

                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Family</th>
                            <th className="py-3 px-6">Role</th>
                            <th className="py-3 px-6">Joined At</th>
                            <th className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {Array.isArray(users) && users.map((user, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.families.map((family, index) => (
                                        <p key={index} className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${family === "Fibre Family"
                                            ? "bg-success text-success"
                                            : family === "RF Family"
                                                ? "bg-danger text-danger"
                                                : "bg-warning text-warning"
                                            }`}>
                                            {family}
                                        </p>
                                    ))}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-3.5">
                                        <button onClick={() => openModal(user)} className="hover:text-primary">
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
                                        {/* Add a button to trigger the modal */}
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

            {/*Edit  Modal */}

            <Dialog.Root open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <Dialog.Trigger as="button" className="sr-only">Open Modal</Dialog.Trigger>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                <Dialog.Content className="fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-8">
                    {/* Modal Content */}
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-lg font-bold mb-4">Update User Roles</h2>
                        <input
                            type="text"
                            id="email-input"
                            aria-label="email input"
                            className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedUser ? selectedUser.email : ''}
                            disabled={!selectedUser}
                        />
                        <input
                            type="text"
                            id="name-input"
                            aria-label="name input"
                            className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedUser ? selectedUser.name : ''}
                            disabled={!selectedUser}
                        />
                        {/* Best React Libray for select React-select */}
                        <div className="max-w-full">


                            <AsyncSelect

                                cacheOptions
                                defaultOptions={familyOptions}
                                loadOptions={promiseOptions}
                                isMulti
                                components={animatedComponents}
                                value={selectedFamilyOptions}
                                onChange={handleFamilyChange}
                            />
                        </div>



                        <div className="relative w-72 max-w-full mx-auto mt-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <select
                                className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                                value={selectedRole}
                                onChange={handleRoleChange} // Bind the value to selectedUser.role
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                                <option value="shopmanager">Shop Manager</option>
                            </select>
                        </div>
                        <button
                            className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg">
                            Update
                        </button>
                        {/* Close button */}

                        <button onClick={() => setIsEditModalOpen(false)} className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-md">Close</button>

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


        </div>
)}

export default usersTable