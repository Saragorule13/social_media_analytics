import React from 'react'
import {Navbar} from './components/Navbar'
import Main from './components/Main'
import Input from './components/Input'

function App() {
  return (
    <div className='flex h-screen max-w-screen'>
      <Navbar/>
      <div>
      <Main/>
      <Input/>
      </div>
    </div>
  )
}

export default App
