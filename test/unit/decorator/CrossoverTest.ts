import * as sinon from 'sinon';
import {SinonSandbox} from 'sinon';
import {expect} from 'chai';
import {Crossover} from '../../../lib/decorator/Crossover';
import {StorageInstance} from '../../../lib/Storage';

describe('Crossover genetic operator', () => {
    const sandbox: SinonSandbox = sinon.sandbox.create();
    let storageSetStub;

    beforeEach(() => {
        storageSetStub = sandbox.stub(StorageInstance, 'set');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should register decorated function', () => {
        class GeneticOperators {
            @Crossover()
            crossover(offspring: Array<any>) {
                return offspring;
            }
        }

        expect(storageSetStub.callCount).to.be.equal(1);
    });

    it('Should keep the context', () => {
        class GeneticOperators {
            @Crossover()
            crossover() {
                return this;
            }
        }

        const instance = new GeneticOperators();
        const context = instance.crossover();

        expect(context).to.equal(instance);
    });
});
