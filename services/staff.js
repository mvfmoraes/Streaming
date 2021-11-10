module.exports = app => {

    const { Sucesso, Falha, Finalizar } = app.helpers.results;

    const getAll = async (req, res) => {
        try {
            const resposta = await app.db('staff')
                .select()
                .then(staff => Sucesso(staff))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const get = async (req, res) => {
        const { staff_id } = req.params;
        try {
            const resposta = await app.db('staff')
                .select()
                .where({ staff_id })
                .then(staff => Sucesso(staff))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const put = async (req, res) => {
        const {
            active,
            address_id,
            email,
            first_name,
            last_name,
            password,
            picture,
            store_id,
            username
        } = req.body;

        const last_update = new Date().toFormat();

        try {
            const resposta = await app.db('staff')
                .insert({
                    active,
                    address_id,
                    email,
                    first_name,
                    last_name,
                    password,
                    picture,
                    store_id,
                    username,
                    last_update
                })
                .then(([id]) => Sucesso(`Registro inserido com sucesso:\n${JSON.stringify({
                    id,
                    active,
                    address_id,
                    email,
                    first_name,
                    last_name,
                    password,
                    picture,
                    store_id,
                    username,
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