const {Blog} = require('../models')

class BlogService {
    constructor() {
        this.table = Blog;
    } 

    async createBlog({ blog, user_id }) {
        const blogCreated = await this.table.create({
            ...blog,
            user_id
        });
        return blogCreated.id? blogCreated: null;
    }

    async getAllBlogs() {
        const blog = await this.table.findAll();
        return blog;
    }

    async getBlogByUser({user_id}){
        const blog = await this.table.findAll({where: {user_id: user_id }})
        return blog;
    }

    async updateBlog({blog, blog_id, user_id}){
        const blogUpdated = await this.table.update(blog, {where: {user_id: user_id, id: blog_id}})
        return blogUpdated;
    }

    async deleteBlog({blog_id}){
        const blogEliminated = await this.table.destroy({where: {id: blog_id}})
        return blogEliminated;
    }
};

module.exports = BlogService;