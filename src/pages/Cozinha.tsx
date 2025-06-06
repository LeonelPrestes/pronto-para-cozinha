import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ItemPedido {
  id: string;
  nome: string;
  observacao?: string;
  status?: "finalizado";
}

interface Pedido {
  id: string;
  itens: ItemPedido[];
  mesa: string;
  status: "ativo" | "finalizado";
  cor: string;
  timestamp: string;  
}

const Cozinha = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const carregarPedidos = async () => {
    try {
      const response = await fetch('http://192.168.2.115:8081/api/pedidos');
      if (!response.ok) {
        throw new Error('Erro ao carregar pedidos');
      }
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao carregar pedidos");
    }
  };

  useEffect(() => {
    carregarPedidos();
    const interval = setInterval(() => {
      carregarPedidos();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const finalizarItem = async (pedidoId: string, itemIndex: number) => {
    try {
      await fetch('http://192.168.2.115:8081/api/pedidos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pedidoId,
          itemIndex,
          acao: 'finalizar-item'
        }),
      });
      carregarPedidos();
    } catch (error) {
      console.error('Erro ao finalizar item:', error);
      toast.error("Erro ao finalizar item");
    }
  };

  const restaurarPedido = async (pedidoId: string) => {
    try {
      await fetch('http://192.168.2.115:8081/api/pedidos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pedidoId,
          acao: 'restaurar'
        }),
      });
      carregarPedidos();
    } catch (error) {
      console.error('Erro ao restaurar pedido:', error);
      toast.error("Erro ao restaurar pedido");
    }
  };

  const pedidosAtivos = pedidos.filter(p => p.status === "ativo");
  const pedidosFinalizados = pedidos.filter(p => p.status === "finalizado");

  const itensAtivos = pedidosAtivos.flatMap(pedido =>
    pedido.itens.map((item, index) => ({
      ...item,
      pedidoId: pedido.id,
      itemIndex: index,
      cor: pedido.cor,
      mesa: pedido.mesa,
      finalizado: item.status === "finalizado"
    }))
  ).filter(item => !item.finalizado);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Cozinha - Pedidos</h1>
        <div></div>
      </div>

      <div className="flex gap-4 h-[calc(100vh-120px)]">
        {/* Pedidos Ativos */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Pedidos Ativos</h2>
          <div className="grid grid-cols-4 gap-3 h-full">
            {Array.from({ length: 12 }).map((_, index) => {
              const item = itensAtivos[index];
              return (
                <Card
                  key={index}
                  className={`h-32 cursor-pointer transition-all hover:scale-105 ${
                    item ? "shadow-md" : "border-dashed border-gray-300"
                  }`}
                  style={{
                    backgroundColor: item ? item.cor : "transparent",
                  }}
                  onDoubleClick={() => {
                    if (item) {
                      finalizarItem(item.pedidoId, item.itemIndex);
                    }
                  }}
                >
                  <CardContent className="p-3 h-full flex flex-col justify-center">
                    {item ? (
                      <>
                        <h3 className="font-semibold text-white text-sm mb-1">
                          {item.nome}
                        </h3>
                        {item.observacao && (
                          <p className="text-xs text-white/90 italic">
                            {item.observacao}
                          </p>
                        )}
                        <p className="text-xs text-white/80">
                          Mesa: {item.mesa}
                        </p>
                      </>
                    ) : (
                      <div className="text-center text-gray-400 text-xs">
                        Aguardando pedido
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Pedidos Finalizados */}
        <div className="w-80">
          <h2 className="text-xl font-semibold mb-4">Finalizados</h2>
          <div className="space-y-2 overflow-y-auto h-full">
            {pedidosFinalizados.map((pedido) => (
              <Card
                key={pedido.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                style={{ backgroundColor: pedido.cor }}
                onClick={() => restaurarPedido(pedido.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      {pedido.itens.map((item, index) => (
                        <div key={index} className="text-white">
                          <span className="font-medium text-sm">{item.nome}</span>
                          {item.observacao && (
                            <p className="text-xs text-white/90 italic">
                              {item.observacao}
                            </p>
                          )}
                        </div>
                      ))}
                      <p className="text-xs text-white/80 mt-1">
                        Mesa: {pedido.mesa}
                      </p>
                    </div>
                    <RotateCcw className="w-4 h-4 text-white" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cozinha;
