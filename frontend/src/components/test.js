import React, {useEffect, useState} from 'react';
import axios from "axios";

function Test(){
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/hello`,{
            // credentials: 'include'
            withCredentials:true
        })
            .then(response => {
                setMessage(response.data);
            })
            .catch(error => {
                // console.error('There was an error fetching the data!', error);
                if (error.response && error.response.status === 401) {
                    console.log("Unauthorized. Please login.");
                    // 여기서 로그인 페이지로 리다이렉트하거나 로그인 모달을 표시할 수 있습니다.
                } else {
                    console.error('There was an error fetching the data!', error);
                }
            });
    }, []);
    return(
        <div>
            <p>{message}</p>
        </div>
    )
}

export default Test;