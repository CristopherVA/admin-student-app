import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createStudent,
  updateStudent,
} from "../toolkit/features/student/studentSlice";
import { confirmLocationUpdate } from "../helpers";
import { cleanStoreEdit } from "../toolkit/features/student/studentSlice";

export const CreateStudentPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  // Datos del formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      dateBirth: "",
      course: "",
    },
  });

  // Datos para actualizar el estudiante
  const { edit } = useSelector((state) => state.student);


  const handleSetValue = () => {
    setValue("name", edit?.name);
    setValue("dateBirth", edit?.dateBirth);
    setValue("course", edit?.course);
  };

  if (confirmLocationUpdate(location.pathname)) {
    handleSetValue();
  }

  // Enviando datos a la peticion para guardar o actualizar
  const onSubmit = ({name, dateBirth, course}) => {

    const dataUpdate = {
      id: edit?.id,
      name,
      dateBirth,
      course
    }

    const dataCreate = {
      name,
      dateBirth,
      course
    }

    if (confirmLocationUpdate(location.pathname)) {
      dispatch(updateStudent(dataUpdate));
    } else {
      dispatch(createStudent(dataCreate));
    }
    navigate("/student");
  };

  const handleCancelar = () => {
    dispatch(cleanStoreEdit());
    navigate("/student");
  };

  return (
    <div className="w-full h-screen bg-neutral-500 text-white flex items-center justify-center font-bold">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg bg-gray-800 w-[50%] p-4 rounded-lg text-white"
      >
        <h1 className="font-bold text-xl text-white mb-2">
          {location.pathname === "/update"
            ? "Actualizar Estudiante"
            : "Crear Estudiante"}
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Nombre
            </label>
            <input
              name="name"
              {...register("name", { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Nombre"
            />
            {errors.name && (
              <span className="text-red-500">El nombre es requerido</span>
            )}
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Fecha de nacimiento
            </label>
            <input
              name="dateBirth"
              {...register("dateBirth", { required: true, maxLength: 10, minLength: 10})}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="date"
              placeholder="99/99/9999"
            />

            {errors.dateBirth && (
              <span className="text-xs text-red-500">
                La fecha de nacimiento es requerido
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              for="grid-password"
            >
              Curso
            </label>
            <input
              name="course"
              {...register("course", { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Curso"
            />
            {errors.course && (
              <span className="text-red-500">El Curso es requerido</span>
            )}

            <div className="flex">
              <button
                type="submit"
                className="w-full mx-2 py-2 px-4 bg-green-500 font-bold text-lg rounded-lg hover:bg-green-300"
              >
                {confirmLocationUpdate(location.pathname)
                  ? "Actualizar"
                  : "Agregar"}
              </button>
              <button
                onClick={handleCancelar}
                className="w-full mx-2 py-2 px-4 bg-red-500 font-bold text-lg rounded-lg hover:bg-red-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
