module.exports = app => {
    app.route('/store').get(app.services.store.getAll);
    app.route('/store/:store_id').get(app.services.store.get);
    app.route('/store').post(app.services.store.put);
}