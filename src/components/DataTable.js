import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { formatDate } from "../helpers";
import {
  deleteStudent,
  getOneStudent,
} from "../toolkit/features/student/studentSlice";

export const DataTable = ({ loading }) => {
  const { students } = useSelector((state) => state.student);

  const dispatch = useDispatch();

  const navegate = useNavigate();

  const handleSelectedStudent = (id) => {
    dispatch(getOneStudent(id));
    navegate(`/update`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Seguro?",
      text: "Que quieres eliminar el estudiante?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStudent(id));
        Swal.fire("Estudiante!", `Eliminado correctamente`, "success");
      }
    });
  };

  return (
    <>
      {loading && <h1>Cargando...</h1>}

      {students.map((student) => (
        <tr
          key={student.id}
          className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
        >
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
          >
            {student.name}
          </th>
          <td className="px-6 py-4">{student.course}</td>
          <td className="px-6 py-4">
            {student.status === true ? (
              <span className="bg-green-500 py-2 px-4 rounded-lg text-black">
                Activo
              </span>
            ) : (
              "Inactivo"
            )}
          </td>
          <td className="px-6 py-4">{formatDate(student.createdAt)}</td>
          <td className="px-6 py-4">{formatDate(student.updatedAt)}</td>
          <td className="px-6 py-4">{student.dateBirth}</td>

          <td className="px-6 py-4 text-left flex ">
            <button
              className="font-medium bg-yellow-500 text-black px-4 py-2 mr-3 hover:bg-yellow-600 rounded-lg hover:text-white "
              onClick={() => handleSelectedStudent(student.id)}
            >
              Edit
            </button>
            <button
              className="font-medium bg-red-500 text-black px-4 py-2 hover:bg-red-700 rounded-lg hover:text-white "
              onClick={() => handleDelete(student.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};
