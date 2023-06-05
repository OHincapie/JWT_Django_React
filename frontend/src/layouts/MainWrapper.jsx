/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { setUser } from '../utils/auth';

const MainWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const handler = async () => {
            setLoading(true);
            await setUser();
            setLoading(false);
        };
        handler();
    }, []);

    return <>{loading ? (<h2>Cargando...</h2>) : children}</>;
};

export default MainWrapper;