module.exports = app => {
    app.route('/city').get(app.services.city.getAll);
    app.route('/city/:city_id').get(app.services.city.get);
    app.route('/city').post(app.services.city.put);
}