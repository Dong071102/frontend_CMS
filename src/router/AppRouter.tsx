import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login/Login';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
              
            </Routes>
        </Router>
    )
}
export default AppRouter;