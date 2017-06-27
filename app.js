var koa = require('koa')
var app = koa()

const port = process.env.PORT || 3000
app.use(require('koa-static')('./build', { gzip: true }))
app.listen(port)
