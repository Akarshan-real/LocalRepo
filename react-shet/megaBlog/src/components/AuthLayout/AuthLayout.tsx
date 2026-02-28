import { useEffect, type ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../store/uxSlice';

type Allowable = {
    children: ReactNode,
    authentication: boolean
};

const Protected = ({ children, authentication = true }: Allowable) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authStatus = useSelector((state: any) => state.auth.status);
    const authChecked = useSelector((state: any) => state.ux.authChecked);

    useEffect(() => {
        if (!authChecked) return;

        dispatch(setLoading(true));
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        }
        else if (!authentication && authStatus !== authentication) {
            navigate("/");
        }
        dispatch(setLoading(false));
    }, [authStatus, navigate, authentication, authChecked]);

    return (<>{children}</>);
}

export default Protected;
