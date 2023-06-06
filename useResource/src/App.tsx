import {Resource, useResource} from './useResource'
import './app.css';
import { useEffect } from 'react';

function App() {

  const resource = useResource(async () => {
    const res = await fetch('https://catfact.ninja/fact');
    return res.json();
  });

  return (
    <div className="App">
      React
      <Resource
        value={resource}
        onResolved={(data) => <p>{data.fact}</p>}
        onPending={() => <p>Loading...</p>}
        onRejected={() => <p>Error</p>}
      />
    </div>
  )
}

export default App
