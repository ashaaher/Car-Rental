import express  from 'express';
import {
  create as createorUpdateSettings,
  get as getSettings
} from '../controllers/settings';

const router = express.Router();

/* Create a new User (register). */
router.put('/', createorUpdateSettings);
router.get('/', getSettings);

export default router;