import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import './src/db/connect.mjs';
import {login} from './src/users.services.mjs';
import {signup} from './src/users.services.mjs';
import jwt from 'jsonwebtoken';
import {MoviesRouter} from './src/movies.routs.mjs';
import { usersRouter } from './src/users.routs.mjs';
//import { FeaturedRouter } from './src/Featured.routs.mjs';
import { addReview } from './src/movies.services.mjs';
import 'express-async-errors';


const SECRET = 'snow';
export const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/Movies', MoviesRouter);
// app.use('/api/Movies/featured', FeaturedRouter);
app.use('/api/users', usersRouter);

const Auth =(req, res, next) => {
    const token = req.headers['authorization'];
    try {
        const valid = jwt.verify(token, SECRET);
        next();
    } catch(err) {
        console.log("err",err)
        res.status(403).send();
    }
}

app.post('/api/Movies/:id/reviews', Auth, async (req, res) => {
    const review = await addReview(req.params.id, req.body);
   if (review){
    res.json(review);
   }else{
    res.status(403).json({
        message: 'user does not exist'
    });
   }
  
});


app.post('/api/signup', async (req, res) => {
    const {email, username, password} = req.body;
    const user = await signup(email, username, password);
  
    if (user){
        res.send(true);
    }else {
        res.send(false);
    }
})

app.post('/api/login', async (req, res) => {
   const {email, password} = req.body;
   const user = await login(email, password)
  
   if(user) {
       const userResponse = {
           username: user.username,
           id: user.id.toString(),
           email: user.email,
           wishlist: user.wishlist
       }
       const token = jwt.sign(userResponse, SECRET, {expiresIn: '1d'});
   
       res.json({
        token,
        user: userResponse
       });
   } else {
       res.status(403).json({
           message: 'user does not exist'
       });
   }
})

app.use(express.static('../Client/imdb/build/'));

const port = process.env.PORT || 8080;
app.listen(port);


console.log("Server is listening on http://localhost:" + port);

