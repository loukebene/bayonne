import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database for LE JARDIN DE BAYONNE...");

  // Clean DB
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.cateringQuote.deleteMany();
  await prisma.dish.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();

  // Create Admin User
  await prisma.adminUser.create({
    data: {
      email: "admin@lejardindebayonne.cg",
      passwordHash: "Jardin2026!", // Demo simplified comparison or hash
      name: "Gérant Le Jardin",
      role: "ADMIN",
    },
  });

  // Create Categories
  const catAmuse = await prisma.category.create({
    data: { name: "AMUSE-BOUCHE", slug: "amuse-bouche", orderIndex: 1 },
  });
  const catEntrees = await prisma.category.create({
    data: { name: "ENTRÉES", slug: "entrees", orderIndex: 2 },
  });
  const catGrillades = await prisma.category.create({
    data: { name: "GRILLADES", slug: "grillades", orderIndex: 3 },
  });
  const catComplements = await prisma.category.create({
    data: { name: "COMPLÉMENTS", slug: "complements", orderIndex: 4 },
  });
  const catMabokes = await prisma.category.create({
    data: { name: "MABOKES", slug: "mabokes", orderIndex: 5 },
  });
  const catPlats = await prisma.category.create({
    data: { name: "PLATS CUISINIERS", slug: "plats-cuisiniers", orderIndex: 6 },
  });

  // Dishes definition
  const dishes = [
    // 1. AMUSE-BOUCHE
    {
      name: "Assiette tapas",
      slug: "assiette-tapas",
      description: "Assortiment gourmand de petites bouchées croustillantes, beignets de poisson et bananes plantains frites.",
      price: 5000,
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&auto=format&fit=crop&q=80",
      categoryId: catAmuse.id,
    },
    {
      name: "Meli Melo",
      slug: "meli-melo",
      description: "Mélange savoureux de petites brochettes épicées, crevettes grillées et légumes croquants mariné façon Bayonne.",
      price: 4500,
      imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80",
      categoryId: catAmuse.id,
    },

    // 2. ENTRÉES
    {
      name: "Salade Albert",
      slug: "salade-albert",
      description: "Salade fraîche maison composée de crudités du marché, dés de poulet rôti, œuf dur et vinaigrette spéciale du Chef.",
      price: 4000,
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
      categoryId: catEntrees.id,
    },
    {
      name: "Salade composée",
      slug: "salade-composee",
      description: "Méli-mélo de tomates fraîches, concombres, maïs doux, carottes râpées et olives noires au citron.",
      price: 3500,
      imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
      categoryId: catEntrees.id,
    },
    {
      name: "Salade avocat",
      slug: "salade-avocat",
      description: "Avocats tropicaux de Songolo crémeux, tranches de tomate et ciboulette fraîche assaisonnés à l'huile d'olive.",
      price: 3000,
      imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=600&auto=format&fit=crop&q=80",
      categoryId: catEntrees.id,
    },
    {
      name: "Salade avocat-crevette",
      slug: "salade-avocat-crevette",
      description: "Crevettes sautées de la côte de Pointe-Noire servies sur lit d'avocats mûrs et sauce cocktail maison.",
      price: 5000,
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&auto=format&fit=crop&q=80",
      categoryId: catEntrees.id,
    },

    // 3. GRILLADES
    {
      name: "Poisson braisé",
      slug: "poisson-braise",
      description: "Capitaine ou Bar frais braisé au charbon de bois, mariné aux épices locales et piment vert doux.",
      price: 7000,
      isVariablePrice: true,
      priceNote: "Prix selon arrivage / taille (7 000 - 12 000 FCFA)",
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80",
      categoryId: catGrillades.id,
    },
    {
      name: "Brochette de poisson",
      slug: "brochette-de-poisson",
      description: "Dés de poisson blanc tendre alternés de poivrons et d'oignons rouges grillés au feu de bois.",
      price: 5500,
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
      categoryId: catGrillades.id,
    },
    {
      name: "Brochette de filet de bœuf",
      slug: "brochette-de-filet-de-boeuf",
      description: "Morceaux choisis de filet de bœuf tendre assaisonnés aux herbes et braisés à la perfection.",
      price: 6000,
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&auto=format&fit=crop&q=80",
      categoryId: catGrillades.id,
    },
    {
      name: "Brochette mixte",
      slug: "brochette-mixte",
      description: "Combinaison savoureuse de bœuf, poulet et crevettes grillés sur pique avec marinade barbecue piquante.",
      price: 6500,
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
      categoryId: catGrillades.id,
    },
    {
      name: "Brochette de viande",
      slug: "brochette-de-viande",
      description: "Brochettes de viande de bœuf traditionnelles assaisonnées aux épices africaines.",
      price: 5000,
      imageUrl: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&auto=format&fit=crop&q=80",
      categoryId: catGrillades.id,
    },
    {
      name: "Poulet de chair braisé aux petits légumes",
      slug: "poulet-de-chair-braise-aux-petits-legumes",
      description: "Poulet entier braisé doré et jus de marinade aromatique aux petits légumes sautés.",
      price: 8000,
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&auto=format&fit=crop&q=80",
      categoryId: catGrillades.id,
    },
    {
      name: "Cuisse de poulet braisé",
      slug: "cuisse-de-poulet-braise",
      description: "Belle cuisse de poulet mariné braisée à cœur avec peau croustillante.",
      price: 4500,
      imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&auto=format&fit=crop&q=80",
      categoryId: catGrillades.id,
    },

    // 4. COMPLÉMENTS
    {
      name: "Banane, fruit du vapeur",
      slug: "banane-fruit-du-vapeur",
      description: "Bananes plantains mûres ou vertes cuites à la vapeur douce.",
      price: 1500,
      imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=600&auto=format&fit=crop&q=80",
      categoryId: catComplements.id,
    },
    {
      name: "Pomme de terre frite ou vapeur",
      slug: "pomme-de-terre-frite-ou-vapeur",
      description: "Frites dorées croustillantes ou pommes de terre fondantes cuites à la vapeur.",
      price: 1500,
      imageUrl: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80",
      categoryId: catComplements.id,
    },
    {
      name: "Riz parfumés",
      slug: "riz-parfume",
      description: "Riz blanc cuit à la perfection, idéal en accompagnement de sauces et brochettes.",
      price: 1000,
      imageUrl: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&auto=format&fit=crop&q=80",
      categoryId: catComplements.id,
    },
    {
      name: "Manioc",
      slug: "manioc",
      description: "Bâton de manioc traditionnel cuit à la vapeur, ferme et savoureux.",
      price: 1000,
      imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&auto=format&fit=crop&q=80",
      categoryId: catComplements.id,
    },
    {
      name: "Foufou",
      slug: "foufou",
      description: "Foufou traditionnel bien tiédi et onctueux.",
      price: 1000,
      imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
      categoryId: catComplements.id,
    },
    {
      name: "Jardinière de légumes",
      slug: "jardiniere-de-legumes",
      description: "Poêlée de légumes frais de saison au beurre d'ail (carottes, haricots verts, courgettes).",
      price: 2000,
      imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
      categoryId: catComplements.id,
    },

    // 5. MABOKES
    {
      name: "Maboké de capitaine",
      slug: "maboke-de-capitaine",
      description: "Poisson Capitaine frais étouffé dans des feuilles de bananier avec tomates, ciboulette et piment doux.",
      price: 8500,
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80",
      categoryId: catMabokes.id,
    },
    {
      name: "Maboké de sanglier",
      slug: "maboke-de-sanglier",
      description: "Viande de sanglier sauvage mi-fumée cuite en papillote de feuille de bananier aux épices de la forêt.",
      price: 9000,
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
      categoryId: catMabokes.id,
    },
    {
      name: "Maboké de maigrénon",
      slug: "maboke-de-maigrenon",
      description: "Poisson Maigrénon délicat préparé à l'étouffée selon la recette ancestrale du Jardin de Bayonne.",
      price: 8000,
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80",
      categoryId: catMabokes.id,
    },
    {
      name: "Maboké de mbesset",
      slug: "maboke-de-mbesset",
      description: "Poisson Mbesset préparé à l'étouffée de feuilles traditionnelles avec brins de piment vert aromatique.",
      price: 8500,
      imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80",
      categoryId: catMabokes.id,
    },
    {
      name: "Maboké de mbumi",
      slug: "maboke-de-mbumi",
      description: "Poisson d'eau douce Mbumi cuit à la vapeur des feuilles de bananier.",
      price: 8000,
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80",
      categoryId: catMabokes.id,
    },
    {
      name: "Maboké de maroka",
      slug: "maboke-de-maroka",
      description: "Poisson Maroka mariné aux condiments locaux étouffé sous braises douces.",
      price: 8000,
      imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80",
      categoryId: catMabokes.id,
    },
    {
      name: "Maboké mbito",
      slug: "maboke-mbito",
      description: "Poisson Mbito sélectionné cuit au jus naturel dans son emballage de feuille.",
      price: 8500,
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80",
      categoryId: catMabokes.id,
    },
    {
      name: "Maboké mabongo",
      slug: "maboke-mabongo",
      description: "Maboké préparé dans une riche sauce noire Mbongo aux épices traditionnelles torréfiées.",
      price: 9000,
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
      categoryId: catMabokes.id,
    },

    // 6. PLATS CUISINIERS
    {
      name: "Saka-Saka",
      slug: "saka-saka",
      description: "Feuilles de manioc pilées mijotées à l'huile de palme rouge, poisson fumé et ail aromatique.",
      price: 4000,
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Sibissi",
      slug: "sibissi",
      description: "Gibier Sibissi (Aulacode / Ratifa) mi-fumé sauté aux oignons verts et piment africain.",
      price: 7500,
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Poisson salé aux petits légumes",
      slug: "poisson-sale-aux-petits-legumes",
      description: "Makayabu (poisson salé) dessalé et mijoté aux tomates fraîches, oignons et petits légumes.",
      price: 6500,
      imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Poisson salé aux aubergines",
      slug: "poisson-sale-aux-aubergines",
      description: "Poisson salé cuisiné avec des aubergines locales fondantes et huile de palme dorée.",
      price: 7000,
      imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Sanglier sauté",
      slug: "sanglier-saute",
      description: "Morceaux de sanglier de chasse sautés au vin rouge, ail, oignons et piment doux.",
      price: 9000,
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Bouillons sauvage",
      slug: "bouillons-sauvage",
      description: "Bouillon relevé et parfumé aux viandes de gibier sauvage de la région.",
      price: 8500,
      imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Bouillons de capitaine",
      slug: "bouillons-de-capitaine",
      description: "Soupe de poisson Capitaine mijotée avec citron vert, gingembre frais et piment.",
      price: 8000,
      imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Bouillons de mouton",
      slug: "bouillons-de-mouton",
      description: "Bouillon succulent de viande de mouton tendre relevé aux condiments traditionnels.",
      price: 7500,
      imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Porc épic",
      slug: "porc-epic",
      description: "Spécialité rare de Porc-Épic cuisiné en sauce mijotée aromatique.",
      price: 9500,
      imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Viande de bœuf sautée",
      slug: "viande-de-boeuf-sautee",
      description: "Lamelles de bœuf tendres sautées au wok avec poivrons multicolores et oignons.",
      price: 6500,
      imageUrl: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Filet de bœuf à la crème fraîche",
      slug: "filet-de-boeuf-a-la-creme-fraiche",
      description: "Pavé de filet de bœuf nappé d'une sauce onctueuse à la crème fraîche et champignons.",
      price: 7500,
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "3 pièces de poisson",
      slug: "3-pieces-de-poisson",
      description: "Trois darne de poissons frits croustillants servis avec sauce tomate aromatisée.",
      price: 7000,
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Gambas sauté",
      slug: "gambas-saute",
      description: "Gambas royales sautées au beurre d'ail, persil et zeste de citron vert.",
      price: 12000,
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Ragoût de mouton",
      slug: "ragout-de-mouton",
      description: "Ragoût mijoté doucement au jus de cuisson, carottes et pommes de terre.",
      price: 7500,
      imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Saucisse grillée / sautée",
      slug: "saucisse",
      description: "Saucisses savoureuses poêlées servies chaudes avec oignons caramélisés.",
      price: 4500,
      imageUrl: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Darne de poisson",
      slug: "darne-de-poisson",
      description: "Belle tranche de poisson braisée ou poêlée avec coulis de légumes.",
      price: 6500,
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Bouka",
      slug: "bouka",
      description: "Recette traditionnelle Bouka riche en saveurs et viandes sélectionnées.",
      price: 8000,
      imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
    {
      name: "Porcelet",
      slug: "porcelet",
      description: "Morceaux de porcelet rôti croustillant et fondant en bouche.",
      price: 9000,
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
      categoryId: catPlats.id,
    },
  ];

  for (const d of dishes) {
    await prisma.dish.create({ data: d });
  }

  // Create Sample Orders
  const order1 = await prisma.order.create({
    data: {
      orderNumber: "JB-9201",
      customerName: "Jean-Paul Mavoungou",
      customerPhone: "+242 06 612 34 56",
      deliveryType: "LIVRAISON",
      address: "Pointe-Noire, Quartier Songolo près de la pharmacie",
      subtotal: 16500,
      deliveryFee: 1500,
      total: 18000,
      status: "NOUVELLE",
      notes: "Piment bien à part SVP",
      items: {
        create: [
          { dishName: "Maboké de capitaine", unitPrice: 8500, quantity: 1, totalPrice: 8500 },
          { dishName: "Poulet de chair braisé aux petits légumes", unitPrice: 8000, quantity: 1, totalPrice: 8000 },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      orderNumber: "JB-9202",
      customerName: "Marie-Louise Kouka",
      customerPhone: "+242 05 520 11 22",
      deliveryType: "EMPORTER",
      subtotal: 13000,
      deliveryFee: 0,
      total: 13000,
      status: "EN_PREPARATION",
      items: {
        create: [
          { dishName: "Poisson braisé", unitPrice: 7000, quantity: 1, totalPrice: 7000 },
          { dishName: "Brochette de filet de bœuf", unitPrice: 6000, quantity: 1, totalPrice: 6000 },
        ],
      },
    },
  });

  // Create Sample Reservations
  await prisma.reservation.create({
    data: {
      resNumber: "RES-401",
      customerName: "Alain Ngoulou",
      customerPhone: "+242 05 511 88 99",
      date: "2026-10-02",
      timeSlot: "19:30",
      guestCount: 4,
      comment: "Table près de la terrasse si possible",
      status: "CONFIRMEE",
    },
  });

  // Create Sample Catering Quotes
  await prisma.cateringQuote.create({
    data: {
      quoteNumber: "DEV-108",
      customerName: "Entreprise TotalEnergies EP Congo",
      customerPhone: "+242 06 900 12 34",
      eventType: "Repas d'entreprise",
      eventDate: "2026-10-15",
      guestCount: 50,
      estimatedBudget: 750000,
      message: "Buffet chaud avec mabokés et grillades variées pour soirée de fin d'année.",
      status: "NOUVEAU",
    },
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
