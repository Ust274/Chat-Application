import { Router } from 'express';
import {protectRoute} from '../middlewares/auth.middleware.js'
import {getUsers,getMessages,sendMessage} from '../controllers/messages.controllers.js'

const Messagerouter = Router();

Messagerouter.get('/users',protectRoute,getUsers);
Messagerouter.get('/:id',protectRoute,getMessages);
Messagerouter.post('/send/:id',protectRoute,sendMessage);

export default Messagerouter;