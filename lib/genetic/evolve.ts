import {StorageInstance} from '../Storage';
import {Crossover} from './operator/Crossover';
import {Mutation} from './operator/Mutation';
import {Selection} from './operator/Selection';

export const evolve = (population: Array<any>): Array<any> => {
    const selection = StorageInstance.get<Selection>('Selection');
    const crossover = StorageInstance.get<Crossover>('Crossover');
    const mutation = StorageInstance.get<Mutation>('Mutation');

    let evolved = [];

    let elities = selection(population);

    for (let i = elities.length; i < population.length; i++) {
        let offspring: any;

        if (i === elities.length) {
            offspring = crossover(elities[0], elities[1]);
        } else {
            offspring = population[random(0, population.length - 1)];
        }

        offspring = mutation(offspring);

        evolved.push(offspring);
    }

    return evolved;
};

const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
