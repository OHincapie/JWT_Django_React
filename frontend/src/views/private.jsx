import { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import { Link } from 'react-router-dom';

const Private = () => {
    const [res, setRes] = useState('');
    const [posRes, setPostRes] = useState('');
    const api = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/test/');
                setRes(response.data.response);
            } catch (error) {
                setPostRes(error.response.data);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/test/', {
                text: e.target[0].value,
            });
            setPostRes(response.data.response);
        } catch (error) {
            setPostRes(error.response.data);
        }
    };
    return (
        <div className="d-flex flex-column">
            <Link to='/logout' className='ms-auto'>
                <button className='btn btn-light'>Log out</button>
            </Link>
            <div className="card p-4 text-light" style={{
                background: '#1f1f1f'
            }}>
                <div className="card-body text-center">
                    <h1>Private</h1>
                    <p>{res}</p>
                    <form className='d-flex justify-content-center gap-3 m-4' method="POST" onSubmit={handleSubmit}>
                        <input className='p-2 w-75' type="text" placeholder="Enter Text" />
                        <button className='p-2 btn btn-principal w-25' type="submit">Submit</button>
                    </form>
                    {posRes && <p>{posRes}</p>}
                </div>
            </div>


        </div>
    );
};

export default Private;