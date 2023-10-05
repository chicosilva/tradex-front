export var menuItems = {
  data: [
    {
      headTitle1: "Gestão de Produtos",
      headTitle2: "Dashboards,Widgets & Layout.",
      type: "headtitle",
    },
    {
      title: "Produtos",
      icon: "stroke-file",
      iconf: "fill-widget",
      type: "sub",
      active: false,
      children: [
        {
          path: "/documents/list/",
          title: "Documentos",
          type: "link",
          active: false,
          name: 'documents:list',
        }
      ],
    },


  ],
};
