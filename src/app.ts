import express from "express";
import { Request, Response } from "express";

import * as dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }));

const movieRepository = new MovieRepository();

app.route('/movies')
    .get((req: Request, res: Response) => {
        try {
            const movies = movieRepository.getAll();
            return res.status(200).json(movies);
        } catch (error) {
            console.error('Error retrieving movies:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    })
    .post((req: Request, res: Response) => {
        const payload = req.body as Omit<MovieModel, 'id'>;

        try {
            const newMovie = movieRepository.create(payload);

            return res.status(201).json(newMovie);
        } catch (error) {
            const errorMessage = (error as Error).message;
            console.error(`Validation failed for movie creation: ${errorMessage}`);

            return res.status(400).json({ 
                error: 'Validation Failed', 
                message: errorMessage 
            });
        }
    });


app.listen(PORT, () => {
    console.log(`Server listen port: ${PORT}`)
})