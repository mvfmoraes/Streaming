module.exports = app => {
    app.route('/film').get(app.services.film.getAll);
    app.route('/film/:film_id').get(app.services.film.get);
    app.route('/film').post(app.services.film.put);
}