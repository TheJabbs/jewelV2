
export interface JewelryItem {
  id: string;
  name: string;
  description: string;
  price: string;
  material: string;
  image: string;
  modelUrl?: string;
}

export const jewelryCollection: JewelryItem[] = [
  {
    id: "diamond-solitaire",
    name: "Diamond Solitaire Pendant",
    description: "A timeless classic featuring a brilliant-cut diamond set in 18k white gold.",
    price: "$1,250",
    material: "18k White Gold, Diamond",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2187&auto=format&fit=crop",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GemstoneEarring/glTF-Binary/GemstoneEarring.glb"
  },
  {
    id: "pearl-strand",
    name: "Pearl Strand Necklace",
    description: "Luxurious cultured pearls arranged in a classic strand with a gold clasp.",
    price: "$890",
    material: "Cultured Pearls, 14k Gold",
    image: "https://www.pearlparadise.com/cdn/shop/files/7.5-8_WHITE_FW_TRIPLENK_ON-MODEL-2_1800x1800.jpg?v=1740841528", 
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GemstoneEarring/glTF-Binary/GemstoneEarring.glb"
  },
  {
    id: "gold-chain",
    name: "Italian Gold Chain",
    description: "A sophisticated Italian-crafted gold chain with a contemporary design.",
    price: "$720",
    material: "18k Gold",
    image: "https://vrijranijewels.in/cdn/shop/products/RC-18-7P5-MRC-01.jpg?v=1698341680",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GemstoneEarring/glTF-Binary/GemstoneEarring.glb"
  },
  {
    id: "sapphire-pendant",
    name: "Sapphire Halo Pendant",
    description: "A stunning blue sapphire surrounded by a halo of diamonds.",
    price: "$1,850",
    material: "18k White Gold, Sapphire, Diamonds",
    image: "https://static.diamondsfactory.com/image/product_v2/clpd04139/cspeot2303g/showcase/3d/ww/bs1/0001.jpg",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GemstoneEarring/glTF-Binary/GemstoneEarring.glb"
  },
  {
    id: "emerald-choker",
    name: "Emerald Choker",
    description: "An elegant choker featuring emerald stones set in rose gold.",
    price: "$2,150",
    material: "14k Rose Gold, Emeralds",
    image: "https://ajnaajewels.gumlet.io/image/data/AjnaJewels/10sept2024/ln261_1.jpg?width=488&height=650&mode=fill&fill=solid&fill-color=FFFFFF",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GemstoneEarring/glTF-Binary/GemstoneEarring.glb"
  },
  {
    id: "rose-gold-lariat",
    name: "Rose Gold Lariat",
    description: "A delicate rose gold lariat that drapes beautifully around the neck.",
    price: "$680",
    material: "14k Rose Gold",
    image: "https://www.tanishq.ae/dw/image/v2/BJGM_PRD/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dwfba6b370/images/hi-res/ULD2PTCQCAA00_1.jpg?sw=640&sh=640",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GemstoneEarring/glTF-Binary/GemstoneEarring.glb"
  },
  {
    id: "vintage-diamond-pendant",
    name: "Vintage Diamond Pendant",
    description: "Antique-inspired pendant with intricate diamond details.",
    price: "$1,450",
    material: "Platinum, Diamonds",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1974&auto=format&fit=crop",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GemstoneEarring/glTF-Binary/GemstoneEarring.glb"
  },
  {
    id: "layered-gold-necklace",
    name: "Layered Gold Necklace",
    description: "Multiple delicate gold chains creating a layered effect.",
    price: "$550",
    material: "14k Gold",
    image: "https://www.missoma.com/cdn/shop/articles/how-to-layer-necklaces-854703.jpg?v=1682203870&width=1000",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GemstoneEarring/glTF-Binary/GemstoneEarring.glb"
  }
];
