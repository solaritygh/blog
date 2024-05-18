const express = require("express");
const app = express();
const markdownit = require("markdown-it");
const hljs = require('highlight.js');
const server = require('http').createServer(app);

// Built-in module to access and interact with the file system
const fs = require("fs")
// To parse front matter from Markdown files
const matter = require("gray-matter")

app.set("view engine", "ejs")
app.use(express.static("public"))

const getPosts = () => {
    // Get the posts from their directory
    const posts = fs.readdirSync(__dirname + "/views/posts").filter((post) => post.endsWith(".md"))
    // Set the post content as an empty array
    const postContent = []
    // Inject into the post content array the front matter
    posts.forEach((post) => {
        postContent.push(matter.read(__dirname + "/views/posts/" + post))
    })

    /**
     * 1- Return a list of posts as a two dimensional array containing for each one :
     * . the post filename with it's extension (e.g : postFilename.md)
     * . the post content as an object {content:"Markdown content as a string", data:{front matter}, excerpt:""}
     * 2- Return each array as an object and create a Date instance from it's date front matter
     * 3- Sort posts by publication's date in descending order (newest to oldest)
     */
    const postsList = posts
        .map(function (post, i) {
            return [post, postContent[i]]
        })
        .map((obj) => {
            return { ...obj, date: new Date(obj[1].data.date) }
        })
        .sort((objA, objB) => Number(objB.date) - Number(objA.date))

    return postsList
}

app.get("/", (req, res) => {
    res.render("index")
})

// Render the list of posts on the main route
app.get("/posts", (req, res) => {
    res.render("postsList", {
        posts: getPosts(),
    })
})

// Using a route parameter to render each post on a route matching it's filename
app.get("/posts/:post", (req, res) => {
    const postTitle = req.params.post // Get the Markdown filename

    // Read the Markdown file and parse it's front matter
    const post = matter.read(__dirname + "/views/posts/" + postTitle + ".md")

    // Convert the Markdown file content to HTML with markdown-it
    // Actual default values
    const md = markdownit({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
            try {
                return `<div class="highlight-container">${hljs.highlight(str, { language: lang }).value}</div>`;
            } catch (__) {}
            }

            return ''; // use external default escaping
        },
        html: true,
    });
    const content = post.content // Read the Markdown file content
    const html = md.render(content) // Convert the Markdown file content to HTML

    // Render the postsTemplate for each post and pass it's front matter as a data object into postsTemplate
    res.render("postsTemplate", {
        title: post.data.title,
        date: post.data.date,
        postContent: html,
    })
})

// Launching the application on port 3000
app.listen(3000, () => {
    console.log(`portfolio + blog running at localhost:3000 :3`)
})