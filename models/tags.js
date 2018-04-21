const mongoose = require('mongoose')
const Schema = mongoose.Schema

// urldog 为数据库名
const uri = 'mongodb://localhost:27017/urldog'

// 定义 schema
let schema = new Schema({tagname: String })
let Tag = mongoose.model('tag', schema)

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

module.exports.delTag = _id => {
  return new Promise(resolve => {
    mongoose
      .connect(uri)
      .then(db => {
        console.log('😄 连接数据库成功')
        
        // 删
        Tag.remove({_id}, err => {
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


module.exports.updateTag = obj => {
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
        var newValue = {$set: {tagname: obj.tagname}}

        console.log('!!!!!!!!')
        console.log('fuck!!!!!!!!!!!!!')
        // console.log(obj)

        Tag.update(myWhere, newValue, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(result)
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
