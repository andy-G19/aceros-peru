export const categories = [
  { 
    id: 1, 
    name: "Herramientas Acero", 
    icon: "construction", 
    count: 12,
    description: "Lampas y rejillas de acero forjado",
    subcategories: [
      { id: 101, name: "Lampas", count: 6 },
      { id: 102, name: "Rejillas", count: 6 }
    ]
  },
  { 
    id: 2, 
    name: "Herramientas Ganzo", 
    icon: "handyman", 
    count: 23,
    description: "Lampas de alta calidad para jardinería y agricultura",
    subcategories: [
      { id: 201, name: "Lampas Ganzo", count: 7 },
      { id: 202, name: "Lampas Tipo Cuchara", count: 5 },
      { id: 203, name: "Lampas Tipo Pala", count: 4 },
      { id: 204, name: "Rejillas Ganzo", count: 7 }
    ]
  },
  { 
    id: 3, 
    name: "Rastrillos", 
    icon: "yard", 
    count: 5,
    description: "Rastrillos para jardín y agricultura",
    subcategories: []
  },
  { 
    id: 4, 
    name: "Herramientas de Construccion", 
    icon: "home_repair_service", 
    count: 6,
    description: "Herramientas para albañilería y construcción",
    subcategories: []
  },
  { 
    id: 5, 
    name: "Trípodes para Aspersor", 
    icon: "water_drop", 
    count: 7,
    description: "Trípodes y sistemas de riego",
    subcategories: []
  },
  {
    id: 7,
    name: "Herramientas de Jardinería",
    icon: "park",
    count: 14,
    description: "Todo para el cuidado de jardines, huertos y plantas",
    subcategories: []
  },
  { 
    id: 6, 
    name: "Otros", 
    icon: "more_horiz", 
    count: 0,
    description: "Otros productos y accesorios",
    subcategories: []
  }
];
