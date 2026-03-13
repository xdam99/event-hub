import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authSlice } from '../store/auth.slice'; 

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            dispatch(authSlice.actions.logout());
            navigate('/login', { replace: true });
        };

        performLogout();
    }, [dispatch, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <p>Déconnexion en cours...</p>
        </div>
    );
};

export default Logout;