import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext";
import { AuthProvider } from "./contexts/authContext"; // ⬅️ Import AuthProvider
import { ThemeProvider } from "./contexts/ThemeContext"; // Optional if using ThemeContext globally

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ApplyForm from "./pages/ApplyForm";
import Applications from "./pages/Applications";
import PostJob from "./pages/PostJob";
import { Toaster } from 'sonner';
import EditJob from "./components/EditJob";
import ProtectedRoute from "./protection/ProtectedRoute";
import AdminProtection from "./protection/AdminProtection";
import LoginProtection from "./protection/LoginProtection";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute> } />
              <Route path="/login" element={<LoginProtection><Login /></LoginProtection>} />
              <Route path="/signup" element={<LoginProtection><Signup /></LoginProtection>} />
              <Route path="/apply/:jobId" element={<ProtectedRoute><ApplyForm /></ProtectedRoute>} />
              <Route path="/post-job" element={<AdminProtection><PostJob /></AdminProtection>} />
              <Route path="/applications" element={<AdminProtection><Applications /></AdminProtection>} />
              <Route path="/jobs/edit/:id" element={<AdminProtection><EditJob /></AdminProtection>} />
              <Route path="/jobs/:id" element={<ProtectedRoute> <JobDetails/> </ProtectedRoute>} />
            </Routes>
          </ThemeProvider>
        </SearchProvider>
      </AuthProvider>
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
}

export default App;
