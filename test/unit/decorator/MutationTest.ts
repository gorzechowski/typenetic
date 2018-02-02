import * as sinon from 'sinon';
import {SinonSandbox} from 'sinon';
import {expect} from 'chai';
import {Mutation} from '../../../lib/decorator/Mutation';
import {StorageInstance} from '../../../lib/Storage';

describe('Mutation genetic operator', () => {
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
            @Mutation()
            mutation(offspring: Array<any>) {
                return offspring;
            }
        }

        expect(storageSetStub.callCount).to.be.equal(1);
    });

    it('Should keep the context', () => {
        class GeneticOperators {
            @Mutation()
            mutation() {
                return this;
            }
        }

        const instance = new GeneticOperators();
        const context = instance.mutation();

        expect(context).to.equal(instance);
    });
});
