import React from "react";
import { useSelector } from "react-redux";
import { DataTable } from "./DataTable";

export const Table = () => {
    const { loading } = useSelector((state) => state.student);

    return (
        <div className="relative overflow-x-auto overflow-y mb-8  sm:rounded-lg">
            <table className="m-auto w-[80%] text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Curso
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Creado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actulizado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha de nacimiento
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="overflow-y-scroll">
                    {loading
                        ? (<h1 className="font-bold text-2xl relative top-[300px] left-[640px]">No al datos en la peticion</h1>) 
                        : (<DataTable loading={loading} />)
                    }
                </tbody>
            </table>
        </div>
    );
};
