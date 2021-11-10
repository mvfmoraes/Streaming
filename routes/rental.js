module.exports = app => {
    app.route('/rental').get(app.services.rental.getAll);
    app.route('/rental/:rental_id').get(app.services.rental.get);
    app.route('/rental').post(app.services.rental.put);
}