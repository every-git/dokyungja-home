
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Layout } from './components/layout/Layout';
import { LoadingScreen } from './components/common/LoadingScreen';

import JourneyDetail from './pages/JourneyDetail';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasVisited, setHasVisited] = useState(false);

    useEffect(() => {
        // Check if user has already visited this session
        const visited = sessionStorage.getItem('hasVisitedDokyungja');
        if (visited) {
            setIsLoading(false);
            setHasVisited(true);
        }
    }, []);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        sessionStorage.setItem('hasVisitedDokyungja', 'true');
    };

    return (
        <>
            {isLoading && !hasVisited && (
                <LoadingScreen onComplete={handleLoadingComplete} minDuration={2500} />
            )}
            <BrowserRouter basename="/dokyungja-home">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/journey/:id" element={<JourneyDetail />} />
                    {/* Placeholder routes for now */}
                    <Route path="/tech" element={<Layout><div className="p-20 text-center">Tech Blog (Coming Soon)</div></Layout>} />
                    <Route path="/economy" element={<Layout><div className="p-20 text-center">Economy Blog (Coming Soon)</div></Layout>} />
                    <Route path="/shop" element={<Layout><div className="p-20 text-center">Shopping Mall (Coming Soon)</div></Layout>} />
                    <Route path="/gallery" element={<Layout><div className="p-20 text-center">Gallery (Coming Soon)</div></Layout>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
