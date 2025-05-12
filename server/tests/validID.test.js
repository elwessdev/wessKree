import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import validID from '../middleware/validID.mjs';
import User from '../models/user.mjs';

describe('Middleware: validID', () => {
    let req, res, next;

    beforeEach(() => {
        req = { token: { id: '67a287137b90419c6bbf1c32' } };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        next = sinon.stub();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should call next() and set success message when ID is valid and user exists', async () => {
        sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(true);
        sinon.stub(User, 'findOne').resolves({ _id: req.token.id });

        await validID(req, res, next);
        expect(next.calledOnce).to.be.true;
        // expect(req.validationMessage).to.equal('ID validation successful');
    });

    it('should return 403 with message if ID is invalid', async () => {
        sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(false);

        await validID(req, res, next);
        expect(res.status.calledWith(403)).to.be.true;
        expect(res.json.calledWith({ message: 'invalid id' })).to.be.true;
    });

    it('should return 404 with message if user not found', async () => {
        sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(true);
        sinon.stub(User, 'findOne').resolves(null);

        await validID(req, res, next);
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'user not found' })).to.be.true;
    });

    it('should return 500 with error message on exception', async () => {
        sinon.stub(mongoose.Types.ObjectId, 'isValid').throws(new Error('Boom'));

        await validID(req, res, next);
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ message: 'checking error' })).to.be.true;
    });
});
