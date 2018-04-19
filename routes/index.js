const router = require('koa-router')()
let getLinks = require('./../models').getLinks
let insertLink = require('./../models').insertLink
let delLink = require('./../models').delLink

router.get('/', async (ctx, next) => {
  let links = await getLinks()
  await ctx.render('index', {
    links
  })
})

router.get('/add', async (ctx, next) => {
  let links = await getLinks()
  await ctx.render('add', {
    links
  })
})

router.post('/link/add', (ctx, next) => {
  // ctx.router available
  // let apps = ctx.request.body
  console.log(ctx.request.body )
  // ctx.body = apps

  insertLink(ctx.request.body)
  // console.log(ctx)
  ctx.body = {title: 'test', url: 'test'}
  
})

router.post('/link/del', (ctx, next) => {
  // ctx.router available
  // let apps = ctx.request.body
  console.log(ctx.request.body )
  // ctx.body = apps

  delLink(ctx.request.body)
  // console.log(ctx)
  ctx.body = {title: 'test', url: 'test'}
  
})

module.exports = router
