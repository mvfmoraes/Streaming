module.exports = app => {
    app.route('/country').get(app.services.country.getAll);
    app.route('/country/:country_id').get(app.services.country.get);
    app.route('/country').post(app.services.country.put);
}