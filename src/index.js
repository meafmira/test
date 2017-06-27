import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import './index.css'
import './styles/stylesheet.css'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/i18next'

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
)
