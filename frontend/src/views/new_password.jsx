import { useEffect, useState } from "react"
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../utils/auth";

export const NewPassword = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        setConfirmPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await updatePassword(username, password);
        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate('/login');
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
                <h2 className="text-center mb-4 ">Nueva contraseña</h2>
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
                        <input type="password" className="form-control" id="confirm-password" placeholder="Ingrese su contraseña" value={confirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value) }} required />
                    </div>
                    <p>
                        {confirmPassword !== password ? 'Passwords do not match' : ''}
                    </p>
                    <button type="submit" className="btn w-100" style={{
                        boxShadow: '2px 2px 7px #38d39f70',
                        background: '#38d39f'
                    }} disabled={confirmPassword !== password}> Cambiar clave </button>
                </form>
                <div className="text-center mt-3">
                    <a onClick={handleNavigate} className="text-light">¿Ya tienes cuenta?, Ingresa aqui.</a>
                </div>
            </div>
        </div>
    )
}
