import app from './app.js';

const main = () => {
  app.listen(app.get('port'));
  console.log('Escuchando por el puerto: ', app.get('port'));
};

main();
