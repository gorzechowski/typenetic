import {StorageInstance} from '../Storage';

const KEY = 'Mutation';

export const Mutation = () => {
    return (target: any, key: string, descriptor: any) => {
        StorageInstance.set(KEY, descriptor.value);

        return descriptor;
    };
};
