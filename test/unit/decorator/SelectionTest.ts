import * as sinon from 'sinon';
import {SinonSandbox} from 'sinon';
import {expect} from 'chai';
import {Selection} from '../../../lib/decorator/Selection';
import {StorageInstance} from '../../../lib/Storage';

describe('Selection genetic operator', () => {
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
            @Selection()
            selection(population: Array<any>) {
                return [];
            }
        }

        expect(storageSetStub.callCount).to.be.equal(1);
    });

    it('Should return sliced array if size param provided', () => {
        const input = [1, 2, 3];

        class GeneticOperators {
            @Selection(2)
            selection(population: Array<any>) {
                return population;
            }
        }

        const output = new GeneticOperators().selection(input);

        expect(output).to.be.deep.equal([1, 2]);
    });

    it('Should return array if size param not provided', () => {
        const input = [1, 2];

        class GeneticOperators {
            @Selection()
            selection(population: Array<any>) {
                return population;
            }
        }

        const output = new GeneticOperators().selection(input);

        expect(output).to.be.deep.equal(input);
    });

    it('Should throw error if elities size is lesser than 2', () => {
        expect(() => Selection(1)).to.throw(Error);
    });
});