const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const UUID = require('node-uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const moment = require('moment');

const config = require('./config');
const User = require('./models/user');
const Measure = require('./models/measure');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
app.set('jwt_secret', config.jwt_secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
};

var router = express.Router();

router.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.status(500).json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.status(500).json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('jwt_secret'), {
                    expiresIn: 60 * 24 // expires in 24 hours
                });

                // remove password field from user object
                user = _.omit(user.toObject(), 'password');

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
        // if there is no token return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

// find the measure list for a user
router.get('/measure_list', function(req, res) {
    var user_id = req.query.user_id;

    User.findOne({
        _id: user_id
    }, function(err, user) {
        if (err) {
            res.status(500).json({
                success: false,
                message: "An error occurred while retrieving measures list."
            });                
            throw err;
        }
        if (user) {
            Measure.find({
                owner: user
            }, function(err, measures) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: "An error occurred while retrieving measures list."
                    });                
                    throw err;
                }
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

// find a measure by id
router.get('/measure', function(req, res) {
    Measure.find({
        _id: req.query.id
    }, function(err, measures) {
        if (err) {
            res.status(500).json({
                success: false,
                message: "An error occurred while retrieving measures list."
            });                
            throw err;
        }
        if (measures) {
            res.json({
                success: true,
                data: measures,
                message: 'OK'
            });
        }
    });
});

// save or update a measure
router.post('/measure', function(req, res) {

    Measure.findOne({ _id: req.body.measure_id }, function (err, m){
        if (err) {
            res.status(500).json({
                success: false,
                message: "An error occured while saving the measure."
            });
            throw err;
        }        
        if (m) {
            m.name = req.body.measure_title;
            m.fp_lines = req.body.fp_lines;
            m.total_fps = req.body.total_fps;
            m.updated = moment();
            m.save(function (err) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: "An error occured while saving the measure."
                    });
                    throw err;
                }
                res.json({
                    _id: m._id,
                    success: true,
                    message: 'OK'
                });
            });
        } else {
            User.findOne({
                _id: req.body.user_id
            }, function(err, user) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: "An error occured while saving the measure."
                    });
                    throw err;
                }
                if (user) {
                    var measure = new Measure({ name: req.body.measure_title,
                                                fp_lines: req.body.fp_lines,
                                                total_fps: req.body.total_fps,
                                                created: moment(),
                                                update: moment(),
                                                owner: user});
                    measure.save(function (err) {
                        if (err) {
                            res.status(500).json({
                                success: false,
                                message: "An error occured while saving the measure."
                            });                
                            throw err;
                        }
                        res.json({
                            _id: measure._id,
                            success: true,
                            message: 'OK'
                        });
                    });                    
                }
            });
        }
    });
});

// delete a measure
router.delete('/measure', function(req, res) {
    Measure.findOne({ _id: req.body.measure_id }, function (err, m){
        m.remove(function (err) {
            if (err) {
                res.json({
                    success: false,
                    message: "An error occured while deleting the measure."
                });                
                throw err;
            }
            res.json({
                success: true,
                message: 'OK'
            });
        });
    });
});

app.use('/api', router);

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});