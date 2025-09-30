// src/Pages/TestPage.jsx
import { useEffect, useState } from 'react';

export default function TestPage() {
    const [text, setText] = useState('');

    useEffect(() => {
        setText('Кириллица: Иванов, Петров, Смирнов');
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Roboto, sans-serif' }}>
            <h2>Тест кириллицы</h2>
            <p>{text}</p>
        </div>
    );
}