import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import user from '../api/auth';

function Header() {
    return (<div className="w-full h-16 bg-white/50 backdrop-blur-md border-b-2 border-neutral-100 sticky p-2.5 flex justify-between items-center">
        <Public />
        <Private />
    </div>)
}

function Public() {  // Static, same whether signed in or not
    return (<>
        <div className="flex gap-2.5 items-center">

        </div>
    </>);
}

function Private() {  // Depends on auth
    const [, setTick] = useState(0);

    useEffect(() => {
        setTick(tick => tick + 1);  // Sync on mount
        user.sync();

        const handleUpdate = () => setTick(tick => tick + 1);
        user.addEventListener(user.CHANGE_EVENT.type, handleUpdate);
        return () => user.removeEventListener(user.CHANGE_EVENT.type, handleUpdate);
    }, [])

    if (user.isAuthenticated) {
        return (
            <div>
                <p className="">{user.username}</p>
            </div>
        );
    }

    // User not logged in, show the public stuff
    return (
        <div className="flex gap-2.5 items-center">
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
        </div>
    );
}

export default Header;