const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/databaase.config');
const mongoose = require('mongoose');
const UserRoute = require('./app/routes/User')
const LoginRoute = require('./app/routes/utilisateur')
const authVerification = require('./app/middleware/auth')


mongoose.Promise = global.Promise;

const app = express();
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(()=>{
    console.log("Data Base connect Successfully!!");
}).catch(err=>{
    console.log('could not connect to database', err);
})
app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())
app.use('/api/users', UserRoute);
app.use('/api', LoginRoute);
app.listen(8000, ()=>{
    console.log("server is listening on port 8000");
})
