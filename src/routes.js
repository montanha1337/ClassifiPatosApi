import { Router } from 'express';
import Dev from './controller/Desenvolvedor'
import User from './controller/Sessioncontroller'
import Vendedor from './controller/Vendedorcontroller'
import Anuncio from './controller/Anunciocontroller'
import Home from './controller/HomeController'
import Cliente from './controller/ClienteController'
import Negociacao from './controller/NegociacaoController'
import Web        from './web/WebController'

const routes = new Router();
//olhar o final da rota 
//web
routes.use('/web',Web)
//Api
routes.use('/', async (req, res) => {
    res.sendFile(__dirname+'/web/PaginaErro.html')
});
routes.use('/desenvolvimento',Dev) //Rota com ferramentas para auxiliar o frontend e demais areas
routes.use('/user',User)           //Rota para manipulação de usuario
routes.use('/vendedor',Vendedor)           //Rota para manipulação de Vendedor
routes.use('/anuncio',Anuncio)           //Rota para manipulação de Anuncio
routes.use('/home',Home)           //Rota para manipulação de Home
routes.use('/cliente',Cliente)           //Rota para manipulação de Cliente
routes.use('/negociacao',Negociacao)           //Rota para manipulação de da negociação do anuncio.



module.exports = routes;