const  User  = require("../sequelize/usersConsctruct");


const userWithId = async function(req,res){
    let id = req.params.id;
    const user = await User.findByPk(id);
    if (user === null) {
      res.status(404).send('Not found!');
    } else {
      res.status(200).send(user); 
    }
}



const userRegister = async function(req,res){
        
    if(req.body.username && req.body.email && req.body.password)
    {
            try {
                await  User.create({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    phone: req.body.phone            
                })
                res.status(201).send('user created');
            }
            catch(e){
                {
                    const email = await User.findOne({ where: { email : req.body.email} } )
                    const username = await User.findOne({ where: { username : req.body.username} } )
                    const phone =  await User.findOne({ where: { phone : req.body.phone} } )
    
                if(!username && !email)
                {
                    res.status(400).send("phone already exists");
                }           
                else if(!email && !phone)            
                {
                    res.status(400).send("username already exists");                                
                }
                
                else if(!username & !phone)
                {
                    res.status(400).send("email already exists");
                }
                else if(!phone)
                {
                    res.status(400).send('email and username already exist');
                }
                else if(!username)
                {
                    res.status(400).send('email and phone already exist');
                }
                else if(!email)
                {
                    res.status(400).send('username and phone already exist');
                }
                else
                {
                    res.status(400).send('username email and phone already exist');
                }
                
            
            }                    
            }finally
            {
                res.end();
            }
    }

        res.send('password email and username required');
    
} 



const userUpdate= async function(req,res){
    const id = req.params.id
    const user = await User.findByPk(id)
    
            let message;
            if(req.body.email && req.body.email != user.email)
            {
                let dbemail = await User.findOne({ where: { email : req.body.email} } );
                if(dbemail != null)
                {   
                    message = ' email already exist'
                }
                else
                {
                    user.email = req.body.email;
                }
            }

            if(req.body.username && req.body.username !=user.username)
            {
                let dbusername = await User.findOne({ where: { username : req.body.username} } );
                if(dbusername != null)
                {
                    if(message)
                    {
                        message += ' username already exists'
                    }
                    else
                    {
                        message = ' username already exists'
                    }
                }
                else
                {
                    user.username = req.body.username;
                }
            }


            if(req.body.phone && req.body.phone !=user.phone)
            {
                let dbphone = await User.findOne({ where: { phone : req.body.phone} } );
                if(dbphone != null)
                {
                    if(message)
                    {
                        message += ' phone already exists'
                    }
                    else
                    {
                        message = 'phone already exists'
                    }
                }
                else
                {
                    user.phone = req.body.phone;
                }
            }

            if(message)
            {
                return res.status(400).send(message);
            }
            
            if(req.body.name)
            {
                user.name = req.body.name;
            }

            if(req.body.password)
            {
                user.password = req.body.password;
            }

            await user.save()
            res.status(200).send('updated');

    }

            





const userGet = async function(req,res){
    try{
        const users = await User.findAll();
        res.status(200).send(users);
    }
    catch(e)
    {
        res.status(404).send('cannot find');
    }
    finally
    {
        res.end();
    }
     
}


const userDelete = async function(req,res){
    const id = req.params.id
    try{
        const users = await User.findByPk(id);
        await users.destroy();
        res.status(200).send('deleted');
    }
    catch(e)
    {
        res.status(409).send('cannot delete');
    }
    finally
    {
        res.end();
    }
}

module.exports = {
    userWithId,
    userRegister,
    userUpdate,
    userGet,
    userDelete
}