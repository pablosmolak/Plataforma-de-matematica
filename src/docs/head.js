const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "API da Plataforma de Matemática",
        description: "API para controlar usuários, grupos, unidades e rotas",
        version: "0.0.1",
        termsOfService: "http://localhost:3030",
        contact: {
          name: "USER Manangers",
          email: "fslab@fslab.dev",
          url: "fslab.dev"
        },
        license: {
          name: "Lincença: GPLv3",
          url: "https://www.gnu.org/licenses/gpl-3.0.html"
        }
      },
      externalDocs: {
        description: "Documentação detalhada",
        url: "https://docs.api.fslab.dev"
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}`, 
          description: "API em desenvolvimento",
        }
      ],
      tags: [
        {
          name: "Login",
          description: "Login do Usuário"
        },
        {
          name: "Usuários",
          description: "Usuários do Sistema"
        },
        {
          name: "Rotas",
          description: "Rotas do Sistema"
        },
        {
          name: "Unidades",
          description: "Operações para rota Unidades"
        }  
      ],
      paths: {},
    },
    apis: ["./src/routes/*.js"]
  };

  export default swaggerOptions;
