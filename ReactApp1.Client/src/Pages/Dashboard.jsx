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
                <h1>������� �����������</h1>
                <div>
                    ������, {staff.name}! <button onClick={logout}>�����</button>
                </div>
            </header>

            <nav style={{ marginTop: '30px' }}>
                <h2>����������</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><a href="/clients" style={{ display: 'block', padding: '8px 0' }}>�������</a></li>
                    <li><a href="/staff" style={{ display: 'block', padding: '8px 0' }}>����������</a></li>
                    <li><a href="/products" style={{ display: 'block', padding: '8px 0' }}>������ � ������</a></li>
                    <li><a href="/categories" style={{ display: 'block', padding: '8px 0' }}>���������</a></li>
                    <li><a href="/manufacturers" style={{ display: 'block', padding: '8px 0' }}>�������������</a></li>
                    <li><a href="/orders" style={{ display: 'block', padding: '8px 0' }}>������</a></li>
                    <li><a href="/staff" style={{ display: 'block', padding: '8px 0' }}>����������</a></li>
                </ul>
            </nav>
        </div>
    );
}