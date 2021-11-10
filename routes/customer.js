module.exports = app => {
    app.route('/customer').get(app.services.customer.getAll);
    app.route('/customer/:customer_id').get(app.services.customer.get);
    app.route('/customer').post(app.services.customer.put);
}