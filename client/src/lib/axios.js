import axios from 'axios'
const aixosFetch= async(req, loadingFuncion,callback) => {  
    let requestData = {
      ...req.request,
        headers: {
            requestType:req.requestType||"application/json",
          "X-CSRF-TOKEN": "CSFR-Token",
          Authorization: req.token,
        },
        method: "post",
        url: req.url|| "",
        data: req.data|| "",
      }
  return await axios(requestData)
    .then((response) => {
      if (response.data.status === true) {
        loadingFuncion(false);
      }
      callback(response)
      return response;
    })
    .catch((error) => {
    callback(error)
      return error;
    });
};




export const postApi = (loadingFunction,api_address,callback,data)=>{
    const requestData = {
      token:sessionStorage.getItem('token')||'',  
      url:api_address,
        data:data,
    }
    aixosFetch(requestData, loadingFunction, (res) => {
      loadingFunction(true)
    if(res.status===200){
      loadingFunction(false)
      callback({
        data:res.data,
      })
    }else{
      loadingFunction(false)
      callback({
        error:true,
      })
    }
    })
}

