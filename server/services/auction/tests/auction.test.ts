import { AuctionService } from '../auction';

describe('create', () => {

    it('should create a Tag without crash', async () => {
        AuctionService.test();
        expect(true).toEqual(true);
    });
});