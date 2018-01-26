import {StorageInstance} from '../Storage';

const KEY = 'Selection';

export const Selection = (size?: number) => {
    if (size && size < 2) {
        throw new Error('Elities size should be greater or equal to 2');
    }

    return (target: any, key: string, descriptor: any) => {
        const originalMethod = descriptor.value;

        descriptor.value = (...args) => {
            const selection = originalMethod(...args);

            if (size) {
                return selection.slice(0, size);
            }

            return selection;
        };

        StorageInstance.set(KEY, descriptor.value);

        return descriptor;
    };
};
