const UserModel = require('../Model/user');

// create new user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone){
        res.status(400).send({message: 'all attribute are required'});
    }
    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone

    })
    await user.save().then(data=>{
        res.send({
            status: 200,
            message: 'user created successfully',
            user: data
        });
    }).catch(err=>{
        res.status(500).send({
            message: err.message || 'Some error occured while creating user'
        })
    })
}

//get All users
exports.findAll = async (req, res)=>{
    try{
        const user = await UserModel.find();
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


// find one user
exports.findOne = async (req,res)=>{
   try {
       const user = await UserModel.findById(req.params.id);
       res.status(200).json(user)
   } catch (error){
       res.status(404).json({message: error.message})
    }
}

// Update user
exports.update = async (req, res)=>{
    if (!req.body){
        res.status(400).send({
            message : 'data to update cannot be empty'
        });
    }
    const id = req.params.id;
    await UserModel.findByIdAndUpdate(id,req.body).then(data=>{
        if (!data){
            res.status(404).send({
                message: `User with id ${id} cannot be found`
            })
        }else{
            res.send({message: 'User Updated successfully.'})
        }
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        })
    })

}


//Delete user
 exports.destroy = async (req,res)=>{
    await UserModel.findByIdAndDelete(req.params.id).then(data=>{
        if(!data){
            res.status(404).send({
                message: `user with id ${req.params.id} not found`
            });
        }else{
            res.send({
                message: 'User Delete Successfully'
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        })
    })

 }

