import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";

import api from "../../api/api";
import user from "../../api/auth";

function Verify() {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await user.sync();
            if (user.isAuthenticated) {
                navigate('/');
                return;
            }

            const response = await api.publicPost('verify', { token: params.token });
            if (api.evaluateResponse(response)) {  // Successful login
                if (typeof response.username === 'string') {
                    user.logIn(response.username);
                    navigate('/');  // Redirect to the main page
                }
            } else {
                // Verify failed, show something went wrong message.
                // Also redirect, since verify endpoint is sorta sensitive.
            }
        })();
    }, []);

    return (<>
        <p>Verifying...</p>
    </>)
}
export default Verify;