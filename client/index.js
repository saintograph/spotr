import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './app'
import stations from './api/washington_metro'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


injectTapEventPlugin()
const DOM_APP_EL_ID = 'app'

ReactDOM.render(
    <MuiThemeProvider>
        <App stations={ stations } />
    </MuiThemeProvider>
    , document.getElementById(DOM_APP_EL_ID))
