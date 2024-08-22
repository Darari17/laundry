import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { NextUIProvider } from '@nextui-org/react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { reducers } from './store';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <NextUIProvider>
                <BrowserRouter>
                    <App />
                    <ToastContainer
                        position="top-right"
                        autoClose={3000} // Duration in milliseconds
                        closeButton
                        closeOnClick
                        newestOnTop
                        limit={3} // Limit the number of displayed toasts
                    />
                </BrowserRouter>
            </NextUIProvider>
        </Provider>
    </React.StrictMode>
);
