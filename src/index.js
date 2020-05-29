import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

function render (APP) {
    ReactDOM.render(<APP />, document.getElementById('app'))
}
  
render(App)
  
if (module.hot) {
    module.hot.accept('./app.js', () => render(App))
}