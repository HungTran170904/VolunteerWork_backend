const ErrorMiddleware=(error,req,res,next)=>{
          if(!error.status||error.status==500) 
                    res.status(500).send(error.message);
          else res.status(error.status).send(error.message);
}
export default ErrorMiddleware;