const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const UUID = require('node-uuid');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
};

var router = express.Router();

router.get('/data', function(req, res) {
    var data = {
      FP_LINES: [
        {id: UUID.v4(), function_name: 'Funzione prova 1', operation: 'ADD', type: 'ILF', ret_ftr: 2, det: 15, cplx: 'L', ufp: 7, notes: 'few annotations.'},
        {id: UUID.v4(), function_name: 'Funzione prova 2', operation: 'DEL', type: 'EQ', ret_ftr: 33, det: 22, cplx: 'H', ufp: 6, notes: ''},
        {id: UUID.v4(), function_name: 'Funzione prova 3', operation: 'CFP', type: 'EI', ret_ftr: 3, det: 16, cplx: 'H', ufp: 6, notes: 'popolamento iniziale.'}
      ],
      MEASURE_TITLE: 'My first app measure'
    };
    res.json(data);   
});

app.use('/api', router);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});