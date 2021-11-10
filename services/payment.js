module.exports = app => {

    const { Sucesso, Falha, Finalizar } = app.helpers.results;

    const getAll = async (req, res) => {
        try {
            const resposta = await app.db('payment')
                .select()
                .then(payment => Sucesso(payment))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const get = async (req, res) => {
        const { payment_id } = req.params;
        try {
            const resposta = await app.db('payment')
                .select()
                .where({ payment_id })
                .then(payment => Sucesso(payment))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const put = async (req, res) => {
        const {
            amount,
            customer_id,
            payment_date,
            rental_id,
            staff_id
        } = req.body;

        const last_update = new Date().toFormat();

        try {
            const resposta = await app.db('payment')
                .insert({
                    amount,
                    customer_id,
                    payment_date,
                    rental_id,
                    staff_id,
                    last_update
                })
                .then(([id]) => Sucesso(`Registro inserido com sucesso:\n${JSON.stringify({
                    id,
                    amount,
                    customer_id,
                    payment_date,
                    rental_id,
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