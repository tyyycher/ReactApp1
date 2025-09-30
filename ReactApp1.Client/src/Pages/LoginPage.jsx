import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('https://localhost:7020/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Login: login, Password: password }) // ? Исправлено!
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('staff', JSON.stringify(data));
            navigate('/dashboard');
        } else {
            alert(data.message || 'Ошибка входа');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '100px auto' }}>
            <h2>Вход в админку</h2>
            <form onSubmit={handleLogin}>
                <input value={login} onChange={e => setLogin(e.target.value)} placeholder="Логин" required style={{ display: 'block', width: '100%', padding: '8px', margin: '8px 0' }} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" required style={{ display: 'block', width: '100%', padding: '8px', margin: '8px 0' }} />
                <button type="submit" style={{ width: '100%', padding: '10px' }}>Войти</button>
            </form>
        </div>
    );
}