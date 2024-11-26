export const NAV_ITEMS = [
  {
    label: "Ayuda",
    to: "/Help",
  },
  {
    label: "Buscar",
    hasInput: true,
  },
  {
    label: "Productos",

    children: [
      {
        label: "Teclados",
        to: "/teclados",
      },
      {
        label: "Mouses",
        to: "/mouses",
      },
      {
        label: "Monitores",
        to: "/monitores",
      },
      {
        label: "Notebooks",
        to: "/notebooks",
      },
    ],
  },
  {
    label: "PC armada",
    to: "/pc-armada",
  },
  {
    label: "Mi Cuenta",
    children: [
      {
        label: "Informacion personal",
        subLabel: "todo sobre su informacion personal",
        to: "/InformacionPersonal",
      },
      {
        label: "Facturas",
        subLabel: "todo sobre sus facturas",
        to: "/facturas",
      },
      {
        label: "Compras",
        subLabel: "todo sobre sus compras",
        to: "/compras",
      },
      {
        label: "Cerrar sesión",
        subLabel: "",
        onClick: (e) => e.preventDefault(),
      },
    ],
  },
];
