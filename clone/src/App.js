import './mainPage/webHeader.css'
import './mainPage/webBody.css'
import './mainPage/webList'
import './App.css'
import './waitingRoom/waitingRoom.css'

import WebHeader from './mainPage/webHeader'
import WebBody from './mainPage/webBody'
import WaitingRoom from './waitingRoom/waitingRoom'

function App() {
  return (
    <div className="App">
        <WaitingRoom/>
    </div>
  );
}

export default App;
