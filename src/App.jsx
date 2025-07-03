import React from 'react'
import Rules from 'routes/Rules'
import Game from 'routes/Game'
import SpyMaster from 'routes/SpyMaster'
import { HashRouter, Route, Routes } from 'react-router-dom'
import 'App.scss'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Rules />} />
        <Route path="/play" element={<Game teamColors={['red', 'blue']} cardsAmount={20}/>} />
        <Route path="/playDuet" element={<Game teamColors={['green']} cardsAmount={25}/>} />
        <Route path="/spy-master" element={<SpyMaster />} />
      </Routes>
    </HashRouter>
  )
}

export default App
