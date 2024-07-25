
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/hello`)
        .then(response => {
          setMessage(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
  }, []);
  return (
      <div className="App">
        <p>{message}</p>
      </div>
  );
}

export default App;
