import type { Placa } from "../types/placa"

export const placas: Placa[] = [
  { id: 1, latitude: -4.9714, longitude: -39.0157, titulo: "Placa 01", endereco: "Av. Principal", descricao: "Avenida principal.", foto: "/placas/placa-01.jpeg" },
  { id: 46, latitude: -4.9710, longitude: -39.0142, titulo: "Placa 46", endereco: "Rua do Campo", descricao: "Velocidade 30 km/h.", foto: "/placas/placa-03.jpg" },

  ...Array.from({ length: 8000 }).map((_, index) => {
    const id = index + 47;
    

    const randomLat = -4.9650 - (Math.random() * 0.0150);
    const randomLng = -39.0100 - (Math.random() * 0.0150);
    
    const enderecos = [
      "Rodovia CE-265", "Av. Plácido Castelo", "Av. Jesus Maria José", 
      "Rua Epitácio Pessoa", "Rua Tenente Cravo", "Rua Rui Barbosa", 
      "Bairro Campo Novo", "Bairro Baviera", "Bairro Combate", 
      "Esquina Perigosa", "Cruzamento Central", "Poste da Praça"
    ];
    const descricoes = [
      "Velocidade máxima de 60 km/h.",
      "Velocidade máxima de 50 km/h.",
      "Lombada física à frente.",
      "Atenção: cruzamento perigoso.",
      "Dê a preferência.",
      "Proibido trânsito de caminhões.",
      "Permitido estacionar.",
      "Atenção: Animais na pista.",
      "Curva perigosa à esquerda.",
      "Curva perigosa à direita."
    ];
    const fotos = ["/placas/placa-01.jpeg", "/placas/placa-02.jpeg", "/placas/placa-03.jpg"];

    return {
      id: id,
      latitude: Number(randomLat.toFixed(5)), 
      longitude: Number(randomLng.toFixed(5)),
      titulo: `Placa de sinalização ${id.toString().padStart(4, '0')}`,
      endereco: enderecos[id % enderecos.length],
      descricao: descricoes[id % descricoes.length],
      foto: fotos[id % fotos.length],
    };
  })
]