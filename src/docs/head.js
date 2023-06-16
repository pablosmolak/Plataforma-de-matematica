const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "API da Plataforma de Matemática",
        description: "API do projeto da Plataforma de Matemática, feito em 2023 na Disciplina de Fabrica de Software",
        version: "0.0.1",
        termsOfService: "http://localhost:3030",
        contact: {
          name: "DEVS",
          email: "fslab@fslab.dev",
        },
        license: {
          name: "Licença: GPLv3",
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
          name: "Cursos",
          description: "Cursos Disponibilizados"
        },
        {
          name: "Matrículas",
          description: "Matriculas dos Usuários nos cursos"
        },
        {
          name: "Grupos",
          description: "Grupos de Usuários do Sistema"
        },
        {
          name: "Rotas",
          description: "Rotas do Sistema"
        }      

      ],
      paths: {},
      components: {
        securitySchemes:{
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    },
    apis: ["./src/routes/*.js"]
  };

  export default swaggerOptions;
