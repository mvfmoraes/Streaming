module.exports = app => {

    const { Sucesso, Falha, Finalizar } = app.helpers.results;

    const getAll = async (req, res) => {
        try {
            const resposta = await app.db('language')
                .select()
                .then(language => Sucesso(language))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const get = async (req, res) => {
        const { language_id } = req.params;
        try {
            const resposta = await app.db('language')
                .select()
                .where({ language_id })
                .then(language => Sucesso(language))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const put = async (req, res) => {
        const {
            name
        } = req.body;

        const last_update = new Date().toFormat();

        try {
            const resposta = await app.db('language')
                .insert({
                    name,
                    last_update
                })
                .then(([id]) => Sucesso(`Registro inserido com sucesso:\n${JSON.stringify({
                    id,
                    name,
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