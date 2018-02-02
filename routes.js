const { Blogs } = require('./models');

module.exports = (app) => {
    app.get('/blogs', (req, res) => {
        Blogs.find({}, (err, blogs) => {
            console.log(err, blogs);
            res.send(blogs);
        });
    });

    app.get('/blogs/:id', (req, res, next) => {
        Blogs.findById(req.params.id, (err, blog) => {
            if (err) {
                return next(err);
            }
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

    app.use((err, req, res, next) => {
        const isNotFound = err.message.indexOf('not found');
        const isCastError = err.message.indexOf('Cast to ObjectId failed');

        if(err.message || (isNotFound && isCastError)) {
            return next(err);
        }
        res.status(500).json({error: err.stack});
    });

    app.use((err, req, res, next) => {
        res.sendStatus(404);
    });
};