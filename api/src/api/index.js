const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Criar
router.post('/products', async (req, res) => {
  try {
    const {
      id_produto,
      nome_produto,
      preco_produto,
      quantidade_comprada,
      usuario
    } = req.body;

    const query = 'INSERT INTO carrinho (id_carrinho, id_produto, nome_produto, preco_produto, quantidade_comprada, usuario, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const params = [
      uuidv4(),
      id_produto,
      nome_produto,
      preco_produto,
      quantidade_comprada,
      usuario,
      new Date()
    ];

    await req.conn.execute(query, params, { prepare: true });

    res.json({ message: 'Produto adicionado ao carrinho!' });
  } catch (error) {
    res.json({ message: 'erro' });
  }
});

// Listar
router.get('/products', async (req, res) => {
  try {
    const query = 'SELECT * FROM carrinho';
    const response = await req.conn.execute(query);
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    res.json({ message: 'erro' });
  }
});

// Editar
router.put('/products/:id_carrinho', async (req, res) => {
  try {
    const {
      nome_produto,
      preco_produto,
      quantidade_comprada,
      usuario
    } = req.body;

    const query = 'UPDATE carrinho SET updated_at = ?, nome_produto = ?, preco_produto = ?, quantidade_comprada = ?, usuario = ? WHERE id_carrinho = ?';
    const params = [
      new Date(),
      nome_produto,
      preco_produto,
      quantidade_comprada,
      usuario,
      req.params.id_carrinho
    ];

    await req.conn.execute(query, params, { prepare: true });

    res.json({ message: 'Produto editado do carrinho!' });
  } catch (error) {
    console.log(error);
    res.json({ message: 'erro' });
  }
});

// Delete
router.delete('/products/:id_carrinho', async (req, res) => {
  try {
    const query = 'DELETE FROM carrinho WHERE id_carrinho = ?';
    await req.conn.execute(query, [req.params.id_carrinho]);
    res.status(200).json({ message: 'Jonathan SAFADO e copião, aprendiz de zé!' });
  } catch (error) {
    res.json({ message: 'erro' });
  }
});

module.exports = router;
