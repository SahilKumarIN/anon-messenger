import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/user-auth-context.jsx";
import { DbProvider } from "./context/db-context.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <div className="container min-h-screen flex flex-col items-center bg-slate-700 ">
    <AuthProvider>
      <DbProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </DbProvider>
    </AuthProvider>
  </div>
);
