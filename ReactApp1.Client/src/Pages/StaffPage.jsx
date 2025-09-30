// src/Pages/StaffPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StaffPage() {
    const [staffList, setStaffList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadStaff = async () => {
            const res = await fetch('https://localhost:7020/api/staff');
            const data = await res.json();
            setStaffList(data);
        };
        loadStaff();
    }, []);

    if (!JSON.parse(localStorage.getItem('staff'))) {
        navigate('/login');
        return null;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Сотрудники</h2>
            <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th>ID</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Должность</th>
                        <th>Email</th>
                        <th>Телефон</th>
                    </tr>
                </thead>
                <tbody>
                    {staffList.map(s => (
                        <tr key={s.ID_Staff}>
                            <td>{s.ID_Staff}</td>
                            <td>{s.Surname}</td>
                            <td>{s.Name}</td>
                            <td>{s.Position}</td> {/* ?? Новое поле */}
                            <td>{s.Email}</td>
                            <td>{s.Number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button onClick={() => navigate('/dashboard')}>Назад</button>
        </div>
    );
}