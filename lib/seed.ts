// lib/seed.ts
import { prisma } from "./prisma";

// Funções auxiliares
function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function generateSKU(category: string, index: number) {
  const prefix = category.substring(0, 3).toUpperCase();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}-${random}-${index}`;
}

function randomPrice(min: number, max: number) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

// Lista de produtos por categoria
const productsData = [
  {
    category: "Limpeza",
    products: [
      "Detergente Líquido Neutro 500ml",
      "Álcool em Gel 70% 1L",
      "Saponáceo Cremoso 5L",
      "Desinfetante Concentrado 1L",
      "Lustra Móveis Aerosol 400ml",
      "Cera Líquida para Pisos 5L",
      "Removedor de Gordura 500ml",
      "Cloro Ativo 2L",
      "Água Sanitária 1L",
      "Desincrustante para Banheiros 500ml",
      "Sabão em Pó 5kg",
      "Amaciante Concentrado 2L",
      "Esponja Multiuso (pacote com 5)",
      "Pano de Microfibra (pacote com 10)",
      "Vassoura de Nylon",
      "Rodo para Piso 45cm",
      "Balde com Capacidade 20L",
      "Luva de Borracha para Limpeza",
      "Máscara Descartável (caixa com 50)",
      "Luvas Descartáveis (caixa com 100)",
    ],
  },
  {
    category: "Manutenção",
    products: [
      "Parafuso Auto-roscante 3.5x30mm (caixa 100)",
      "Parafuso Zincado 4x20mm (caixa 50)",
      "Bucha S6 (caixa com 100)",
      'Arruela de Pressão 1/4" (pacote 50)',
      "Fita Isolante 10m",
      "Fita Veda-rosca 50m",
      "Conector Elétrico de Emenda (caixa 50)",
      "Interruptor Simples 10A",
      "Tomada Padrão 10A",
      "Lâmpada LED 9W (Bivolt)",
      "Lâmpada Fluorescente Compacta 15W",
      "Reator para Lâmpada 20W",
      "Fio Elétrico 2.5mm² (rolo 10m)",
      "Fio Elétrico 4mm² (rolo 10m)",
      "Disjuntor Monofásico 20A",
      "Disjuntor Bipolar 40A",
      "Sensor de Presença 360°",
      "Fita Dupla Face (rolo 5m)",
      "Cola Instantânea (tubo 3g)",
      "Cola de Contato (lata 500ml)",
    ],
  },
  {
    category: "Papelaria",
    products: [
      "Papel Sulfite A4 500 folhas (75g/m²)",
      "Papel Sulfite A3 100 folhas",
      "Caneta Esferográfica Azul (caixa 50)",
      "Caneta Esferográfica Preta (caixa 50)",
      "Lápis Preto HB (caixa 30)",
      "Borracha Branca (pacote 10)",
      "Apontador Duplo (pacote 6)",
      "Grampeador de Mesa",
      "Grampos 26/6 (caixa 1000)",
      "Clips de Papel (pacote 100)",
      "Envelope A4 (pacote 50)",
      "Caixa de Arquivo Morto",
      "Pasta Suspensa (pacote 10)",
      "Marcador de Texto (estojo 4 cores)",
      "Fita Adesiva Transparente (rolo 48mm x 50m)",
      "Cola Branca (frascos 250ml)",
      "Pasta Elástica com Abas (pacote 5)",
      "Guarda-chuva de Plástico A3",
      "Tesoura de Mesa 20cm",
      "Estilete com Lâminas de Reposição",
    ],
  },
  {
    category: "EPI",
    products: [
      "Capacete de Segurança (ABS)",
      "Óculos de Proteção Transparente",
      "Óculos de Proteção Escuro",
      "Protetor Auricular (Concha)",
      "Protetor Auricular (Plug) caixa 100",
      "Máscara Respiratória PFF2 (caixa 20)",
      "Máscara Respiratória PFF3 (caixa 10)",
      "Luva de Segurança em Couro (par)",
      "Luva de Proteção Térmica",
      "Luva de Borracha Nitrílica (caixa 50)",
      "Calçado de Segurança (Bota)",
      "Calçado de Segurança (Tênis)",
      "Cinto de Segurança Tipo Paraquedista",
      "Talabarte de Segurança (2m)",
      "Conector de Segurança (Mosquetão)",
      "Tela de Proteção (1m x 10m)",
      "Sinalização de Segurança (cone)",
      "Fita Zebrada para Sinalização (rolo 50m)",
      "Extintor de Incêndio Pó ABC 4kg",
      "Kit de Primeiros Socorros",
    ],
  },
  {
    category: "Construção",
    products: [
      "Cimento CPII 32 50kg",
      "Areia Média (saco 25kg)",
      "Brita 1 (saco 25kg)",
      "Cal Hidratada (saco 20kg)",
      "Tijolo Cerâmico 6 furos (palete 1000)",
      "Telha de Fibrocimento 6mm",
      "Tubo PVC 75mm 6m",
      "Tubo PVC 50mm 6m",
      "Curva 90° PVC 75mm",
      "Luva de PVC 75mm",
      "Tinta Látex Branco 3.6L",
      "Tinta Esmalte Sintético (diversas cores) 3.6L",
      "Verniz Marítimo 3.6L",
      "Rolo de Tinta 23cm (jogo)",
      'Pincel de 2"',
      'Pincel de 4"',
      'Espátula de Aço 4"',
      "Desempenadeira de Aço",
      "Serra Circular para Madeira",
      "Lixa d'água #120 (pacote 10)",
    ],
  },
];

async function main() {
  console.log("🚀 Iniciando seed...");

  // 1. Criar usuário de demonstração
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@almoxarifado.com" },
    update: {
      name: "Usuário Demo Almoxarifado",
      role: "MANAGER",
      emailVerified: new Date(),
      image:
        "https://ui-avatars.com/api/?name=Demo+User&background=6366f1&color=fff&size=128",
    },
    create: {
      id: "133767f0-768d-4338-a612-50c8dc722b84",
      email: "demo@almoxarifado.com",
      name: "Usuário Demo Almoxarifado",
      role: "MANAGER",
      emailVerified: new Date(),
      image:
        "https://ui-avatars.com/api/?name=Demo+User&background=6366f1&color=fff&size=128",
    },
  });

  console.log(`✅ Usuário: ${demoUser.email} (${demoUser.id})`);

  // 2. Limpar produtos existentes (opcional)
  // await prisma.product.deleteMany({
  //   where: { userId: demoUser.id }
  // })

  const userId = demoUser.id;
  let totalProducts = 0;
  let productsWithExpiry = 0;

  // 3. Criar produtos por categoria
  for (const categoryData of productsData) {
    const { category, products } = categoryData;

    const productData = products.map((name, index) => {
      const isPerishable =
        category === "Limpeza" ||
        (category === "EPI" && name.includes("Máscara")) ||
        (category === "Manutenção" && name.includes("Lâmpada"));

      let expiryDate = null;
      if (isPerishable) {
        const today = new Date();
        const monthsToAdd = Math.floor(Math.random() * 19) + 6;
        expiryDate = new Date(today);
        expiryDate.setMonth(expiryDate.getMonth() + monthsToAdd);
        productsWithExpiry++;
      }

      let minPrice = 2,
        maxPrice = 150;
      if (category === "Limpeza") {
        minPrice = 3;
        maxPrice = 80;
      } else if (category === "Manutenção") {
        minPrice = 1;
        maxPrice = 200;
      } else if (category === "Papelaria") {
        minPrice = 0.5;
        maxPrice = 50;
      } else if (category === "EPI") {
        minPrice = 5;
        maxPrice = 300;
      } else if (category === "Construção") {
        minPrice = 2;
        maxPrice = 500;
      }

      const price = randomPrice(minPrice, maxPrice);
      const quantity = Math.floor(Math.random() * 50) + 1;
      const lowStock = Math.floor(Math.random() * 10) + 3;

      const createdAt = randomDate(
        new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
        new Date(),
      );

      const categoryPrefix = category.substring(0, 2).toUpperCase();
      const uniqueName = `${categoryPrefix} - ${name}`;

      return {
        userId: userId,
        name: uniqueName,
        sku: generateSKU(category, index + 1),
        price: price,
        quantity: quantity,
        lowStock: lowStock,
        expiryDate: expiryDate,
        createdAt: createdAt,
        createdBy: demoUser.id,
        updatedBy: demoUser.id,
      };
    });

    await prisma.product.createMany({
      data: productData,
    });

    totalProducts += productData.length;
    console.log(
      `✅ Criados ${productData.length} produtos da categoria "${category}"`,
    );
  }

  console.log("\n🎉 Seed concluído com sucesso!");
  console.log(`📦 Total de produtos: ${totalProducts}`);
  console.log(`📅 Produtos com validade: ${productsWithExpiry}`);
  console.log(`👤 Usuário: ${demoUser.email}`);
}

main()
  .catch((e) => {
    console.error("❌ Erro:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
