const router = require('koa-router')()

let getLinks = require('./../models/bookmarks').getLinks
let insertLink = require('./../models/bookmarks').insertLink
let delLink = require('./../models/bookmarks').delLink
let updateLink = require('./../models/bookmarks').updateLink

let getTags = require('./../models/tags').getTags
let insertTag = require('./../models/tags').insertTag
let delTag = require('./../models/tags').delTag
let updateTag = require('./../models/tags').updateTag

router.get('/', async (ctx, next) => {
  let links = await getLinks({})
  let tags = await getTags()
  await ctx.render('index', {
    links, tags
  })
})

router.get('/t/:id', async (ctx, next) => {
  let id = ctx.params.id
  let links = await getLinks({id})
  let tags = await getTags()
  await ctx.render('index', {
    links, tags, id
  })
})

router.get('/add', async (ctx, next) => {
  let links = await getLinks({})
  let tags = await getTags()
  await ctx.render('add', {
    links, tags
  })
})

router.get('/tags', async (ctx, next) => {
  let tags = await getTags()
  await ctx.render('tag', {
    tags
  })
})

router.post('/link/add', (ctx, next) => {
  // ctx.router available
  // let apps = ctx.request.body
  console.log(ctx.request.body)
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

router.post('/link/update', (ctx, next) => {
  // ctx.router available
  // let apps = ctx.request.body
  console.log(ctx.request.body )
  // ctx.body = apps

  updateLink(ctx.request.body)
  // console.log(ctx)
  ctx.body = {title: 'test', url: 'test'}
  
})

router.post('/tag/add', (ctx, next) => {
  // ctx.router available
  // let apps = ctx.request.body
  console.log(ctx.request.body)
  // ctx.body = apps

  insertTag(ctx.request.body)
  // console.log(ctx)
  ctx.body = {title: 'test', url: 'test'}
  
})

router.post('/tag/del', (ctx, next) => {
  // ctx.router available
  // let apps = ctx.request.body
  console.log(ctx.request.body )
  // ctx.body = apps

  delTag(ctx.request.body)
  // console.log(ctx)
  ctx.body = {title: 'test', url: 'test'}
  
})

router.post('/tag/update', (ctx, next) => {
  // ctx.router available
  // let apps = ctx.request.body
  console.log(ctx.request.body )
  // ctx.body = apps

  updateTag(ctx.request.body)
  // console.log(ctx)
  ctx.body = {title: 'test', url: 'test'}
  
})


module.exports = router
