import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { studentFetch } from "../../../hooks/useFetch";

// ------------------ ALL ACTIONS -----------------------

export const getAllStudents = createAsyncThunk("students/get", async () => {
  try {
    const response = await studentFetch("student");
    const body = await response.json();
    return body;
  } catch (error) {
    Swal.fire("Error", `${error.message}`, "error");
  }
});

export const getOneStudent = createAsyncThunk(
  "students/getById",
  async (id) => {
    try {
      const response = await studentFetch(`student/${id}`);
      const body = await response.json();
      return body.student;
    } catch (error) {
      Swal.fire("Error", `${error.message}`, "error");
    }
  }
);

export const createStudent = createAsyncThunk("students/post", async (data) => {
  try {
    const response = await studentFetch(`student`, data, "POST");
    const body = await response.json();
    if (body.ok) {
      Swal.fire("Guardado Correctamente!", `${body.message}`, "success");
    } else {
      Swal.fire("Crear Estudiante", `${body.message}`, "error");
      console.log(body)
      return false;
    }
    return body;
  } catch (error) {
    console.log(error);
    Swal.fire("Error", `${error.message}`, "error");
  }
});

export const updateStudent = createAsyncThunk(
  "students/update",
  async (student) => {
    try {
      const { id, ...rest } = student;
      const response = await studentFetch(`student/${id}`, rest, "PUT");
      const body = await response.json();
      
      if(body.ok) {
        Swal.fire("Actualizacion", `${body.message}`, "success");
      } else {
        Swal.fire("Error Actualizacion", `${body.message}`, "error")
      }

      return body

    } catch (error) {
      console.log(error.message);
      Swal.fire("Error", `${error.message}`, "error");
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id) => {
    try {
      const response = await studentFetch(`student/${id}`, {}, "DELETE");
      const body = await response.json();
      return {
        id, body
      };
    } catch (error) {
      console.log(error);
      Swal.fire("Error", `${error.message}`, "error");
    }
  }
);

// ------------------ END ACTIONS -----------------------

// Initial State
const initialState = {
  students: [],
  loading: false,
  error: null,
  edit: null,
};

// Reducer
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    cleanStoreEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: {
    [getAllStudents.pending]: (state) => {
      state.loading = true;
    },
    [getAllStudents.fulfilled]: (state, action) => {
      state.students = action.payload;
      state.loading = false;
    },
    [getAllStudents.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },

    [getOneStudent.pending]: (state) => {
      state.loading = true;
    },
    [getOneStudent.fulfilled]: (state, action) => {
      state.edit = action.payload;
      state.loading = false;
    },
    [getOneStudent.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },

    [createStudent.pending]: (state) => {
      state.loading = true;
    },
    [createStudent.fulfilled]: (state, action) => {

      state.students = [...state.students, action.payload];
      state.loading = false;
    },
    [createStudent.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
    },

    [updateStudent.pending]: (state) => {
      state.loading = true;
    },
    [updateStudent.fulfilled]: (state, action) => {
      state.edit = null;
      state.loading = false;
    },
    [updateStudent.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },

    [deleteStudent.pending]: (state) => {
      state.loading = true;
    },
    [deleteStudent.fulfilled]: (state, action) => {
      state.students = state.students.filter(student => student.id !== action.payload.id);
      state.loading = false;
    },
    [deleteStudent.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
  },
});

export const { deleteStoreStudent, cleanStoreEdit, updateStoreStudent } = studentSlice.actions;

export default studentSlice.reducer;
