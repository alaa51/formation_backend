const ProductsModel = require('../Model/products');

// create new user
exports.create = async (req, res) => {
    if (!req.body.name && !req.body.price && !req.body.description && !req.body.owner){
        res.status(400).send({message: 'all attribute are required'});
    }
    const user = new ProductsModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        owner: req.body.owner

    })
    await user.save().then(data=>{
        res.send({
            status: 200,
            message: 'Products created successfully',
            user: data
        });
    }).catch(err=>{
        res.status(500).send({
            message: err.message || 'Some error occured while creating Products'
        })
    })
}

//get All users
exports.findAll = async (req, res)=>{
    try{
        const products = await ProductsModel.find();
        res.status(200).json(products)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


// find one user
exports.findOne = async (req,res)=>{
    try {
        const products = await ProductsModel.findById(req.params.id);
        res.status(200).json(products)
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
    await ProductsModel.findByIdAndUpdate(id,req.body).then(data=>{
        if (!data){
            res.status(404).send({
                message: `Products with id ${id} cannot be found`
            })
        }else{
            res.send({message: 'Products Updated successfully.'})
        }
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        })
    })

}


//Delete user
exports.destroy = async (req,res)=>{
    await ProductsModel.findByIdAndDelete(req.params.id).then(data=>{
        if(!data){
            res.status(404).send({
                message: `products with id ${req.params.id} not found`
            });
        }else{
            res.send({
                message: 'Products Delete Successfully'
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        })
    })

}

