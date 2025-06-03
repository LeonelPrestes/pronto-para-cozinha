
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cardapio } from "@/data/cardapio"; // Importar o cardápio de um arquivo separado
import { set } from "date-fns";

interface MenuItem {
  id: string;
  nome: string;
  foto: string;
}
interface SelectedItem {
  id: string;
  nome: string;
  observacao?: string;
}

const cores = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"];

const Garcom = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [observacao, setObservacao] = useState("");
  const [mesa, setMesa] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMesaDialogOpen, setIsMesaDialogOpen] = useState(false);


  const adicionarItem = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setObservacao("");
    setIsDialogOpen(true);
  };

  const confirmarAdicao = () => {
    if (selectedMenuItem) {
      const novoItem: SelectedItem = {
        id: selectedMenuItem.id + "-" + Date.now(),
        nome: selectedMenuItem.nome,
        observacao: observacao.trim() || undefined,
      };
      setSelectedItems([...selectedItems, novoItem]);
      setIsDialogOpen(false);
      setSelectedMenuItem(null);
      setObservacao("");
      setMesa(""); // Limpar campo de mesa
    }
  };

  const removerItem = (itemId: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const enviarPedido = () => {
    if (selectedItems.length === 0) {
      toast.error("Selecione pelo menos um item");
      return;
    }

    const pedido = {
      id: Date.now().toString(),
      itens: selectedItems,
      mesa: mesa.trim(),
      status: "ativo",
      cor: cores[Math.floor(Math.random() * cores.length)],
      timestamp: new Date().toISOString(),
    };

    // Salvar no localStorage
    const pedidosExistentes = JSON.parse(localStorage.getItem("pedidos") || "[]");
    pedidosExistentes.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidosExistentes));

    // Disparar evento customizado para comunicação em tempo real
    window.dispatchEvent(new CustomEvent("novoPedido", { detail: pedido }));

    toast.success("Pedido enviado com sucesso!");
    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixo */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          {/* Mini-cards dos itens selecionados */}
          <div className="flex-1 mx-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 bg-blue-100 rounded-lg px-3 py-1 flex items-center gap-2 min-w-0"
                >
                  <span className="text-sm font-medium truncate">{item.nome}</span>
                  <button
                    onClick={() => removerItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setIsMesaDialogOpen(true)}
            disabled={selectedItems.length === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar
          </Button>

        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="pt-24 p-4">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {cardapio.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-md transition-shadow aspect-square"
              onClick={() => adicionarItem(item)}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <div className="text-4xl mb-2">{item.foto}</div>
                <h3 className="text-sm font-medium text-center">{item.nome}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog para observações */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar {selectedMenuItem?.nome}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Observação (opcional)</label>
              <Textarea
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                placeholder="Ex: Sem cebola, ponto da carne..."
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={confirmarAdicao}
                className="flex-1"
              >
                Adicionar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Dialog para mesa */}
      <Dialog open={isMesaDialogOpen} onOpenChange={setIsMesaDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Informe o número da mesa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Mesa</label>
              <input
                type="text"
                value={mesa}
                onChange={(e) => setMesa(e.target.value)}
                placeholder="Ex: 12"
                className="mt-1 block w-full border rounded-md p-2 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsMesaDialogOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  enviarPedido();
                  setIsMesaDialogOpen(false);
                }}
                className="flex-1"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Garcom;
