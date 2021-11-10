module.exports = app => {
    app.route('/payment').get(app.services.payment.getAll);
    app.route('/payment/:payment_id').get(app.services.payment.get);
    app.route('/payment').post(app.services.payment.put);
}