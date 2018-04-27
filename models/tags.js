const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 定义 schema
let schema = new Schema({tagname: String })
let Tag = mongoose.model('tag', schema)

// urldog 为数据库名
const uri = 'mongodb://localhost:27017/urldog'

module.exports.getTags = () => {
  return new Promise(resolve => {
    mongoose
      .connect(uri)
      .then(db => {
        console.log('😄 连接数据库成功')

        // 查
        Tag.find({}, (err, docs) => {
          resolve(docs)
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

module.exports.insertTag = obj => {
  return new Promise(resolve => {
    mongoose
      .connect(uri)
      .then(db => {
        console.log('😄 连接数据库成功')

        // 增
        let doc = new Tag(obj)
        doc.save((err, result) => {
          if (err) {
            console.log(err)
            return
          }

          console.log('保存成功')
          resolve(result)
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

module.exports.delTag = obj => {
  return new Promise(resolve => {
    mongoose
      .connect(uri)
      .then(db => {
        console.log('😄 连接数据库成功')
        
        // 删
        Tag.remove({_id: obj.id}, err => {
          if (err) {
            console.log(err)
          } else {
            console.log('remove ok')
            resolve({})
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

module.exports.updateTag = obj => {
  return new Promise(resolve => {
    mongoose
      .connect(uri)
      .then(db => {
        console.log('😄 连接数据库成功')
        
        // 条件
        var myWhere = {_id: obj._id}

        // 设置新值
        // 更新的数据比较少用 $set，可用性还是很好
        var newValue = {$set: {tagname: obj.tagname}}

        Tag.update(myWhere, newValue, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log('update ok')

            // 这里的 result 好像不是真实的数据？
            resolve(result)
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
