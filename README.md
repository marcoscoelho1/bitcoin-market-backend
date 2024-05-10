# Mercado de Bitcoins 💰

E aí? Que tal conhecer esta API de compra e vendas de Bitcoin?
Este projeto foi construído com Node.js, Typescript, Express e Docker, aplicando os princípios de Clean Code.
Para começar a usar esta API, siga os passos abaixo.

## Como Começar?

1. **Clone este repositório** na sua máquina.
2. **Vá até o diretório do projeto**.
3. **Execute o comando mágico** abaixo no seu terminal:

```bash
docker compose up --build
```

## Rotas Incríveis 🚀

Chegou a hora de explorar o que esta API tem a oferecer! Confira as rotas abaixo e comece a aproveitar:

| Categoria | O que faz?                      | Método | Rota                                   |
| --------- | ------------------------------- | ------ | -------------------------------------- |
| Mercado   | Consulta de transferências      | GET    | localhost:3333/market/transfers        |
| Mercado   | Venda de bitcoins               | POST   | localhost:3333/market/bitcoin/sell     |
| Mercado   | Compra de bitcoins              | POST   | localhost:3333/market/bitcoin/purchase |
| Mercado   | Consulta de cotação de bitcoins | GET    | localhost:3333/market/bitcoin/quote    |
| Conta     | Consulta de saldo da conta      | GET    | localhost:3333/account/balance         |
| Conta     | Depósito na conta               | POST   | localhost:3333/account/deposit         |
| Usuários  | Consulta de usuários            | GET    | localhost:3333/users                   |
| Usuários  | Início de sessão (login)        | POST   | localhost:3333/sessions                |

## Importe as Rotas no Insomnia

Caso prefira, é possível importar essas rotas direto para o Insomnia. Acessa a pasta `collections` no repositório e importe o arquivo correspondente. Facilitei tudo para você!

---

Este é um projeto feito com carinho, então, seu feedback é super importante! 😊🌟
