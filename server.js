var express = require('express')
var path = require('path')
var app = express()
// var opn = require('opn')
var localhost = require('address').ip()
let staticDir = '/docs/.vuepress/dist'

app.use(express.static(path.join(__dirname, staticDir)))

app.listen(9999, err => {
  var uri = `http://${localhost}:9999`
  if (!err) {
    console.log(uri)
  } else {
    console.log(err)
  }
})
