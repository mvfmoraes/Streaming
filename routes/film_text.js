module.exports = app => {
    app.route('/film_text').get(app.services.film_text.getAll);
    app.route('/film_text/:film_id').get(app.services.film_text.get);
    app.route('/film_text').post(app.services.film_text.put);
}