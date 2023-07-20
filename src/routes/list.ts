import express from 'express';
import { addListItem, deleteListItem, getList } from '../handlers/list';
import { validateAddItem } from '../middleware/listValidation';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('lists');
});

router.get('/user/:userId', getList);
router.post('/addItem', [validateAddItem, verifyToken], addListItem);
router.delete('/deleteItem/:listId', verifyToken, deleteListItem);

export default router;
