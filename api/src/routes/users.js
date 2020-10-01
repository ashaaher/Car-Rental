import express  from 'express';
import {
  create as createUser,
  listAll as listUsers,
  _delete as deleteUser
} from '../controllers/users';

const router = express.Router();

/* Create a new User (register). */
router.post('/', createUser);
router.get('/', listUsers);
router.delete('/:id', deleteUser);

export default router;
