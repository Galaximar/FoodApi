/* eslint-disable import/no-extraneous-dependencies */
const { expect,assert } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipes, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  image:'urlImg',summary:"summary",points:23,healthScore:2,instructions:"instructions"
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  }));
  beforeEach(() => Recipes.sync({ force: true })
    .then(() => Recipes.create(recipe)));
  describe('GET /api/recipes', () => {

    it('Responde con un estatus de 200', async () =>
      await agent.get('/api/recipes/').expect(200)
    );
    it('Responde con un arreglo vacío al buscar una receta no existente', async () => {
      await agent.get('/api/recipes?name=nombreNoExistente--------').expect(["Not found"])
    });
    it('Crea la recepta', async () => {
      await agent.post('/api/recipes/create').send({name: 'Milanea a la napolitana',
      image:'urlImg',summary:"summary",points:23,healthScore:2,instructions:"instructions"}).expect(200)
    });
    it('Si falta algun dato, no lo crea (en este caso name)', async () => {
      await agent.post('/api/recipes/create').send({
      image:'urlImg',summary:"summary",points:23,healthScore:2,instructions:"instructions"}).expect(402)
    });
  });
  describe('Post /api/recipes/create', () => {

    it('Al enviar todos los datos, la receta es creada', async () => {
      await agent.post('/api/recipes/create').send({name: 'Milanea a la napolitana',
      image:'urlImg',summary:"summary",points:23,healthScore:2,instructions:"instructions"}).expect(200)
    });
    it('Si falta algun dato, no lo crea (en este caso name)', async () => {
      await agent.post('/api/recipes/create').send({
      image:'urlImg',summary:"summary",points:23,healthScore:2,instructions:"instructions"}).expect(402)
    });
  });
});
