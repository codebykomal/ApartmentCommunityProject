//npm install jsonwebtoken
const jwt=require("jsonwebtoken");
/*
jwt.sign() → token banana
jwt.verify() → token check karna*/

function generateToken(user)
{
    const token=jwt.sign(
        //jsonwebtoken library header automatically bana deti hai.
        //payload hum dete h
        {
        id:user._id,
        role:user.role
        },
        //JWT_SECRET env se
        //Signature library banati hai:
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"    
        }
    );
    return token;
}
module.exports=generateToken;s


/*
iat → issued at (token kab bana) , exp → expiry time
JWT ke andar automatically ek field add ho jati hai:

{
  "id":"6a8de5ba951b495f5768f38b",
  "role":"RESIDENT",
  "iat":1756229400,
  "exp":1756315800
}*/

/*
https://www.jwt.io/
paste token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhOGVmMTFiOTNiZmY3YWU1MTA0ZDE3MyIsInJvbGUiOiJSRVNJREVOVCIsImlhdCI6MTc4Nzc2ODEzNSwiZXhwIjoxNzg3ODU0NTM1fQ.DPoAwymsKae7h056vlpDg3_nhVX6HcSViTanImZOyTk*/