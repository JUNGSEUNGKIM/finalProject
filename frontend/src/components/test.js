import React, {useEffect, useState} from 'react';
import axios from "axios";

function Test(){
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
    return(
        <div>
            <p>{message}</p>
        </div>
    )
}

export default Test;