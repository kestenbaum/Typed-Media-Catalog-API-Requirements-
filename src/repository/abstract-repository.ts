import { EntityModel, CatalogService } from "../models/interface";

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