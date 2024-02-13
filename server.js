import express from 'express';
import bodyParser from "body-parser";

const app=express();
const port=3000;

app.use(bodyParser.urlencoded({ extended: true }));


const articles=[];

app.get("/",(req,res)=>{
   
    res.render("index.ejs",{
      articles:articles,
    });
})

app.get("/articles/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/articles",(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const markdown = req.body.markdown;

    // Create a new article object
    const newArticle = {
        Title: title,
        Date: new Date(),
        Description: description,
        Markdown: markdown,
    };

    // Add the new article to the array
    articles.push(newArticle);

    // Redirect to the home page
    res.redirect("/");
})

app.get("/view-article/:title",(req,res)=>{
    const title=req.params.title;
    const article = articles.find(article => article.Title === title);

    if (article) {
        res.render('view-article.ejs', { article: article });
    } else {
        res.status(404).send('Article not found');
    }
});

app.get("/edit-article/:title",(req,res)=>{
    const title=req.params.title;
    const article = articles.find(article => article.Title === title);


    if (article) {
        res.render('edit-article.ejs', { article: article });
    } else {
        res.status(404).send('Article not found');
    }
});


app.post("/edit-article/:title", (req, res) => {
    const title = req.params.title;
    const updatedTitle = req.body.title;
    const updatedDescription = req.body.description;
    const updatedMarkdown = req.body.markdown;

    const articleIndex = articles.findIndex(article => article.Title === title);

    if (articleIndex !== -1) {
        // Update the existing article
        articles[articleIndex].Title = updatedTitle;
        articles[articleIndex].Description = updatedDescription;
        articles[articleIndex].Markdown = updatedMarkdown;

        // Redirect to the homepage after updating the article
        res.redirect("/");
    } else {
        res.status(404).send('Article not found');
    }
});


// server.js
// ... (your existing code)

// Add this route for handling delete requests
app.post("/delete-article/:title", (req, res) => {
    const title = req.params.title;

    // Find the index of the article
    const articleIndex = articles.findIndex(article => article.Title === title);

    if (articleIndex !== -1) {
        // Remove the article from the array
        articles.splice(articleIndex, 1);

        // Redirect to the homepage after deleting the article
        res.redirect("/");
    } else {
        res.status(404).send('Article not found');
    }
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });