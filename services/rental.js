module.exports = app => {

    const { Sucesso, Falha, Finalizar } = app.helpers.results;

    const getAll = async (req, res) => {
        try {
            const resposta = await app.db('rental')
                .select()
                .then(rental => Sucesso(rental))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const get = async (req, res) => {
        const { rental_id } = req.params;
        try {
            const resposta = await app.db('rental')
                .select()
                .where({ rental_id })
                .then(rental => Sucesso(rental))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const put = async (req, res) => {
        const {
            customer_id,
            inventory_id,
            rental_date,
            return_date,
            staff_id
        } = req.body;

        const last_update = new Date().toFormat();

        try {
            const resposta = await app.db('rental')
                .insert({
                    customer_id,
                    inventory_id,
                    rental_date,
                    return_date,
                    staff_id,
                    last_update
                })
                .then(([id]) => Sucesso(`Registro inserido com sucesso:\n${JSON.stringify({
                    id,
                    customer_id,
                    inventory_id,
                    rental_date,
                    return_date,
                    staff_id,
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