// src/ProductsPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await fetch('https://localhost:7020/api/products');
                if (!res.ok) throw new Error('������ �������� �������');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
                alert('�� ������� ��������� ������');
            }
        };
        loadProducts();
    }, []);

    const staff = JSON.parse(localStorage.getItem('staff'));
    if (!staff) {
        navigate('/login');
        return null;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>������ � ������</h2>
            <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th>ID</th>
                        <th>��������</th>
                        <th>���������</th>
                        <th>�������������</th>
                        <th>����</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.ID_Product}>
                            <td>{p.ID_Product}</td>
                            <td>{p.Title}</td>
                            <td>{p.Category?.Title || '�'}</td>
                            <td>{p.Manufacturer?.Company_Name || '�'}</td>
                            <td>{p.Price.toFixed(2)} ?</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px' }}>
                ����� � ������ ����������
            </button>
        </div>
    );
}