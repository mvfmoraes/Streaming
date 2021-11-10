module.exports = app => {

    const { Sucesso, Falha, Finalizar } = app.helpers.results;

    const getAll = async (req, res) => {
        try {
            const resposta = await app.db('customer')
                .select()
                .then(customer => Sucesso(customer))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const get = async (req, res) => {
        const { customer_id } = req.params;
        try {
            const resposta = await app.db('customer')
                .select()
                .where({ customer_id })
                .then(customer => Sucesso(customer))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const put = async (req, res) => {
        const {
            store_id,
            first_name,
            last_name,
            email,
            address_id,
            active,
            create_date
        } = req.body;

        const last_update = new Date().toFormat();

        try {
            const resposta = await app.db('customer')
                .insert({
                    store_id,
                    first_name,
                    last_name,
                    email,
                    address_id,
                    active,
                    create_date,
                    last_update
                })
                .then(([id]) => Sucesso(`Registro inserido com sucesso:\n${JSON.stringify({
                    id,
                    store_id,
                    first_name,
                    last_name,
                    email,
                    address_id,
                    active,
                    create_date,
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