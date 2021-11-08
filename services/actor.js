module.exports = app => {

    const { Sucesso, Falha, Finalizar } = app.helpers.results;

    const getAll = async (req, res) => {
        try {
            const resposta = await app.db('actor')
                .select()
                .then(actors => Sucesso(actors))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const get = async (req, res) => {
        const { actor_id } = req.params;
        try {
            const resposta = await app.db('actor')
                .select()
                .where({ actor_id })
                .then(actors => Sucesso(actors))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const put = async (req, res) => {
        const {
            first_name,
            last_name
        } = req.body;

        const last_update = new Date().toFormat();

        try {
            const resposta = await app.db('actor')
                .insert({
                    first_name,
                    last_name,
                    last_update
                })
                .then(() => Sucesso(`Registro inserido com sucesso:\n${JSON.stringify({
                    first_name,
                    last_name,
                    last_update
                })}`))
                .catch(erro => {
                    console.log(erro);
                    return Falha(erro);
                });

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