const express       = require('express'),
      dbOperation   = require('./dbFiles/dbOperation'),
      cors          = require('cors');

const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/api', async(req, res) => {
    const result = await dbOperation.getCustomers(req.body.name, req.body.id);
    res.send(result.recordset);
});

app.post('/create', async(req, res) =>{
    await dbOperation.createCustomer(req.body);
    const result = await dbOperation.getCustomers(req.body.cus_name);
    res.send(result.recordset);
});

app.put('/edit', async(req, res) =>{
    await dbOperation.updateCustomer(req.body);
    const result = await dbOperation.updateCustomer(req.body.id, req.body.cus_name);
    res.send(result);
});

app.get('/show', async(req, res) =>{
    const result = await dbOperation.showCustomers();
    res.send(result.recordset);
});

app.delete('/delete', async(req, res) => {
    const result = await dbOperation.deleteCustomer(req.body.name, req.body.id);
    res.send(result);
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));