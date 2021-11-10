module.exports = app => {

    const { Sucesso, Falha, Finalizar } = app.helpers.results;

    const getAll = async (req, res) => {
        try {
            const resposta = await app.db('city')
                .select()
                .then(city => Sucesso(city))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const get = async (req, res) => {
        const { city_id } = req.params;
        try {
            const resposta = await app.db('city')
                .select()
                .where({ city_id })
                .then(city => Sucesso(city))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const put = async (req, res) => {
        const {
            city,
            country_id
        } = req.body;

        const last_update = new Date().toFormat();

        try {
            const resposta = await app.db('city')
                .insert({
                    city,
                    country_id,
                    last_update
                })
                .then(([id]) => Sucesso(`Registro inserido com sucesso:\n${JSON.stringify({
                    id,
                    city,
                    country_id,
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