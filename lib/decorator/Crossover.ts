import {StorageInstance} from '../Storage';

const KEY = 'Crossover';

export const Crossover = () => {
    return (target: any, key: string, descriptor: any) => {
        StorageInstance.set(KEY, descriptor.value);
    };
};
