import Header from './Header';
import { Outlet } from 'react-router';

function AppLayout() {
    return (<>
        <Header />
        <div className="p-5 m-auto max-w-5xl">
            <Outlet />
        </div>
    </>);
}

export default AppLayout;