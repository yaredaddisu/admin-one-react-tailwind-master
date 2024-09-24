import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import Users from './views/users.jsx';
import UserForm from './views/UserForm.jsx';
import HVACForm from './views/HVACForm.jsx';
import UpdateForm from './views/UpdateForm.jsx';
import Material from './views/Material.jsx';
import ImageUpload from './views/ImageUpload.jsx';
import OrderSlug from './views/OrderSlug.jsx';
import Orders from './views/orders.jsx';
import Jobs from './views/Jobs.jsx';
import JobDetails from './views/JobDetails.jsx';
import AutoLogin from './views/autoLogin.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />,
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />,
      },
      {
        path: '/',
        element: <HVACForm />,
      },
      {
        path: '/orders/:id',
        element: <UpdateForm />,
      },
      {
        path: '/image',
        element: <ImageUpload />,
      },
      {
        path: '/mat',
        element: <Material />,
      },
      {
        path: '/image/:id',
        element: <ImageUpload />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/jobs',
        element: <Jobs />,
      },
      {
        path: "/jobs/:jobId",
        element: <JobDetails />,

         } ,
        

    ],
  },
  {
    path: '/',
    element: <OrderSlug />,
    children: [
     
      {
        path: '/order-by-slug/:id',
        element: <OrderSlug />,
      },
    ],
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/autoLogin',
        element: <AutoLogin />,
      },
    ],
  },
]);

export default router;
