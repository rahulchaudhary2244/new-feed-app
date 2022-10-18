import './App.css';
import NewsFeedPage from './components/NewsFeedPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import NewsSelectionPage from './components/NewsSelectionPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/news" element={<NewsSelectionPage />} />
                <Route exact path="/news/:id" element={<NewsFeedPage />} />
                <Route path="/*" element={<Navigate to="/news" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
