import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';

const useAxios = () => {

    const {token} = useSelector((state)=>state.auth);

  
    const axiosWithToken = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: {
            Authorization: `Token ${token}`
          }
      });

      const axiosWithoutHeader=axios.create({
        baseURL: import.meta.env.VITE_BASE_URL
    });


  return {axiosWithToken,axiosWithoutHeader}
}

export default useAxios