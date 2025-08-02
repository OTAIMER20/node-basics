import http from 'http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';


const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  if (route) {
    return route.handler(req, res)
  }

  res.statusCode = 404;
  return res.end();
});

server.listen(3333, () => {
  console.log('Servidor rodando em http://localhost:3333');
});
