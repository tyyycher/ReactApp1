// src/OrdersPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const res = await fetch('https://localhost:7020/api/orders');
                if (!res.ok) throw new Error('Ошибка загрузки заказов');
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error(err);
                alert('Не удалось загрузить заказы');
            }
        };
        loadOrders();
    }, []);

    const staff = JSON.parse(localStorage.getItem('staff'));
    if (!staff) {
        navigate('/login');
        return null;
    }

    // Формат даты: ДД.ММ.ГГГГ ЧЧ:ММ
    const formatDate = (isoString) => {
        const d = new Date(isoString);
        return d.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Заказы</h2>
            <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th>ID</th>
                        <th>Клиент</th>
                        <th>Сотрудник</th>
                        <th>Дата</th>
                        <th>Статус</th>
                        <th>Сумма</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o.ID_Order}>
                            <td>{o.ID_Order}</td>
                            <td>{o.Client ? `${o.Client.Surname} ${o.Client.Name}` : '—'}</td>
                            <td>{o.Staff ? `${o.Staff.Surname} ${o.Staff.Name}` : '—'}</td>
                            <td>{formatDate(o.Date_Orders)}</td>
                            <td>{o.Status}</td>
                            <td>{o.General_sume.toFixed(2)} ?</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px' }}>
                Назад в панель управления
            </button>
        </div>
    );
}