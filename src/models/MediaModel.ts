interface EntityModel {
    id: number;
    title: string;
}

interface MovieModel extends EntityModel {
    runtimeMinutes: number;
}

interface SeriesModel extends EntityModel {
    totalSeasons: number;
}

interface CatalogService<T extends EntityModel> {
    getAll(): T[];
    getById(id: number): T;
    create(payload: Omit<T, 'id'>): T;
}

export abstract class AbstractRepository<T extends EntityModel> implements CatalogService<T> {
    private dataStore: T[] = []; 
    protected serviceName: string;
    private nextId: number = 1;

    constructor(serviceName: string, initialData: Omit<T, 'id'>[] = []) {
        this.serviceName = serviceName;
        initialData.forEach(item => this.dataStore.push(this.assignId(item)));
        console.log(`[${this.serviceName}] Repository initialized with ${this.dataStore.length} items.`);
    }

    private assignId(payload: Omit<T, 'id'>): T {
        return {
            ...payload as any,
            id: this.nextId++
        } as T;
    }

    public getAll(): T[] {
        return this.dataStore;
    }

    public getById(id: number): T {
        const entity = this.dataStore.find(item => item.id === id);
        if (!entity) {
            throw new Error(`[${this.serviceName}] Entity with ID ${id} not found.`);
        }
        return entity;
    }

    public abstract create(payload: Omit<T, 'id'>): T;
    
    protected addEntity(payload: Omit<T, 'id'>): T {
        const newEntity = this.assignId(payload);
        this.dataStore.push(newEntity);
        console.log(`[${this.serviceName}] Created new entity: ID ${newEntity.id}`);
        return newEntity;
    }
}

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
