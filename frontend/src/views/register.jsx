import { useEffect, useState } from 'react';
import { register } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setPassword2('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await register(username, password, password2);
        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate('/');
            resetForm();
        }
    };

    const handleNavigate = async (e) => {
        e.preventDefault();
        navigate('/login');
        resetForm();
    };

    return (
        <div className="card p-4 text-light" style={{
            background: '#1f1f1f'
        }}>
            <div className="card-body">
                <h2 className="text-center mb-4 ">Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label  fw-bold">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Ingrese su username" value={username}
                            onChange={(e) => { setUsername(e.target.value) }} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label  fw-bold">Contraseña</label>
                        <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" value={password}
                            onChange={(e) => { setPassword(e.target.value) }} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirm-password" className="form-label  fw-bold">Confirma contraseña</label>
                        <input type="password" className="form-control" id="confirm-password" placeholder="Ingrese su contraseña" value={password2}
                            onChange={(e) => { setPassword2(e.target.value) }} required />
                    </div>
                    <p>
                        {password2 !== password ? 'Passwords do not match' : ''}
                    </p>
                    <button type="submit" className="btn w-100" style={{
                        boxShadow: '2px 2px 7px #38d39f70',

                        background: '#38d39f'
                    }}>Registrarse</button>
                </form>
                <div className="text-center mt-3">
                    <a onClick={handleNavigate} className="text-light">¿Ya tienes cuenta?, Ingresa aqui.</a>
                </div>
            </div>
        </div>
    );
}

export default Register;