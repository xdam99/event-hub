import { Router } from 'express';
import { addToCart } from '../controllers/cart.controller';
import { validateSignature } from '../utility';

const router = Router();

router.post('/add', validateSignature, addToCart);

export default router;