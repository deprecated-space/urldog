const mongoose = require('mongoose')
const Schema = mongoose.Schema

// urldog 为数据库名
const uri = 'mongodb://localhost:27017/urldog'

// 定义 schema
let schema = new Schema({title: String, url: String, tagid: String, tagname: String})
let Bookmark = mongoose.model('bookmark', schema)

module.exports.getLinks = obj => {
  return new Promise(resolve => {
    mongoose
      .connect(uri)
      .then(db => {
        console.log('😄 连接数据库成功')

        if (obj.id) {
          // 查
          Bookmark.find({tagid:obj.id}, (err, docs) => {
            resolve(docs)
          })
        } else {
          // 查
          Bookmark.find({}, (err, docs) => {
            resolve(docs)
          })
        }

        // 关闭数据库
        // db.close()
      })
      .catch(error => {
        console.log('😿 连接数据库失败')
        console.log(error)
      })
  })
}

module.exports.insertLink = obj => {
  return new Promise(resolve => {
    mongoose
      .connect(uri)
      .then(db => {
        console.log('😄 连接数据库成功')

        // 增
        let doc = new Bookmark(obj)
        doc.save(err => {
          if (err) {
            console.log(err)
            return
          }

          console.log('保存成功')
        })

        // 关闭数据库
        // db.close()
      })
      .catch(error => {
        console.log('😿 连接数据库失败') 
        console.log(error)
      })
  })
}

module.exports.delLink = _id => {
  return new Promise(resolve => {
    mongoose
      .connect(uri)
      .then(db => {
        console.log('😄 连接数据库成功')
        
        // 删
        Bookmark.remove({_id}, err => {
          if (err) {
            console.log(err)
          } else {
            console.log('remove ok')
          }
        })

        // 关闭数据库
        // db.close()
      })
      .catch(error => {
        console.log('😿 连接数据库失败') 
        console.log(error)
      })
  })
}

module.exports.updateLink = obj => {
  return new Promise(resolve => {
    mongoose
      .connect(uri)
      .then(db => {
        console.log('😄 连接数据库成功')
        
        // 改
        // 条件
        var myWhere = {_id: obj._id}

        // 设置新值
        // 更新的数据比较少用 $set，可用性还是很好
        var newValue = {$set: {title: obj.title, url: obj.url, tagid: obj.tagid, tagname: obj.tagname}}

        Bookmark.update(myWhere, newValue, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log('update ok')
          }
        })

        // 关闭数据库
        // db.close()
      })
      .catch(error => {
        console.log('😿 连接数据库失败') 
        console.log(error)
      })
  })
}

