import express from 'express'
import Funcao from './functions'
import Banco from '../Banco/connect'

const router = express.Router()


router.post('/login', async (req, res, ) => {
    const email = req.body.email
    const senha = req.body.password

    const banco= await Banco.session()
    const iduser = await banco.query({
        rowMode : 'array',
        text: 'SELECT id_user FROM classifipatos.user u where u.email= $1 and u.senha= $2;',
      },[email, senha])

    if(iduser.rows>0){
        const token= Funcao.gerajwt(iduser.rows)
        res.status(202).json('token: ' + token)
    }else{
        res.status(401).json("Verifique seu login")
    }

})

router.post('/cadastro', async (req, res, ) => {
    const nome  = req.body.nome
    const email = req.body.email
    const senha = req.body.password

    const banco= await Banco.session()
    
    await banco.query({
        rowMode : 'array',
        text: "INSERT INTO ClassifiPatos.user(nome,email, senha)VALUES ($1,$2,$3);",
      },[nome,email, senha])

    const iduser = await banco.query({
        rowMode : 'array',
        text: 'SELECT id_user FROM classifipatos.user u where u.email= $1 and u.senha= $2;',
      },[email, senha])

    if(iduser.rows>0){
        const token= Funcao.gerajwt(iduser.rows)
        res.status(202).json('token: ' + token)
    }else{
        res.status(401).json("Verifique seu login")
    }

})

router.get('/testeconexao', async (req, res, ) => {
    const token = req.body.token
    const id= Funcao.verificajwt(token) 
    res.json(id)
})
router.put('/', async (req, res, ) => {})
router.delete('/', async (req, res, ) => {})





module.exports = router