const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let blogs = [
    {id: 1, title: '1st article', text: 'lorem ipsum1'},
    {id: 2, title: '2nd article', text: 'lorem ipsum2'},
    {id: 3, title: '3rd article', text: 'lorem ipsum3'},
    {id: 4, title: '4th article', text: 'lorem ipsum4'},
    {id: 5, title: '5th article', text: 'lorem ipsum5'},
    {id: 6, title: '6th article', text: 'lorem ipsum6'},
    {id: 7, title: '7th article', text: 'lorem ipsum7'}
];

app.get('/blogs', (req, res) => {
    res.send(blogs);
})

app.get('/blogs/:id', (req, res) => {
    const blog = blogs.find(blog => {
        return blog.id === Number(req.params.id)
    });
    res.send(blog);
})

app.post('/blogs', (req, res) => {
    blogs.push({
        id: Date.now(),
        title: req.body.title,
        text: req.body.text
    });
    res.sendStatus(200);
})

app.delete('/blogs', (req, res) => {
    blogs.filter(blog => {
        blog.id === req.body.id;
    });
    res.sendStatus(200);
})

app.put('/blogs/:id', (req, res) => {
    let blog = blogs.find(blog => {
        return blog.id === Number(req.params.id)
    });
    console.log(req.body);
    blog.title = req.body.title;
    blog.text  = req.body.text;
    res.sendStatus(200);
})

app.listen(3012, ()=>{
    console.log('Server is listening port 3012');
})