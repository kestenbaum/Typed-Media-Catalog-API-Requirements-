import { SeriesModel } from '../models/interface';
import { AbstractRepository } from './abstract-repository';

export class SeriesRepository extends AbstractRepository<SeriesModel> {
    constructor() {
        super('Series', [
            { title: "TypeScript Mysteries", totalSeasons: 2 },
            { title: "Express Adventures", totalSeasons: 5 }
        ]);
    }
    
    public create(payload: Omit<SeriesModel, 'id'>): SeriesModel {
        if (payload.totalSeasons <= 0) {
            throw new Error(`Series must have at least 1 season.`);
        }
        
        return this.addEntity(payload);
    }
}