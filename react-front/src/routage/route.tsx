import {createBrowserRouter } from 'react-router-dom';
import News from '../pages/news/news';
import Login from '../pages/login/login';
import Subscription from '../pages/subscription/subscription';
import UserPreference from '../pages/preference/preference';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/news",
      element: <News />,
    },
    {
      path: "/subscribe",
      element: <Subscription />,
    },
    {
      path: "/preference",
      element: <UserPreference />,
    },
]);