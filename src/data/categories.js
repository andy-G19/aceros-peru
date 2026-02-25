export const categories = [
  { 
    id: 1, 
    name: "Herramientas Acero", 
    icon: "construction", 
    count: 2,
    description: "Lampas y rejillas de acero forjado",
    subcategories: [
      { id: 101, name: "Lampas", count: 1 },
      { id: 102, name: "Rejillas", count: 1 }
    ]
  },
  { 
    id: 2, 
    name: "Herramientas Ganzo", 
    icon: "handyman", 
    count: 4,
    description: "Lampas de alta calidad para jardinería y agricultura",
    subcategories: [
      { id: 201, name: "Lampas", count: 0 },
      { id: 202, name: "Lampas Tipo Cuchara", count: 1 },
      { id: 203, name: "Lampas Tipo Pala", count: 1 },
      { id: 204, name: "Rejillas Ganzo", count: 1 }
    ]
  },
  { 
    id: 3, 
    name: "Rastrillos", 
    icon: "yard", 
    count: 1,
    description: "Rastrillos para jardín y agricultura",
    subcategories: []
  },
  { 
    id: 4, 
    name: "Herramientas de Construccion", 
    icon: "home_repair_service", 
    count: 2,
    description: "Herramientas para albañilería y construcción",
    subcategories: []
  },
  { 
    id: 5, 
    name: "Trípodes para Aspersor", 
    icon: "water_drop", 
    count: 1,
    description: "Trípodes y sistemas de riego",
    subcategories: []
  },
  { 
    id: 6, 
    name: "Otros", 
    icon: "more_horiz", 
    count: 1,
    description: "Otros productos y accesorios",
    subcategories: []
  }
];