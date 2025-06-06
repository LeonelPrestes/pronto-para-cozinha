export interface MenuItem {
  id: string;
  nome: string;
  foto: string;
}


export const cardapio: MenuItem[] = [

  { id: "1", nome: "Prato do Dia", foto: "public/img/Captura de tela 2025-06-06 090110.png" },
  { id: "2", nome: "Executivo de Boi", foto: "public/img/Executivo de boi.jpg" },
  { id: "3", nome: "Executivo de Frango", foto: "🍗" },
  { id: "4", nome: "Executivo de Porco", foto: "🐟" },
  { id: "5", nome: "Macarrão", foto: "🍚" },
  { id: "6", nome: "Item 6", foto: "🍔" },
  { id: "7", nome: "Item 7", foto: "🍕" },
  { id: "8", nome: "Item 8", foto: "🥗" },
  { id: "9", nome: "Item 9", foto: "🥗" },
  { id: "10", nome: "Item 10", foto: "🥗" },
];
