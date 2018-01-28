const express = require('express');
const bodyParser = require('body-parser');
const { BLOGS } = require('./data');
const logger = require('./logger');

let blogs = BLOGS;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

app.get('/blogs', (req, res) => {
    logger.info(`All blogs request`);
    res.send(blogs);
})

app.get('/blogs/:id', (req, res) => {
    logger.info(`Request for blog with ID = ${Number(req.params.id)}`);

    const blog = blogs.find(blog => {
        return blog.id === Number(req.params.id)
    });

    if (blog) {
        res.send(blog);
    } else {
        res.sendStatus(404);  
    }
})

app.post('/blogs', (req, res) => {
    if (req.body.title & req.body.text) {
        blogs.push({
            id: Date.now(),
            title: req.body.title,
            text: req.body.text
        });
        logger.info(`Blog was successfully posted`);
        res.sendStatus(200);
    } else {
        logger.info(`Blog post failed`);
        res.sendStatus(400);
    }
})

app.delete('/blogs/:id', (req, res) => {
    const state = blogs;
    blogs = blogs.filter(blog => {
        return blog.id !== Number(req.params.id);
    });
    if (state.length == blogs.length) {
        logger.info(`Blog with id = ${req.params.id} wasn't found`);
        res.sendStatus(200);
    } else {
        logger.info(`Blog with id = ${req.params.id} was deleted`);
        res.sendStatus(200);
    }
})

app.put('/blogs/:id', (req, res) => {
    const blog = blogs.find(blog => {
        return blog.id === Number(req.params.id)
    });

    if (blog) {
        const { title, text } = req.body;
        console.log(title, text);
        if (title) {
            blog.title = title;
            logger.info(`Blog with id = ${req.params.id} was updated. New title : ${title}.`);
        }
        if (text) {
            blog.text = text;
            logger.info(`Blog with id = ${req.params.id} was updated. New text : ${text}.`);
        }
        res.sendStatus(200);
    } else {
        logger.info(`Blog with id = ${req.params.id} wasn't found.`);
        res.sendStatus(400);
    }
})

app.get('/*', function (req, res) {
    logger.info(`Request to wrong route`);
    res.render('index', { title: 'Error page', message: 'Error!', text: 'Wrong route'})
})

app.listen(3012, () => {
    console.log('Server is listening port 3012');
})
