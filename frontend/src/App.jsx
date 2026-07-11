import React from 'react'
import './styles/App.css'
import AppRoutes from './routes/AppRoutes'

function App() {

  console.log("App component rendered"); // Debugging statement
  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
