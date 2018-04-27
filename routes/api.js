const router = require('koa-router')()
const {insertBookmark, delBookmark, updateBookmark} = require('./../models/bookmarks')
const {insertTag, delTag, updateTag} = require('./../models/tags')

router.prefix('/api')

// 注意，程序只返回 200 给客户端，没有考虑失败的情况

// API 接口
// 新建书签
router.post('/bookmarks', async (ctx, next) => {
  let ret = await insertBookmark(ctx.request.body)

  ctx.status = 201
  ctx.body = {status: 0, data: ret}
})

// 删除书签
router.delete('/bookmarks/:id', async (ctx, next) => {
  let id = ctx.params.id

  let ret = await delBookmark({id})
  ctx.status = 204

  // 删除比较奇怪，不能有返回，所以下面这部分失效
  ctx.body = {status: 0, data: ret}
})

// 更新书签
router.put('/bookmarks/:id', async (ctx, next) => {
  let _id = ctx.params.id
  let ret = await updateBookmark(Object.assign({_id}, ctx.request.body))
  
  ctx.status = 201
  ctx.body = {data: ret, status: 0}
})

// 新建 tag
router.post('/tags', async (ctx, next) => {
  let ret = await insertTag(ctx.request.body)

  ctx.status = 201
  ctx.body = {status: 0, data: ret}
})


// 删除 tag
router.delete('/tags/:id', async (ctx, next) => {
  let id = ctx.params.id

  let ret = await delTag({id})

  ctx.status = 204

  // 删除比较奇怪，不能有返回，所以下面这部分失效
  ctx.body = {status: 0, data: ret}
})

// 修改 tag
router.put('/tags/:id', async (ctx, next) => {
  let _id = ctx.params.id 

  let ret = await updateTag(Object.assign({_id}, ctx.request.body))

  ctx.status = 201
  ctx.body = {data: ret, status: 0}  
})

module.exports = router