module.exports = app => {

    const { Sucesso, Falha, Finalizar } = app.helpers.results;

    const getAll = async (req, res) => {
        try {
            const resposta = await app.db('address')
                .select()
                .then(actors => Sucesso(actors))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const get = async (req, res) => {
        const { address_id } = req.params;
        try {
            const resposta = await app.db('address')
                .select()
                .where({ address_id })
                .then(address => Sucesso(address))
                .catch(erro => Falha(erro));

            return res.status(200).send({ status: true, data: Finalizar(resposta) });
        } catch (erro) {
            return res.status(400).send({ status: false, erros: erro });
        }
    }

    const put = async (req, res) => {
        const {
            address,
            address2,
            district,
            city_id,
            postal_code,
            phone,
            location
        } = req.body;

        const last_update = new Date().toFormat();

        try {
            const resposta = await app.db('address')
                .insert({
                    address,
                    address2,
                    district,
                    city_id,
                    postal_code,
                    phone,
                    location,
                    last_update
                })
                .then(() => Sucesso(`Registro inserido com sucesso:\n${JSON.stringify({
                    address,
                    address2,
                    district,
                    city_id,
                    postal_code,
                    phone,
                    location,
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