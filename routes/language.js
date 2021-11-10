module.exports = app => {
    app.route('/language').get(app.services.language.getAll);
    app.route('/language/:language_id').get(app.services.language.get);
    app.route('/language').post(app.services.language.put);
}