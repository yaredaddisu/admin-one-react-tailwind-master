import React, { useState, useEffect, ReactElement } from 'react';
import FormField from './Form/Field';
import CardBox from './CardBox';
// import { useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';
import LayoutAuthenticated from '../layouts/Authenticated'

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
    avalability: '1',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState(null);
 
//   const navigate = useNavigate();

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
        avalability: userData.avalability || '1',
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

  const handleToggleAvalability = () => {
    setFormData((prevData) => ({
      ...prevData,
      avalability: prevData.avalability === '1' ? '0' : '1',
    }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const userPayload = { ...formData };
  
    console.log('Request headers:', axiosClient.defaults.headers);
  
    if (formData.id) {
      axiosClient.put(`/users-registration/${formData.id}`, userPayload)
        .then((res) => {
          setLoading(false);
          getUsers();
          setSuccess(res.data.message);
          onClose();
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
          setLoading(false);
        });
    } else {
      axiosClient.post('/users-registration', userPayload)
        .then((res) => {
          setLoading(false);
          getUsers();
          setSuccess(res.data.message);
          onClose();
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
          setLoading(false);
        });
    }
  };
  
  setTimeout(() => {
    setErrors(null); // Clear the errors
     
    setSuccess(null); // Clear the errors
  
  }, 10000);

  return (

    <CardBox>
    <form onSubmit={handleSubmit} className="space-y-4">
         {errors && (
      <div className="alert">
        {typeof errors === "string" ? <p>{errors}</p> : Object.keys(errors).map(key => (<p key={key}>{errors[key][0]}</p>))}
      </div>
    )}
{success && (
      <div  >
         <span className="inline-flex w-full items-center justify-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
         {typeof success === "string" ? <p>{success}</p> : Object.keys(success).map(key => (<p key={key}>{success[key][0]}</p>))}

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

      <><div className="flex items-center mb-4">
          <button
            type="button"
            onClick={handleToggleStatus}
            className={`px-4 py-2 rounded-md text-white ${formData.status === '1' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {formData.status === '1' ? 'Active' : 'Inactive'}
          </button>
        </div><div className="flex items-center">
            <button
              type="button"
              onClick={handleToggleAvalability}
              className={`px-4 py-2 rounded-md text-white ${formData.avalability === '1' ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {formData.avalability === '1' ? 'Available' : 'Unavailable'}
            </button>
          </div></>
)}
      <button
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="submit"
        disabled={isLoading}
      >
        {formData.id ? 'Update' : 'Register'}
      </button>
    </form>
    
    </CardBox >
  );
};
RegistrationForm.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}
export default RegistrationForm;
