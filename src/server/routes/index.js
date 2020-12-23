const router = require('express').Router();
const request = require('request-json');
let client = request.createClient('https://api.github.com/')

router.get('/', (req, res) => {
  res.render('home')
})

router.get('/projects', (req, res) => {

	// TODO: Add logic for when client returns empty
  client.get('users/optomal7/events/public')
    .then(function(result){
      for (var i = 0; i < result.body.length; i++) {
        if (result.body[i].type === 'PushEvent') {
          return {repoName: result.body[i].repo.name,
                  url: "https://github.com/" + result.body[i].repo.name + "/commit/" + result.body[i].payload.head,
                  time: result.body[i].created_at,
                  message: result.body[i].payload.commits[0].message }
        }
      }
    })
    .then((mostRecent) => {
      res.render('projects', {mostRecent})
  })
})

router.get('/contact', (req, res) => {
  res.render('contact')
})

router.get('/social', (req, res) => {
  res.render('social')
})

router.get('/faq', (req, res) => {
  res.render('faq')
})

router.use('*', (req, res) => {
  res.redirect('/')
})

module.exports = router
