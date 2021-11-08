module.exports = app => {

    const Sucesso = (data = null, mensagem = null) => ({ status: true, data, mensagem });
    const Falha = (erros = [], mensagem = null) => ({ status: false, erros, mensagem });
    const Finalizar = resposta => {
        if (resposta.status)
            return resposta.data;
        throw resposta.erros;
    };
    const FalhaCatch = e => {
        const stack = e.stack ? ' | stack: ' + e.stack : '';
        return { status: false, erro: e.message + stack };
    };

    return {
        Sucesso,
        Falha,
        Finalizar,
        FalhaCatch
    }
}