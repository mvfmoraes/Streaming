module.exports = app => {
    app.route('/film_category').get(app.services.film_category.getAll);
    app.route('/film_category/:film_id').get(app.services.film_category.get);
    app.route('/film_category').post(app.services.film_category.put);
}