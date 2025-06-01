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
  status: "ativo" | "finalizado";
  cor: string;
  timestamp: string;
}

const Cozinha = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const carregarPedidos = () => {
    const pedidosLocalStorage = JSON.parse(localStorage.getItem("pedidos") || "[]");
    setPedidos(pedidosLocalStorage);
  };

  useEffect(() => {
    carregarPedidos();

    // Listener para novos pedidos
    const handleNovoPedido = (event: CustomEvent) => {
      carregarPedidos();
      toast.success("Novo pedido recebido!");
    };

    window.addEventListener("novoPedido", handleNovoPedido as EventListener);
    
    return () => {
      window.removeEventListener("novoPedido", handleNovoPedido as EventListener);
    };
  }, []);

  const finalizarItem = (pedidoId: string, itemIndex: number) => {
    const pedidosAtualizados = pedidos.map(pedido => {
      if (pedido.id === pedidoId) {
        const novosItens = [...pedido.itens];
        novosItens[itemIndex] = { ...novosItens[itemIndex], status: "finalizado" };
        return { ...pedido, itens: novosItens };
      }
      return pedido;
    });

    // Se todos os itens do pedido foram finalizados, marcar o pedido como finalizado
    const pedidoAtualizado = pedidosAtualizados.find(p => p.id === pedidoId);
    if (pedidoAtualizado && pedidoAtualizado.itens.every(item => item.status === "finalizado")) {
      pedidoAtualizado.status = "finalizado";
    }

    setPedidos(pedidosAtualizados);
    localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));
  };

  const restaurarPedido = (pedidoId: string) => {
    const pedidosAtualizados = pedidos.map(pedido => {
      if (pedido.id === pedidoId) {
        return {
          ...pedido,
          status: "ativo" as const,
          itens: pedido.itens.map(item => ({ ...item, status: undefined }))
        };
      }
      return pedido;
    });

    setPedidos(pedidosAtualizados);
    localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));
  };

  const pedidosAtivos = pedidos.filter(p => p.status === "ativo");
  const pedidosFinalizados = pedidos.filter(p => p.status === "finalizado");

  // Criar lista de itens ativos para a grade
  const itensAtivos = pedidosAtivos.flatMap(pedido =>
    pedido.itens.map((item, index) => ({
      ...item,
      pedidoId: pedido.id,
      itemIndex: index,
      cor: pedido.cor,
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
        {/* Área de Pedidos Ativos (75% da tela) */}
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
          <p className="text-sm text-gray-500 mt-2">
            Duplo clique para finalizar um item
          </p>
        </div>

        {/* Área de Pedidos Finalizados (25% da tela) */}
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
                    </div>
                    <RotateCcw className="w-4 h-4 text-white" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Clique para restaurar pedido
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cozinha;
