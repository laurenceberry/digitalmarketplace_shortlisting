var fs = require('fs');
var yaml = require('js-yaml');
var express = require('express');
var router = express.Router();

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

module.exports = router

router.post('/award/suppliers/award', function (req, res) {

  var award_status = req.body.award_status

  console.log('award_status: ' + award_status)

  if (award_status == 'yes') {
    // redirect to the relevant page
    res.redirect('/award/suppliers/award')
  } else if (award_status == 'no') {
    // if over18 is any other value (or is missing) render the page requested
    res.redirect('/award/no_details/award?awarding=true')
  } else {
    // if over18 is any other value (or is missing) render the page requested
    res.redirect('/award/overview/award')
  }
})


router.get('/award/:page/:yml', function (req, res) {
  var templateData = yaml.safeLoad(
    fs.readFileSync(__dirname + '/yml/' + req.params.yml + '.yml', {encoding: 'utf-8'})
  );

  Object.keys(req.query).map(function(key) {
    templateData[key] = req.query[key];
  });

  templateData.storedValues = req.cookies;

  res.render(
    "award/" + req.params.page,
    templateData
  );

});


router.post('/shortlist/suppliers/award', function (req, res) {

  var shortlisting_status = req.body.shortlisting_status

  console.log('shortlisting_status: ' + shortlisting_status)

  if (shortlisting_status == 'yes') {
    // redirect to the relevant page
    res.redirect('/shortlist/suppliers/award')
  } else if (shortlisting_status == 'no') {
    // if over18 is any other value (or is missing) render the page requested
    res.redirect('/shortlist/no_details/award')
  } else {
    // if over18 is any other value (or is missing) render the page requested
    res.redirect('/award/overview/award')
  }
})



router.get('/shortlist/:page/:yml', function (req, res) {
  var templateData = yaml.safeLoad(
    fs.readFileSync(__dirname + '/yml/' + req.params.yml + '.yml', {encoding: 'utf-8'})
  );

  Object.keys(req.query).map(function(key) {
    templateData[key] = req.query[key];
  });

  templateData.storedValues = req.cookies;

  res.render(
    "shortlist/" + req.params.page,
    templateData
  );

});

router.get('/supplier/:page/:yml', function (req, res) {
  var templateData = yaml.safeLoad(
    fs.readFileSync(__dirname + '/yml/' + req.params.yml + '.yml', {encoding: 'utf-8'})
  );

  Object.keys(req.query).map(function(key) {
    templateData[key] = req.query[key];
  });

  templateData.storedValues = req.cookies;

  res.render(
    "supplier/" + req.params.page,
    templateData
  );

});