import React, { useState, useEffect, ReactElement } from 'react';
import FormField from './Form/Field';
import CardBox from './CardBox';
import LayoutAuthenticated from '../layouts/Authenticated';
import { useDispatch } from 'react-redux';
import { registerUser, updateUser } from '../store/authSlice'; // Import your Redux actions
import axios from 'axios';
import { Field } from 'formik';
import FormCheckRadio from './Form/CheckRadio';
import FormCheckRadioGroup from './Form/CheckRadioGroup';
interface UserFormData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  chat_id: string;
  username: string;
  role: string;
  status: string;
  availability: string;
  skills: any[];
  experience: string;
 
}
const RegistrationForm = ({ userData, onClose, getUsers }) => {
  const roles = [
    { id: 1, role: 'Admin' },
    { id: 2, role: 'Finance' },
    { id: 3, role: 'Technician' },
  ];

 
  const skillsOptions = [
    { id: 1, name: "Others" },
    { id: 2, name: "TV" },
    { id: 3, name: "Washing Machine" },
    { id: 4, name: "Dish Expert" },
    { id: 5, name: "Fridge Expert" },
    { id: 6, name: "Electrician" },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);


// In your component or context where formData is defined
const [formData, setFormData] = useState<UserFormData>({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  chat_id: '',
  username: '',
  role: '',
  status: '1',
  availability: '1',
  skills: [],
  experience: ' '
});



  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

 
  useEffect(() => {
    if (userData) {
      setIsEditing(true);
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
        skills: userData.skills || [],
        experience: userData.experience || ' '
      });

      // Pre-fill selected skills
      setSelectedOptions(userData.skills || []);
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
    // Synchronize selectedOptions with formData.skills
    useEffect(() => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: selectedOptions, // Update skills in formData
      }));
    }, [selectedOptions]);
  // Handle skill checkbox toggle
  const handleCheckboxChange = (option) => {
    const skillIndex = selectedOptions.findIndex((item) => item.id === option.id);
    if (skillIndex > -1) {
      // Remove if already selected
      setSelectedOptions(selectedOptions.filter((item) => item.id !== option.id));
    } else {
      // Add the selected skill
      setSelectedOptions([...selectedOptions, option]);
    }
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

    if (formData.id) {
      axios.put(`/api/users`, userPayload)
        .then((res) => {
          
          setLoading(false);
          getUsers();
          resetFormData()
          setSuccess(res.data.message);
          onClose();
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            const errors = response.data.errors;
          
            // Iterate over each field in the errors object
            Object.keys(errors).forEach((field) => {
              // Each field contains an array of error messages, loop through the array
              errors[field].forEach((errorMessage) => {
               
              });
            });
          }
          
          setLoading(false);
        });
    } else {
      axios.post('/api/users', userPayload)
        .then((res) => {
         
          setLoading(false);
          getUsers();
          resetFormData()
          setSuccess(res.data.message);
          onClose();
        })
        .catch((err) => {
          const response = err.response;
           if (response && response.status === 422) {
            const errors = response.data.errors;
          
            // Iterate over each field in the errors object
            Object.keys(errors).forEach((field) => {
              // Each field contains an array of error messages, loop through the array
              errors[field].forEach((errorMessage) => {
               
              });
            });
          }
          
          setLoading(false);
        });
    }
  };

// Reset function
const resetFormData = () => {
  setFormData({ 
    id: '', 
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    chat_id: '', // Resetting the field
    username: '', // Resetting the field
    role: '',
    status: '',
    availability: '',
    skills: [] ,
    experience: '', 
  });
}
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
        {/* {errors.general && <div className="alert">{errors.general}</div>} */}
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
        <div>
           <h2>Select Your Expertise</h2>
       
          {skillsOptions.map((option) => (
            <div key={option.id} className="checkbox-item">
              <input
                type="checkbox"
                id={`skill_${option.id}`}
                value={option.name}
                checked={selectedOptions.some((item) => item.id === option.id)}
                onChange={() => handleCheckboxChange(option)} />
              <label htmlFor={`skill_${option.id}`}>{option.name}</label>
            </div>
          ))}
      
        </div>
        <FormField>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
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
