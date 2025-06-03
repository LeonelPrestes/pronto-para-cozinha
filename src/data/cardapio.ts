export interface MenuItem {
  id: string;
  nome: string;
  foto: string;
}

export const cardapio: MenuItem[] = [
  { id: "1", nome: "Executivo de Frango", foto: "🍗" },
  { id: "2", nome: "Parmegiana", foto: "🍖" },
  { id: "3", nome: "Lasanha", foto: "🍝" },
  { id: "4", nome: "Salmão Grelhado", foto: "🐟" },
  { id: "5", nome: "Risotto", foto: "🍚" },
  { id: "6", nome: "Hambúrguer", foto: "🍔" },
  { id: "7", nome: "Pizza Margherita", foto: "🍕" },
  { id: "8", nome: "Salada Caesar", foto: "🥗" },
];
