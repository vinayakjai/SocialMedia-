import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.js'
import {Provider as AlertProvider,positions,transitions} from "react-alert";
import Template from "react-alert-template-basic"
import AlertTemplate from 'react-alert-template-basic'

const options={
    positions:positions.BOTTOM_CENTER,
    timeout:5000,
    transitions:transitions.SCALE
}
ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
       <AlertProvider template={AlertTemplate} {...options}>
       <App />
       </AlertProvider>
    </Provider>




)
