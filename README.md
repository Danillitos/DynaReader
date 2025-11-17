# DynaReader (Nome Provisório)

> **Disclaimer:**  
> **DynaReader** é um **nome provisório** e **não possui marca registrada** no momento. Este projeto é de uso **educacional/demonstrativo** para fins de **portfólio**.

---

## Resumo

**DynaReader** é um aplicativo **mobile-first** para leitura de PDFs, que visa **estimular o hábito de leitura** de forma divertida e disciplinada.  
A proposta combina **gamificação**, **metas diárias** e **estatísticas de progresso**, ajudando o usuário a manter constância e disciplina na leitura.

---

## Objetivo

- Incentivar a leitura diária.
- Oferecer métricas como:
  - Tempo de leitura.
  - Páginas lidas.
  - Streaks de leitura contínua.
  - Estatísticas semanais/mensais.
- Notificações motivacionais para não quebrar o ritmo.

---

## Público-Alvo

Crianças, adolescentes e adultos que:
- Querem começar ou fortalecer o hábito de leitura.
- Buscam uma experiência **dinâmica e motivadora**.
- Precisam de incentivo para manter **constância**.

---

## Funcionalidades Principais

- Cadastro/Login seguro (autenticação JWT + senha hash)
- Perfil de usuário
- Leitor de PDF otimizado
- Lista pessoal de PDFs
- Notificações de lembrete
- Estatísticas de leitura
- Metas diárias ajustáveis
- Sistema de conquistas/badges
- Análises semanais e mensais
- Modo escuro
- Destaque de trechos e anotações
- Integração futura com nuvem (Google Drive/Dropbox)

---

## Proposta de Valor

Inspirado em referências como **Kindle** e **Duolingo**, o DynaReader combina **leitura estruturada** com **motivação diária**, transformando o hábito de ler em uma experiência divertida e recompensadora.

---

## Tecnologias Utilizadas

| Camada      | Tecnologia |
|-------------|-------------|
| **Front-end** | React Native |
| **Back-end**  | Node.js (Nest.js) |
| **Banco de Dados** | PostgreSQL |
| **Documentação da API** | Swagger |

---

## Estrutura do Projeto

```plaintext
/dyna-reader_client         # Aplicativo React Native (Agora movido para outro repositório)
/dyna-reader_server         # API Nest.js
/docs                       # Diagramas ERD, UML e artefatos
.env.example                # Exemplo de variáveis de ambiente
README.md                   # Documentação principal
```

---

## 🗃️ Diagrama ERD

> ![Database ERD _ Mermaid Chart-2025-07-05-143431](https://github.com/user-attachments/assets/6489415c-d5f8-4286-a3ea-01e751a4be0b)


---

## Diagrama UML

> ![Software UML _ Mermaid Chart-2025-07-06-123658](https://github.com/user-attachments/assets/8fc2ff3b-e12d-417e-9f03-50dc773cac5e)


---

## Documentação da API

> [Swagger - Acesse aqui](http://localhost:3000/api)

Obs: O back precisa está rodando

---

## Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/Danillitos/dynareader

# Instale dependências do backend
cd dyna-reader_server
npm install

# Rode o backend
npm run start:dev


```
Obs: Configure seu .env seguindo o .env.example antes de rodar o backend

---

## Licença
Este projeto é demonstrativo, de uso acadêmico e para fins de portfólio.
DynaReader é um nome provisório e não representa uma marca registrada.
Uso não comercial autorizado para demonstração de habilidades técnicas.

---

## Autor
Danillo M. Garcez
Dev Fullstack | Mobile | Node.js | React Native

[LinkedIn](www.linkedin.com/in/danillo-matos-garcez-6b4a082aa) • [E-mail](danillo.garcez@live.com)
