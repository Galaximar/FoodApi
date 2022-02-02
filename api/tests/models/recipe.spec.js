const { Recipes, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipes.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipes.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipes.create({ name: 'Milanesa a la napolitana' });
      });
    });
  });
});
