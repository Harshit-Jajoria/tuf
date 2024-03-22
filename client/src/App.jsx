import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactGA4 from "react-ga4";


const initializeGA4 = async () => {
  const measurementId = 'G-3Q5XMQGSMG';
  try {
    await ReactGA4.initialize(measurementId);
  } catch (error) {
    console.error('Failed to initialize GA4:', error);
  }
};

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    initializeGA4();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          gacount is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
