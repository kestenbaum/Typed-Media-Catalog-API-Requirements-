import { MovieModel } from '../models/interface';
import { AbstractRepository } from './abstract-repository';

export class MovieRepository extends AbstractRepository<MovieModel> {
    private readonly MIN_RUNTIME = 60; 

    constructor() {
        super('Movies', [
            { title: "The Abstract Awakens", runtimeMinutes: 125 },
            { title: "Inheritance Saga", runtimeMinutes: 80 }
        ]);
    }
    
    public create(payload: Omit<MovieModel, 'id'>): MovieModel {
        if (payload.runtimeMinutes < this.MIN_RUNTIME) {
            throw new Error(`Movie runtime must be at least ${this.MIN_RUNTIME} minutes.`);
        }
        return this.addEntity(payload);
    }
}