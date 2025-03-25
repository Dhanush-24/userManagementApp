let User=require('../model/user');
let bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')




let register = async(req, res) => {
    let {email,name,password}=req.body;
    console.log(email,name,password);

    const salt=await bcrypt.genSalt(10);
    password= await bcrypt.hash(password,salt);
    let user=new User({email,name,password})
    await user.save();

    let payload={id:user.id}
    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn:'1h'
        },(err,token)=>{
            if(err){
                throw err;
            }
            else{
                res.send(token)
            }
        })
        .catch(()=>{console.log("error signingjwt!")})
 }



 let login = async(req, res) => { 
    
    let {inp_email,inp_password}=req.body;
    let user=await User.findOne({email:inp_email}) 
    let isValidPWD= await bcrypt.compare(inp_password,user.password);
    if(!isValidPWD){
        res.status(400).send({"message":"user not found"})
    }
    else{
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn:'1h'
            },(err,token)=>{
                if(err){
                    throw err;
                }
                else{
                    res.send(token)
                }
            })
            .catch(()=>{console.log("error signingjwt!")})
    } }




let profile = async(req, res) => { 
    res.status(300).json(req.user) 
    
}



let transaction = async(req, res) => {
    res.status(200).send("this is transaction")
    
}



let wishlist = async(req, res) => { 
    res.status(200).send("this is wishlist")
}





module.exports = {
    login,
    register,
    profile,
    transaction,
    wishlist
}
