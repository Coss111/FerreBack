const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.use(bodyParser.json())

const PUERTO = 3000

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'ferreteria',
    user: 'root',
    password: ''
})

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
})

conexion.connect(error => {
    if (error) throw error
    console.log('Conexión exitosa a la base de datos');
})

app.get('/', (req, res) => {
    res.send('API')
})

app.get('/totalRows', (req, res) => {
    const query = `SELECT COUNT(*) AS totalRows FROM productos;`
    conexion.query(query, (error, result) => {
        if (error) return console.error(error.message)

        if (result.length > 0) {
            res.json(result)
        } else {
            res.json(`No hay datos en la tabla`)
        }
    })
})

app.get('/productos', (req, res) => {
    const query = `SELECT * FROM productos;`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`No hay registros de productos`)
        }
    })
})

app.get('/productos/:id', (req, res) => {
    const {
        id
    } = req.params

    const query = `SELECT * FROM productos WHERE id_producto=${id};`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`No hay productos`)
        }
    })
})

app.post('/productos/agregar', (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        precio: req.body.precio
    }

    const query = `INSERT INTO productos SET ?`
    conexion.query(query, usuario, (error) => {
        if (error) return console.error(error.message)

        res.json(`Se insertó correctamente el producto`)
    })
})

app.post('/productos/comprar/1', (req, res) => {
    const usuario = {
        nombre: 'Caja de herramientas',
        precio: 40
    }

    const query = `INSERT INTO productos SET ?`
    conexion.query(query, usuario, (error) => {
        if (error) return console.error(error.message)

        res.json(`Se compro correctamente la caja de herramientas`)
    })
})

app.post('/productos/comprar/2', (req, res) => {
    const usuario = {
        nombre: 'Cinta métrica',
        precio: 10
    }

    const query = `INSERT INTO productos SET ?`
    conexion.query(query, usuario, (error) => {
        if (error) return console.error(error.message)

        res.json(`Se compro correctamente la Cinta métrica`)
    })
})

app.post('/productos/comprar/3', (req, res) => {
    const usuario = {
        nombre: 'Martillo de carpintero',
        precio: 18
    }

    const query = `INSERT INTO productos SET ?`
    conexion.query(query, usuario, (error) => {
        if (error) return console.error(error.message)

        res.json(`Se compro correctamente el Martillo de carpintero`)
    })
})

app.post('/productos/comprar/4', (req, res) => {
    const usuario = {
        nombre: 'Alicate universal',
        precio: 15
    }

    const query = `INSERT INTO productos SET ?`
    conexion.query(query, usuario, (error) => {
        if (error) return console.error(error.message)

        res.json(`Se compro correctamente el Alicate universal`)
    })
})

app.post('/productos/comprar/5', (req, res) => {
    const usuario = {
        nombre: 'Pintura acrílica',
        precio: 8
    }

    const query = `INSERT INTO productos SET ?`
    conexion.query(query, usuario, (error) => {
        if (error) return console.error(error.message)

        res.json(`Se compro correctamente la Pintura acrílica`)
    })
})

app.post('/productos/comprar/6', (req, res) => {
    const usuario = {
        nombre: 'Guantes de seguridad',
        precio: 8
    }

    const query = `INSERT INTO productos SET ?`
    conexion.query(query, usuario, (error) => {
        if (error) return console.error(error.message)

        res.json(`Se compro correctamente los Guantes de seguridad`)
    })
})

app.post('/productos/comprar/7', (req, res) => {
    const usuario = {
        nombre: 'Cinta adhesiva de doble cara',
        precio: 5
    }

    const query = `INSERT INTO productos SET ?`
    conexion.query(query, usuario, (error) => {
        if (error) return console.error(error.message)

        res.json(`Se compro correctamente la Cinta adhesiva de doble cara`)
    })
})

app.post('/productos/comprar/8', (req, res) => {
    const usuario = {
        nombre: 'Tornillos y tuercas surtidos',
        precio: 5
    }

    const query = `INSERT INTO productos SET ?`
    conexion.query(query, usuario, (error) => {
        if (error) return console.error(error.message)

        res.json(`Se compro correctamente los Tornillos y tuercas surtidos`)
    })
})


app.put('/productos/actualizar/:id', (req, res) => {
    const {
        id
    } = req.params
    const {
        nombre,
        precio
    } = req.body

    const query = `UPDATE productos SET nombre='${nombre}', precio='${precio}' WHERE id_producto='${id}';`
    conexion.query(query, (error) => {
        if (error) return console.error(error.message)

        res.json(`Se actualizó correctamente el producto`)
    })
})

app.delete('/productos/borrar/:id', (req, res) => {
    const {
        id
    } = req.params

    const query = `DELETE FROM productos WHERE id_producto=${id};`
    conexion.query(query, (error) => {
        if (error) console.error(error.message)

        res.json(`Se eliminó correctamente el producto`)
    })
})