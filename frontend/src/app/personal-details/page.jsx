"use client";

import React, { useState } from 'react';
import PersonalDetailsForm from '../components/PersonalForm';

const PersonalDetailsPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    // Initial form data can be set here
  });
  const [savedData, setSavedData] = useState(formData);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setSavedData(formData);
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    setFormData(savedData); // Revert changes
    setIsEditMode(false);
  };

  const handleFormChange = (newData) => {
    setFormData(newData);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div className="flex justify-between w-full max-w-8xl p-14">
        <div className="bg-white w-1/4 mr-8 p-10 border-4 rounded-3xl">
          {/* Content for the first smaller div */}
        </div>
        <div className="bg-white w-3/4 p-20 border-4 rounded-3xl">
          {!isEditMode ? (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-4"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleSaveClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded mb-4 mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded mb-4"
              >
                Cancel
              </button>
            </>
          )}
          {isEditMode ? (
            <PersonalDetailsForm data={formData} onChange={handleFormChange} />
          ) : (
            <div>
              {/* Placeholder for DisplayPage or the saved data */}
              <pre>{JSON.stringify(savedData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsPage;
