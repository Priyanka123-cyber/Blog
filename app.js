const express= require('express');
const articleRouter=require('./routes/articles')
const mongoose=require('mongoose')
const Article=require('./models/article')
const methodOverride=require('method-override')
const app=express();


mongoose.connect('mongodb://localhost/blog')

app.set('view engine', 'ejs');//view engine converts ejs to html

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))


app.get('/', async(req,res)=>{
    const articles= await Article.find().sort({
        createdAt:'desc'
    })
   res.render('articles/index', {articles: articles}
   );
})
app.use('/articles', articleRouter)
const port=4001;
app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`)
});