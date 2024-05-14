const TokenHandler=()=>{
          generateAccessToken=(user)=>{
                    const dataInToken={userId: user.id,name: user.name, type: type}
                    var token = jwt.sign(dataInToken, SERCRET_KEY, { algorithm:"HS256", expiresIn: 3600 });
                    return token;
          },
          generateRefreshToken=(user)=>{
                    const dataInToken={userId: user.id,name: user.name, type: type}
                    var token = jwt.sign(dataInToken, SERCRET_KEY, { algorithm:"HS256", expiresIn: 5*3600 });
                    return token;
          }
}
export default TokenHandler;