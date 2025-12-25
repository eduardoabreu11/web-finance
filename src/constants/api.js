import axios from "axios";


const URL = "http://192.168.0.186:3001";

const api = axios.create({
    baseURL: URL,
    timeout: 5000
});

api.interceptors.request.use((req)=>{
    if(localStorage.getItem("sessionToken"))
        req.headers.Authorization = "Bearer " + localStorage.getItem("sessionToken");

    return req;
}, (err)=>{
    console.log(err);
});

api.interceptors.response.use((response)=>{
    return response
}, (error)=>{
    if (error.response.status === 401){
        (localStorage.removeItem("sessionToken"));

        if(!document.location.href.includes('/login', 1)){
            document.location = "/login";
        }
    }

    return Promise.reject(error);
});


function HandleErrors(err){
    if(err.response?.data.error){
        return err.response?.data.error
    }
    else
        return "Ocorreu um erro.Tente novamente mais tarde"
}

export {api, HandleErrors};