module.exports = app => {
    app.route('/address').get(app.services.address.getAll);
    app.route('/address/:address_id').get(app.services.address.get);
    app.route('/address').post(app.services.address.put);
}