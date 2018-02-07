# Typenetic - Genetic algorithm for Typescript

[![Build Status](https://travis-ci.org/gorzechowski/typenetic.svg?branch=master)](https://travis-ci.org/gorzechowski/typenetic)

# Table of Contents

* [Installation](#installation)
* [Example usage](#example-usage)
* [Decorators](#decorators)
* [Genetic operators examples](#genetic-operators-examples)
    * [Selection](#selection)
        * [Tournament selection](#tournament-selection)
    * [Crossover](#crossover)
        * [Single point](#single-point)
    * [Mutation](#mutation)

# Installation

1. Install module:

    ```
    npm install typenetic --save
    ```

2. You need to set these options in `tsconfig.json` file in your project:

    ```json
    {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
    }
    ```

# Example usage

1. Create `GeneticOperators.ts` file:

    ```typescript
    import {Selection, Crossover, Mutation} from "typenetic";

    export class GeneticOperators {

        @Selection()
        selection(population: Array<any>): Array<any> {
            // perform elities selection

            return elities;
        }

        @Crossover()
        crossover(parentA: any, parentB: any): any {
            // perform crossover

            return offspring;
        }

        @Mutation()
        mutation(offspring: any): any {
            // perform mutation

            return offspring;
        }
    }
    ```

2. Create `index.ts` file:

    ```typescript
    import {evolve} from "typenetic";
    import {GeneticOperators} from "./GeneticOperators";

    // create population
    const population: Array<any> = [];

    // evolve population
    let evolved: Array<any> = evolve(population);
    ```

# Decorators

| Signature                   | Description                            |
|-----------------------------|----------------------------------------|
| `@Selection(size?: number)` | Selection operator, which task is to select elities from population. If `size` provided, then decorated function result will be sliced: `result.slice(0, size)` (useful in eg. tournament selection). |
| `@Crossover()`              | Crossover operator is responsible for crossing two units. |
| `@Mutation()`  | Mutation operator randomly modify genes in the unit. |

# Genetic operators examples

## Selection

### Tournament selection

Tournament selection chooses best units from population, based on unit's fitness.

```typescript
import {Selection} from "typenetic";

export class GeneticOperators {

    // select 3 elities from population
    @Selection(3)
    selection(population: Array<any>): Array<any> {
        return population.sort((unitA: any, unitB: any) => {
            return unitB.fitness - unitA.fitness;
        });
    }

}
```

## Crossover

### Single point

In single point crossover, one point, randomly chosen is used to split parents and create new unit with genes from first parent before chosen point and with genes from second parent, beyond chosen point.

```typescript
import {Crossover} from "typenetic";

export class GeneticOperators {

    @Crossover()
    crossover(parentA: Array<any>, parentB: Array<any>): Array<any> {
        const cutPoint = this.random(0, parentA.neurons.length - 1);

        for (let i = cutPoint; i < parentA.neurons.length; i++) {
            let biasFromParentA = parentA.neurons[i].bias;

            parentA.neurons[i].bias = parentB.neurons[i].bias;
            parentB.neurons[i].bias = biasFromParentA;
        }

        return this.random(0, 1) === 1 ? parentA : parentB;
    }

    private random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

}
```

## Mutation

Mutation operator randolmy modify genes of units. The probability of mutation depends on mutation rate.

```typescript
import {Mutation} from "typenetic";

export class GeneticOperators {

    @Mutation()
    mutation(offspring: Array<any>): Array<any> {
        for (let i = 0; i < offspring.neurons.length; i++) {
            offspring.neurons[i].bias = this.mutate(offspring.neurons[i].bias);
        }

        for (let i = 0; i < mutated.connections.length; i++) {
            offspring.connections[i].weight = this.mutate(offspring.connections[i].weight);
        }

        return offspring;
    }

    private mutate(gene) {
        // mutation rate at 0.5 (50%)
        if (Math.random() < 0.5) {
            const mutateFactor = 1 + ((Math.random() - 0.5) * 3 + (Math.random() - 0.5));

            return gene *= mutateFactor;
        }

        return gene;
    }

}
```
