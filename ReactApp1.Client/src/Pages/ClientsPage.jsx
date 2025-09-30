import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClientsPage() {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    // �������� ��������
    useEffect(() => {
        const loadClients = async () => {
            try {
                const res = await fetch('https://localhost:7020/api/clients');
                if (!res.ok) throw new Error('�� ������� ��������� ��������');
                const data = await res.json();
                setClients(data);
            } catch (err) {
                console.error(err);
                alert('������ ��� �������� ������');
            }
        };
        loadClients();
    }, []);

    // �������� �������
    const handleDelete = async (id, name) => {
        if (!window.confirm(`������� ������� "${name}"? ��� �������� ������ ��������.`)) {
            return;
        }

        try {
            const res = await fetch(`https://localhost:7020/api/clients/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                // ��������� ������ ��� ������������
                setClients(clients.filter(client => client.ID_Client !== id));
                alert('������ �����');
            } else {
                throw new Error('������ ��� ��������');
            }
        } catch (err) {
            console.error(err);
            alert('�� ������� ������� �������');
        }
    };

    // �������� �����������
    if (!JSON.parse(localStorage.getItem('staff'))) {
        navigate('/login');
        return null;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2>�������</h2>
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
                    �������� �������
                </button>
            </div>

            {clients.length === 0 ? (
                <p>��� ��������</p>
            ) : (
                <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th>ID</th>
                            <th>�������</th>
                            <th>���</th>
                            <th>���</th>
                            <th>�������</th>
                            <th>Email</th>
                            <th>��������</th>
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
                                        �������
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <br />
            <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px' }}>
                ����� � ������ ����������
            </button>
        </div>
    );
}