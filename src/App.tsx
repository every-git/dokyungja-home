
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Layout } from './components/layout/Layout';

import JourneyDetail from './pages/JourneyDetail';

function App() {
    return (
        <BrowserRouter>
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
    );
}

export default App;
