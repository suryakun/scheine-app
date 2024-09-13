import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserPage } from './components/user-page';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="container mx-auto p-4">
          <nav className="mb-4">
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link></li>
              <li><Link to="/users" className="text-blue-500 hover:text-blue-700">Patient Data</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<div />} />
            <Route path="/users" element={<UserPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
