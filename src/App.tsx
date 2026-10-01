import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Portfolio } from './pages/Portfolio'

/**
 * Two routes only: `/` is French (the default for a first-time visitor) and
 * `/en` is the English version. Any other path falls back to French.
 *
 * The basename is derived from the Vite `base` (`/portfolio/` on GitHub Pages
 * project sites), so `/` and `/en` keep matching under the sub-path.
 */
export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Routes>
        <Route path="/" element={<Portfolio language="fr" />} />
        <Route path="/en" element={<Portfolio language="en" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
