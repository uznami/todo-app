import * as express from 'express';
import * as bodyParser from 'body-parser';
import { TodoService } from './todo-service';

const app = express();
app.use(bodyParser.json({ type: 'application/json' }));

const server = app.listen(3000, () => {
    console.log('application server started.');
});

app.get('//todos', async (req, res) => {
    const todos = await TodoService.all();
    res.json(todos);
});

app.post('//todos', async (req, res) => {
    const todos = await TodoService.append(req.body.text);
    res.json(todos);
});

app.patch('//todos/:index', async (req, res) => {
    const todos = await TodoService.toggle(req.params.index);
    res.json(todos);
});
