import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
import { AuthProvider } from './context/AuthContext'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* "Puri React application ko Redux store ka access de do." */}

    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>,
)
/*here <app/> is wrapped between 2 wrappers.
React me jab hum component ko wrap karte hain:
To jo andar likha hai:

<App />

wo automatically ek prop ban jata hai.

Us prop ka naam hota hai:

children*/