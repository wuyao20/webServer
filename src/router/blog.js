const { blogList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author
        const keyword = req.query.keyword
        // const blogData = blogList(author, keyword)
        // return new SuccessModel(blogData)
        return blogList(author, keyword).then(listData => {
            return new SuccessModel(listData)
        }).catch(err => {
            return new ErrorModel(err)
        })
    }
    
    if(method === 'GET' && req.path === '/api/blog/detail') {
        return getDetail(id).then(data => {
            return new SuccessModel(data)
        }).catch(err => {
            return new ErrorModel(err)
        })
    }
    
    if(method === 'POST' && req.path === '/api/blog/new') {
        req.body.author = 'salted'
        return newBlog(req.body).then(data => {
            return new SuccessModel(data)
        }).catch(err => {
            return new ErrorModel(err)
        })
    }
    
    if(method === 'POST' && req.path === '/api/blog/update') {
        return updateBlog(id, req.body).then(result => {
            if (result) {
                return new SuccessModel(result)
            } else{
                return new ErrorModel('update error')
            }
        })
    }

    //delete a blog
    if(method === 'POST' && req.path=== '/api/blog/del') {
        const author = 'wuyao'
        return delBlog(id, author).then(result => {
            if (result) {
                return new SuccessModel(result)
            } else{
                return new ErrorModel('delete error')
            }
        })
    }
}


module.exports = handleBlogRouter