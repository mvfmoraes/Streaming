module.exports = app => {
    app.route('/inventory').get(app.services.inventory.getAll);
    app.route('/inventory/:inventory_id').get(app.services.inventory.get);
    app.route('/inventory').post(app.services.inventory.put);
}