module.exports = app => {

    const { Sucesso, Falha, Finalizar } = app.helpers.results;

    const getAll = async (req, res) => {
        try {
            const resposta = await app.db('store')
                .select()
                .then(store => Sucesso(store))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const get = async (req, res) => {
        const { store_id } = req.params;
        try {
            const resposta = await app.db('store')
                .select()
                .where({ store_id })
                .then(store => Sucesso(store))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const put = async (req, res) => {
        const {
            address_id,
            manager_staff_id
        } = req.body;

        const last_update = new Date().toFormat();

        try {
            const resposta = await app.db('store')
                .insert({
                    address_id,
                    manager_staff_id,
                    last_update
                })
                .then(([id]) => Sucesso(`Registro inserido com sucesso:\n${JSON.stringify({
                    id,
                    address_id,
                    manager_staff_id,
                    last_update
                })
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