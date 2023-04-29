import { fce } from '../test-file';

describe('create', () => {

    it('should create a Tag without crash', async () => {
        fce();
        expect(true).toEqual(true);
    });
});