const { Blogs } = require('./models');

module.exports = (app) => {
    app.get('/blogs', (req, res) => {
        Blogs.find({}, (err, blogs) => {
            console.log(err, blogs);
            res.send(blogs);
        });
    });

    app.get('/blogs/:id', (req, res) => {
        Blogs.findById(req.params.id, (err, blog) => {
            console.log(err, blog);
            res.json(blog);
        });
    });

    app.post('/blogs', (req, res) => {
        Blogs.create(req.body, (err) => {
            console.log(err);
            res.sendStatus(200);
        });
    });

    app.put('/blogs/:id', (req, res) => {
        Blogs.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: false }, (err) => {
            if (err) return res.send(err);
            return res.sendStatus(200);
        });
    });

    app.delete('/blogs/:id', (req, res) => {
        Blogs.remove({ _id: req.params.id }, (err) => {
            (err) ? res.send(err) : res.sendStatus(200);
        });
    });
};