export interface EntityModel {
    id: number;
    title: string;
}

export interface MovieModel extends EntityModel {
    runtimeMinutes: number;
}

export interface SeriesModel extends EntityModel {
    totalSeasons: number;
}

export interface CatalogService<T extends EntityModel> {
    getAll(): T[];
    getById(id: number): T;
    create(payload: Omit<T, 'id'>): T;
}