import { EndpointRegisterFunction } from 'directus/dist/types/extensions';
import { Router } from 'express';

const registerEndpoint: EndpointRegisterFunction = (router: Router) => {
  router.get('/', (req, res) => {
    res.send({ now: Date.now() });
  });
};

export default registerEndpoint;
