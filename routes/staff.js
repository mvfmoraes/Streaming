module.exports = app => {
    app.route('/staff').get(app.services.staff.getAll);
    app.route('/staff/:staff_id').get(app.services.staff.get);
    app.route('/staff').post(app.services.staff.put);
}