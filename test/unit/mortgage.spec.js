const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/mortgage');

describe('Mortgage Calculator', () => {
    it('should have a mortgage class', () => {
        expect(Mortgage).to.exist;
    });

    it('should have a monthlyPayment function', () => {
        expect(Mortgage.prototype.monthlyPayment).to.exist;
    });

    it('should return a value when called', () => {
        expect(Mortgage.prototype.monthlyPayment).to.exist;
        const mortgage = new Mortgage(200000, 5, 30, 12);
        const payment = mortgage.monthlyPayment();
        expect(payment).to.exist;
    });

    it('should calculate the correct monthly payment', () => {
        const mortgage = new Mortgage(200000, 5, 30, 12);
        const payment = mortgage.monthlyPayment();
        expect(payment).to.equal('1073.64');
    });

});