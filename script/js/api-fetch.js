export default function initApiFetch(){
    const form = document.forms.cep;
    const btn = document.querySelector('.buscar');
    const endereco = document.querySelector('.endereco');

    btn.addEventListener('click',handleClick);
    function handleClick(event){
        event.preventDefault();
        endereco.classList.remove('ativo');
        const intervalo = setInterval(() => {
            const cep = form.numcep.value;
            if(cep.includes('-') || cep.includes('‑')){
                let format;
                cep.includes('-') ? format = cep.split('-').join('') : format = cep.split('‑').join('');
                console.log(format);//cep formatado se tiver com -;
                getaddress(format);
            }
            else
                getaddress(cep);

            endereco.classList.add('ativo');
            console.log('ok');
            clearInterval(intervalo);
        },400);
    }
    async function getaddress(cep){
        try{
            const url = `https://viacep.com.br/ws/${cep}/json/`; //url da API dentro do async
            const response = await fetch(url);
            const body = await response.json();
            const retorno = document.forms.retorno;
            Object.keys(body).forEach((e) => {
               
                if(retorno[e] && body[e])
                    retorno[e].value = body[e];
            });
        }
        catch(erro){
            console.log('erro tipo ',erro);
        }
    }
}
