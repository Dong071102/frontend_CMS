import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';
import HomePage from '../pages/home/homePage';
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </Router>
    )
}
export default AppRouter;