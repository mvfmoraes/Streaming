module.exports = app => {
    app.route('/actor').get(app.services.actor.getAll);
    app.route('/actor/:actor_id').get(app.services.actor.get);
    app.route('/actor').post(app.services.actor.put);
}