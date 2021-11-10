module.exports = app => {

    const { Sucesso, Falha, Finalizar } = app.helpers.results;

    const getAll = async (req, res) => {
        try {
            const resposta = await app.db('category')
                .select()
                .then(category => Sucesso(category))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const get = async (req, res) => {
        const { category_id } = req.params;
        try {
            const resposta = await app.db('category')
                .select()
                .where({ category_id })
                .then(category => Sucesso(category))
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
            const resposta = await app.db('category')
                .insert({
                    name,
                    last_update
                })
                .then(() => Sucesso(`Registro inserido com sucesso:\n${JSON.stringify({
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