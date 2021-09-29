import express from 'express';
import { getFeatured } from './movies.services.mjs';
import {getMovies} from './movies.services.mjs';


export const FeaturedRouter = express.Router();

FeaturedRouter.get('/', async (req, res) => {
    res.send(await getFeatured());
});


