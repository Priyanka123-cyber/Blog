const express=require('express');
const Article= require('./../models/article')
const router=express.Router();
const mongoose=require('mongoose')

router.get('/new',(req,res)=>{
    res.render('articles/new',{article: new Article()})
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) { // Check if the id is a valid ObjectId
      return res.redirect('/'); // Redirect if the ID is not valid
    }
    try {
      const article = await Article.findById(id);
      if (article == null) {
        return res.redirect('/'); // Redirect if no article is found
      }
      res.render('articles/show', { article: article });
    } catch (error) {
      console.error(error);
      res.redirect('/'); // In case of any error, redirect
    }
  });

router.post('/',async(req,res)=>{
  let article=new Article({
    title:req.body.title,
    description:req.body.description,
    markdown:req.body.markdown
  }) 
  try {
    article= await article.save()
    res.redirect(`/articles/${article.id}`)
  } catch (error) {
    console.log(error)
    res.render('articles/new',{article:article})
  }
  
})






router.delete('/:id',async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports=router;