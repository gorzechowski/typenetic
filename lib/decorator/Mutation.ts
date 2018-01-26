import {StorageInstance} from '../Storage';

const KEY = 'Mutation';

export const Mutation = (rate?: number) => {
    if (rate > 100 || rate <= 0) {
        throw new Error('Mutation rate should be greater than 0 and lesser or equal to 100');
    }

    return (target: any, key: string, descriptor: any) => {
        const originalMethod = descriptor.value;

        descriptor.value = (offspring) => {
            if (rate && Math.random() < rate / 100) {
                return originalMethod(offspring);
            }

            return offspring;
        };

        StorageInstance.set(KEY, descriptor.value);

        return descriptor;
    };
};
