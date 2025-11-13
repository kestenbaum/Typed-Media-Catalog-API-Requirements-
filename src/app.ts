import express from "express";
import * as dotenv from 'dotenv';
import movieRouter from './routes/movie.routes'; 
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use('/movies', movieRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server listening on port: ${PORT}`);
    console.log(`Access movies at http://localhost:${PORT}/movies`);
});
