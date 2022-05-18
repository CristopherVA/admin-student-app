import React from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";

export const HomePage = () => {

  const navegate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full h-screen  bg-amber-200">
      <nav className="flex flex-col">
        <Link to="/student">
          <button
            className="p-6 bg-slate-900 text-white font-bold text-2xl rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300"
            onClick={() => navegate("/student")}
          >
            Ir Administracion de Estudiantes
          </button>
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};