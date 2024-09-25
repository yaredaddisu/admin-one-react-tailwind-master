import React, { useState, useEffect, ReactElement } from 'react';
import FormField from './Form/Field';
import CardBox from './CardBox';
import LayoutAuthenticated from '../layouts/Authenticated';
import { useDispatch } from 'react-redux';
import { registerUser, updateUser } from '../store/authSlice'; // Import your Redux actions

const RegistrationForm = ({ userData, onClose, getUsers }) => {
  const roles = [
    { id: 1, role: 'Admin' },
    { id: 2, role: 'Finance' },
    { id: 3, role: 'Technician' },
  ];

  const [formData, setFormData] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    chat_id: '',
    username: '',
    role: '3',
    status: '1',
    availability: '1',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    if (userData) {
      setFormData({
        id: userData.id || null,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        password: '',
        chat_id: userData.chat_id || '',
        username: userData.username || '',
        role: userData.role || '1',
        status: userData.status || '1',
        availability: userData.availability || '1',
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleToggleStatus = () => {
    setFormData((prevData) => ({
      ...prevData,
      status: prevData.status === '1' ? '0' : '1',
    }));
  };

  const handleTogglevailability = () => {
    setFormData((prevData) => ({
      ...prevData,
      availability: prevData.availability === '1' ? '0' : '1',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const userPayload = { ...formData };

    const action = formData.id ? updateUser : registerUser; // Choose action based on existence of ID
    const apiCall = formData.id 
      ? dispatch(action({ id: formData.id, ...userPayload })) // Update user
      : dispatch(action(userPayload)); // Register user

    apiCall.then((res) => {
      setLoading(false);
      console.log(res.error)
      if(!res.error){
        setSuccess(res.message); // Set success message
        getUsers(); // Refresh user list
        onClose(); // Close form
      }
    
    }).catch((err) => {
      setLoading(false);
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors); // Handle validation errors
      } else {
        setErrors({ general: 'An error occurred. Please try again.' }); // General error
      }
    });
  };

  // Clear messages after a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors({});
      setSuccess(null);
    }, 10000);
    return () => clearTimeout(timer);
  }, [errors, success]);

  return (
    <CardBox>
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && <div className="alert">{errors.general}</div>}
        {success && (
          <div>
            <span className="inline-flex w-full items-center justify-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
              {success}
            </span>
          </div>
        )}
        
        <FormField>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="chat_id"
            value={formData.chat_id}
            onChange={handleChange}
            placeholder="Chat ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.role}
              </option>
            ))}
          </select>
        </FormField>

        {userData && (
          <>
            <div className="flex items-center mb-4">
              <button
                type="button"
                onClick={handleToggleStatus}
                className={`px-4 py-2 rounded-md text-white ${formData.status === '1' ? 'bg-green-500' : 'bg-red-500'}`}
              >
                {formData.status === '1' ? 'Active' : 'Inactive'}
              </button>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleTogglevailability}
                className={`px-4 py-2 rounded-md text-white ${formData.availability === '1' ? 'bg-green-500' : 'bg-red-500'}`}
              >
                {formData.availability === '1' ? 'Available' : 'Unavailable'}
              </button>
            </div>
          </>
        )}

        <button
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="submit"
          disabled={isLoading}
        >
          {formData.id ? 'Update' : 'Register'}
        </button>
      </form>
    </CardBox>
  );
};

RegistrationForm.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default RegistrationForm;
