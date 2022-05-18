import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import studnetReducer from '../features/student/studentSlice'

const reducer = combineReducers({
    student: studnetReducer,
})

export const store = configureStore({
    reducer
})