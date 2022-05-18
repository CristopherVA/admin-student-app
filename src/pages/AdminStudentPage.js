import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Table } from "../components/Table";
import { getAllStudents } from "../toolkit/features/student/studentSlice";
import { useNavigate } from "react-router-dom";

export const AdminStudentPage = () => {
  
  const dispatch = useDispatch();    
  const navigate = useNavigate();

  const handleNavegate = () => {
      navigate("/create");
  }

  useEffect(() => {
    dispatch(getAllStudents())
  }, [dispatch])

  return (
    <div className="">
      <div className="flex justify-between m-auto w-[80%] mb-4 mt-10">
        <div>
          <h2 className="font-bold text-2xl">Pagina Estudiantes</h2>
          <p className="text-xl ">Administracion de los estudiantes.</p>
        </div>

        <div>

          <button
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={handleNavegate}
          >
            Crear Estudiante
          </button>


        </div>
      </div>

      <Table />
    </div>
  );
};
