const { Recipes, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No se pudo conectar a la base de datos:', err);
    }));
  describe('Validaciones', () => {
    beforeEach(() => Recipes.sync({ force: true }));
    describe('Crea receta', () => {
      it('Si no se envian todos los parámetros, la receta no es creada', (done) => {
        Recipes.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('Falla al crear cuando no se envía las instrucciones', (done) => {
        Recipes.create({ name:"nombreComida",image:'urlImg',summary:"summary",points:23,healthScore:2})
        .then(()=>done(new Error('Se requieren las instrucciones')))
        .catch(()=>done());
      });
      it('Crea la receta correctamente, cuando todo es enviado como corresponde', (done) => {
        Recipes.create({ name:"nombreComida",image:'urlImg',summary:"summary",points:23,healthScore:2,instructions:"instructions"})
        .then(()=>done())
        .catch(()=>done(new Error('Debería de crearse correctamente')));
      });
    });
  });
});
