const router = require('koa-router')()
const getBookmarks = require('./../models/bookmarks').getBookmarks
const getTags = require('./../models/tags').getTags

// 路由
router.get('/', async (ctx, next) => {
  let links = await getBookmarks({})
  let tags = await getTags()
  await ctx.render('index', {
    links, tags
  })
})

router.get('/t/:id', async (ctx, next) => {
  let id = ctx.params.id
  let links = await getBookmarks({id})
  let tags = await getTags()
  await ctx.render('index', {
    links, tags, id
  })
})

router.get('/add', async (ctx, next) => {
  let tags = await getTags()
  await ctx.render('add', {
    tags
  })
})

router.get('/tags', async (ctx, next) => {
  let tags = await getTags()
  await ctx.render('tag', {
    tags
  })
})

module.exports = router