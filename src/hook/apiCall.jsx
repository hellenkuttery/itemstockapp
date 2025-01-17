
import  axios  from 'axios';
import { useDispatch } from 'react-redux';
import { fetchFail, fetchStart } from '../features/authSlice';

const register=async(userInfo)=>{
    const dispatch=useDispatch()

    dispatch(fetchStart())
    try {
        const {data}=await axios.post("https://stock-api-js.fullstack.clarusway.com/users/",userInfo)
        console.log(data)
        
    } catch (error) {

        dispatch(fetchFail())
        
    }
}


// Bu yapı bir component değil sadece js fonksiyonu oldu. 
// REturn ile birşey döndermediği için component değil. Bu şekilde kullanımı hook kurallarına aykırı olduğu için çalışmaz
// Bu nedenle bu sayfayı bu şekilde kullanmayacağız.