const { configureApp, PORT } = require('./configs/serverConfig');
const apiRouter = require('./routers/api.routes');

const app = configureApp();

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Сервер пашет на ${PORT} порту`);
});