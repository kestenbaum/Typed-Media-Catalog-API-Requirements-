import { Router, Request, Response } from "express";
import { MovieRepository } from '../repository/movie.repository';
import { MovieModel } from '../models/interface';


const movieRouter = Router();
const movieRepository = new MovieRepository(); 

movieRouter.get('/', (req: Request, res: Response) => {
    try {
        const movies = movieRepository.getAll();
        return res.status(200).json(movies);
    } catch (error) {
        console.error('Error retrieving movies:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

movieRouter.post('/', (req: Request, res: Response) => {
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

movieRouter.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const movie = movieRepository.getById(id);
        return res.status(200).json(movie);
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes('not found')) {
            return res.status(404).json({ message: errorMessage });
        }
        console.error('Error retrieving movie by ID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default movieRouter;