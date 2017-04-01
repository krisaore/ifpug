const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const UUID        = require('node-uuid');
const mongoose    = require('mongoose');
const jwt         = require('jsonwebtoken');
const _           = require('lodash');

const config        = require('./config');
const User          = require('./server/models/user');
const Measure       = require('./server/models/measure');

mongoose.connect(config.database);
app.set('jwt_secret', config.jwt_secret);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
};

app.get('/setup', function(req, res) {

  User.findOne({ username: 'test' }, function (err, user) {
    if (err) return handleError(err);

    var m = new Measure({ 
      name: 'Test Measure 2', 
      owner: user._id,
      fp_lines: [
        {id: UUID.v4(), function_name: 'Funzione prova 1', operation: 'ADD', type: 'ILF', ret_ftr: 2, det: 15, cplx: 'L', ufp: 7, notes: 'few annotations.'},
        {id: UUID.v4(), function_name: 'Funzione prova 3', operation: 'CFP', type: 'EI', ret_ftr: 3, det: 16, cplx: 'H', ufp: 6, notes: 'popolamento iniziale.'},
      ] 
    });

    m.save(function(err) {
      if (err) throw err;

      console.log('Measure saved successfully');
      res.json({ success: true });
    });

  })

});

var router = express.Router();

router.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('jwt_secret'), {
          expiresIn : 60*24 // expires in 24 hours
        });

        // remove password field from user object
        user = _.omit(user.toObject(),'password');

        // return the information including token as JSON
        res.json({
          success: true,
          user: user,
          message: 'OK',
          token: token
        });
      }   

    }

  });
});

// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('jwt_secret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

router.get('/list', function(req, res) {
  var user_id = req.query.user_id;

  User.findOne({
    _id: user_id
  }, function(err, user) {
    if (err) throw err;
    if (user) {
      Measure.find({
        owner: user
      }, function(err, measures) {
        if (err) throw err;
        if (measures) {
          res.json({
            success: true,
            measures: measures,
            message: 'OK'
          });
        }
      });
    }
  });

});

router.get('/data', function(req, res) {
    var data = {
      FP_LINES: [
        {id: UUID.v4(), function_name: 'Funzione prova 1', operation: 'ADD', type: 'ILF', ret_ftr: 2, det: 15, cplx: 'L', ufp: 7, notes: 'few annotations.'},
        {id: UUID.v4(), function_name: 'Funzione prova 2', operation: 'DEL', type: 'EQ', ret_ftr: 33, det: 22, cplx: 'H', ufp: 6, notes: ''},
        {id: UUID.v4(), function_name: 'Funzione prova 3', operation: 'CFP', type: 'EI', ret_ftr: 3, det: 16, cplx: 'H', ufp: 6, notes: 'popolamento iniziale.'},
        {id: UUID.v4(), function_name: 'Funzione prova 4', operation: 'ADD', type: 'EIF', ret_ftr: 2, det: 16, cplx: 'L', ufp: 5, notes: 'TEST'},
      ],
      MEASURE_TITLE: 'My first app measure'
    };
    res.json(data);   
});

app.use('/api', router);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});