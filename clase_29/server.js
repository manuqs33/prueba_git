const mysql = require('mysql2/promise'); 
const express = require('express');
const app = express();
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bancoargentina'
});
app.use(express.json());
// Get Users
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error en la consulta de usuarios:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
// Post Users
app.post('/users', async ( req , res ) => {
    try {
        const { user , password } = req.body;
        const [ rows ] = await db.query("INSERT INTO `users` (`id`, `user`, `password`) VALUES (NULL,?,?);",[user,password]);
        res.json(rows);
    } catch (error) {
        console.error('Error en la consulta de usuarios:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' }); 
    }
})
// Delete Users 
app.delete('/users/:id', async ( req ,res ) => {
    try {
        const { id } = req.params;
        const [ rows ] = await db.query('DELETE FROM users WHERE id=?',[id]);
        res.json(rows);
    } catch (error) {
        console.error('Error en la consulta de usuarios:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' }); 
    }
});

// Get Cuentas Bancarias
app.get('/cuentabancaria', async ( req , res ) => {
    try {
        const [rows] = await db.query('SELECT * FROM cuentabancaria');
        res.json(rows);
    } catch (error) {
        console.error('Error en la consulta de usuarios:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
// Post Cuentas Bancarias
app.post('/cuentabancaria', async ( req , res ) => {
    try {
        const { cuenta , cbu , dni , nombre , apellido , pesos , dolares } = req.body;
        const [ rows ] = await db.query("INSERT INTO `cuentabancaria` (`id`, `cuenta`, `cbu`, `dni`, `nombre`, `apellido`, `pesos`, `dolares`) VALUES (NULL,?,?,?,?,?,?,?);",[cuenta , cbu , dni , nombre , apellido , pesos , dolares]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
// Delete Cuentas Bancarias
app.delete('/cuentabancaria/:id', async ( req ,res ) => {
    try {
        const { id } = req.params;
        const [ rows ] = await db.query('DELETE FROM cuentabancaria WHERE id=?',[id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})

app.listen(4000,() => {
    console.log('Server on port 4000');
})