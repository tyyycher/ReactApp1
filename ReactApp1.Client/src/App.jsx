import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/Dashboard';
import ClientsPage from './Pages/ClientsPage';
import ProductsPage from './Pages/ProductsPage';
import OrdersPage from './Pages/OrdersPage';
import TestPage from './Pages/TestPage';
import StaffPage from './Pages/StaffPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<Dashboard />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/staff" element={<StaffPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;