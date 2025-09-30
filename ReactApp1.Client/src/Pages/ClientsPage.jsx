import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClientsPage() {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    // Загрузка клиентов
    useEffect(() => {
        const loadClients = async () => {
            try {
                const res = await fetch('https://localhost:7020/api/clients');
                if (!res.ok) throw new Error('Не удалось загрузить клиентов');
                const data = await res.json();
                setClients(data);
            } catch (err) {
                console.error(err);
                alert('Ошибка при загрузке данных');
            }
        };
        loadClients();
    }, []);

    // Удаление клиента
    const handleDelete = async (id, name) => {
        if (!window.confirm(`Удалить клиента "${name}"? Это действие нельзя отменить.`)) {
            return;
        }

        try {
            const res = await fetch(`https://localhost:7020/api/clients/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                // Обновляем список без перезагрузки
                setClients(clients.filter(client => client.ID_Client !== id));
                alert('Клиент удалён');
            } else {
                throw new Error('Ошибка при удалении');
            }
        } catch (err) {
            console.error(err);
            alert('Не удалось удалить клиента');
        }
    };

    // Проверка авторизации
    if (!JSON.parse(localStorage.getItem('staff'))) {
        navigate('/login');
        return null;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2>Клиенты</h2>
                <button
                    onClick={() => navigate('/clients/add')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Добавить клиента
                </button>
            </div>

            {clients.length === 0 ? (
                <p>Нет клиентов</p>
            ) : (
                <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th>ID</th>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Пол</th>
                            <th>Телефон</th>
                            <th>Email</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.ID_Client}>
                                <td>{client.ID_Client}</td>
                                <td>{client.Surname}</td>
                                <td>{client.Name}</td>
                                <td>{client.Gender}</td>
                                <td>{client.Phone_Number}</td>
                                <td>{client.Email}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(client.ID_Client, `${client.Surname} ${client.Name}`)}
                                        style={{
                                            padding: '4px 8px',
                                            backgroundColor: '#f44336',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <br />
            <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px' }}>
                Назад в панель управления
            </button>
        </div>
    );
}