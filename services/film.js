module.exports = app => {

    const { Sucesso, Falha, Finalizar } = app.helpers.results;

    const getAll = async (req, res) => {
        try {
            const resposta = await app.db('film')
                .select()
                .then(film => Sucesso(film))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const get = async (req, res) => {
        const { film_id } = req.params;
        try {
            const resposta = await app.db('film')
                .select()
                .where({ film_id })
                .then(film => Sucesso(film))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const put = async (req, res) => {
        const {
            description,
            language_id,
            length,
            original_language_id,
            rating,
            release_year,
            rental_duration,
            rental_rate,
            replacement_cost,
            special_features,
            title
        } = req.body;

        const last_update = new Date().toFormat();

        try {
            const resposta = await app.db('film')
                .insert({
                    description,
                    language_id,
                    length,
                    original_language_id,
                    rating,
                    release_year,
                    rental_duration,
                    rental_rate,
                    replacement_cost,
                    special_features,
                    title,
                    last_update
                })
                .then(([id]) => Sucesso(`Registro inserido com sucesso:\n${JSON.stringify({
                    id,
                    description,
                    language_id,
                    length,
                    original_language_id,
                    rating,
                    release_year,
                    rental_duration,
                    rental_rate,
                    replacement_cost,
                    special_features,
                    title,
                    last_update
                })}`))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    return {
        getAll,
        get,
        put
    }
}