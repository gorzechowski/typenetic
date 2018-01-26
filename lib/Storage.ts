export class Storage {
    private storage = {};

    set<T extends any>(key: string, value: T): void {
        this.storage[key] = value;
    }

    get<T>(key: string): T {
        if (this.storage[key] === undefined) {
            throw new Error(`${key} is not defined`);
        }

        return this.storage[key];
    }
}

export const StorageInstance = new Storage();