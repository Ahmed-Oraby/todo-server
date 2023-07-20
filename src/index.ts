import express from 'express';
import dotenv from 'dotenv';

import userRouter from './routes/user';
import listRouter from './routes/list';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/lists', listRouter);

app.get('/', (req, res) => {
  res.send('hello world');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port ' + port));
