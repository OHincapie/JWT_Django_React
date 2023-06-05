/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const Home = () => {
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ]);
    return (
        <div>
            {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
        </div>
    );
};

const LoggedInView = ({ user }) => {
    return (
        <div>
            <h1 className='text-center text-light'>Welcome {user.username}</h1>
            <div className='w-100 d-flex justify-content-around mt-5'>
                <Link to="/private">
                    <button className="btn" style={{
                        boxShadow: '2px 2px 7px #38d39f70',

                        background: '#38d39f'
                    }}>Private</button>
                </Link>
                <Link to="/logout">
                    <button className="btn btn-light">Logout</button>
                </Link>
            </div>
        </div>
    );
};

export const LoggedOutView = ({ title = 'Home' }) => {
    return (
        <div className="card p-4 text-light" style={{
            background: '#1f1f1f'
        }}>
            <div className="card-body">
                <h1 className='text-center'>{title}</h1>
                <div className='d-flex justify-content-around'>
                    <Link to="/login">
                        <button className="btn w-100" style={{
                            boxShadow: '2px 2px 7px #38d39f70',

                            background: '#38d39f'
                        }}>Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="btn w-100" style={{
                            boxShadow: '2px 2px 7px #38d39f70',

                            background: '#38d39f'
                        }}>Register</button>
                    </Link>

                </div>
            </div>
        </div>

    );
};

export default Home;