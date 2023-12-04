import './App.css';
import LoginPage from './Login/LoginPage';
import DashboardPage from './Dashboard/DashboardPage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Layout from './Layout';

function App() {
  return (
    <Router>
    <Layout>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
    </Layout>
</Router>
  );
}

export default App;
