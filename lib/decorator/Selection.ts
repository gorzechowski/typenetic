import {StorageInstance} from '../Storage';

const KEY = 'Selection';

export const Selection = (size?: number) => {
    if (size && size < 2) {
        throw new Error('Elities size should be greater or equal to 2');
    }

    return (target: any, key: string, descriptor: any) => {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: Array<any>) {
            const selection = originalMethod.apply(this, args);

            if (size) {
                return selection.slice(0, size);
            }

            return selection;
        };

        StorageInstance.set(KEY, descriptor.value);

        return descriptor;
    };
};
