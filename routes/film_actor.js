module.exports = app => {
    app.route('/film_actor').get(app.services.film_actor.getAll);
    app.route('/film_actor/:actor_id').get(app.services.film_actor.get);
    app.route('/film_actor').post(app.services.film_actor.put);
}