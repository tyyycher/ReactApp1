import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const staff = JSON.parse(localStorage.getItem('staff'));
    const navigate = useNavigate();

    if (!staff) {
        navigate('/login');
        return null;
    }

    const logout = () => {
        localStorage.removeItem('staff');
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Админка автосервиса</h1>
                <div>
                    Привет, {staff.name}! <button onClick={logout}>Выйти</button>
                </div>
            </header>

            <nav style={{ marginTop: '30px' }}>
                <h2>Управление</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><a href="/clients" style={{ display: 'block', padding: '8px 0' }}>Клиенты</a></li>
                    <li><a href="/staff" style={{ display: 'block', padding: '8px 0' }}>Сотрудники</a></li>
                    <li><a href="/products" style={{ display: 'block', padding: '8px 0' }}>Товары и услуги</a></li>
                    <li><a href="/categories" style={{ display: 'block', padding: '8px 0' }}>Категории</a></li>
                    <li><a href="/manufacturers" style={{ display: 'block', padding: '8px 0' }}>Производители</a></li>
                    <li><a href="/orders" style={{ display: 'block', padding: '8px 0' }}>Заказы</a></li>
                    <li><a href="/staff" style={{ display: 'block', padding: '8px 0' }}>Сотрудники</a></li>
                </ul>
            </nav>
        </div>
    );
}