import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var blogs = [];
var id = 0;

app.use(express.static("public")); 
app.use(bodyParser.urlencoded({ extended: true }));  

app.get("/", (req, res) => {
    res.render("index.ejs", {blogs});
})

app.post("/create", (req, res) => {
    var title = req.body["titleOfBlog"];
    var content = req.body["contentOfBlog"];
    blogs.push({ id, title, content });
    id += 1;
    res.redirect("/");
})

app.get("/blog/:id", (req, res) => {
    var blog = blogs[req.params.id];
    res.render("blog.ejs", {blog});
})

app.get("/create", (req, res) => {
    res.render("create.ejs");
})

app.get("/delete", (req, res) => {
    res.render("delete.ejs",{blogs});
})

app.post("/delete", (req, res) => {
    blogs.forEach((blog) => {
        if (blog.title == req.body["titleOfBlog"]) {
            blogs.splice(blog.id, 1); 
        }
    })
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Sever started on the port ${port}`);
})