import express from 'express';

const app = express();

app.get('/', (req, res) => {
   res.send('wecome to our service');
});

export default app;
