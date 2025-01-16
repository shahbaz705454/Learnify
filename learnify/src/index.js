import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './Reducer';
import { configureStore } from '@reduxjs/toolkit';
import {Toaster} from "react-hot-toast"


const root = ReactDOM.createRoot(document.getElementById('root'));
const store =configureStore({
    reducer:rootReducer,
})
root.render(


    <Provider store={store}>

        <BrowserRouter>
            <App />
            <Toaster></Toaster>
        </BrowserRouter>
    </Provider>

);


