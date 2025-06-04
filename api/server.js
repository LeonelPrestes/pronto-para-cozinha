import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

const filePath = path.join(process.cwd(), 'data', 'pedidos.json');

function lerPedidos() {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data || '[]');
}

function salvarPedidos(pedidos) {
  fs.writeFileSync(filePath, JSON.stringify(pedidos, null, 2));
}

app.get('/api/pedidos', (req, res) => {
  const pedidos = lerPedidos();
  res.json(pedidos);
});

app.post('/api/pedidos', (req, res) => {
  const novoPedido = req.body;
  const pedidos = lerPedidos();
  pedidos.push(novoPedido);
  salvarPedidos(pedidos);
  res.status(201).json({ message: 'Pedido criado com sucesso' });
});

app.patch('/api/pedidos', (req, res) => {
  const { pedidoId, itemIndex, acao } = req.body;

  const pedidos = lerPedidos();
  const pedido = pedidos.find(p => p.id === pedidoId);

  if (!pedido) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }

  if (acao === 'finalizar-item') {
    if (pedido.itens[itemIndex]) {
      pedido.itens[itemIndex].status = 'finalizado';
    } else {
      return res.status(400).json({ error: 'Item inválido' });
    }

    const todosFinalizados = pedido.itens.every(item => item.status === 'finalizado');
    if (todosFinalizados) {
      pedido.status = 'finalizado';
    }

    salvarPedidos(pedidos);
    return res.status(200).json({ message: 'Item finalizado', pedido });
  }

  if (acao === 'restaurar') {
    pedido.status = 'ativo';
    pedido.itens.forEach(item => {
      delete item.status;
    });

    salvarPedidos(pedidos);
    return res.status(200).json({ message: 'Pedido restaurado', pedido });
  }

  return res.status(400).json({ error: 'Ação inválida' });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
