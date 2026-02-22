import AppLayout from './layout/AppLayout';
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import Verify from './features/auth/Verify';
import Secret from './pages/Secret';

const routes = [
    {
        path: '/', element: <AppLayout />, children: [
            { index: true, element: <Secret /> },
        ],
    },
    {
        path: 'register', element: <AppLayout />, children: [
            { index: true, element: <Register /> },
        ]
    },
    {
        path: 'login', element: <AppLayout />, children: [
            { index: true, element: <Login /> },
        ]
    },
    {
        path: 'verify/:token', element: <AppLayout />, children: [
            { index: true, element: <Verify /> },
        ]
    }
];

export default routes;