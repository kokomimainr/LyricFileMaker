const { configureApp, PORT } = require('./configs/serverConfig');
const apiRouter = require('./routers/api.routes');
const path = require('path')

const app = configureApp();

app.use('/api', apiRouter);

const staticFolder = path.join(__dirname, '..', 'public', 'dist');

app.get('*', (req, res) => {
  res.sendFile(path.join(staticFolder, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер пашет на ${PORT} порту`);
});