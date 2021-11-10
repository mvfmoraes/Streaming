module.exports = app => {
    app.route('/category').get(app.services.category.getAll);
    app.route('/category/:category_id').get(app.services.category.get);
    app.route('/category').post(app.services.category.put);
}