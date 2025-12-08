# 🌐 Finance Web — Painel Financeiro (React + Vite)

Versão web do sistema Finance.  
Permite visualizar lançamentos, categorias, resumo financeiro mensal e todas as funcionalidades presentes no app mobile, porém com interface para desktop.

A aplicação consome a **API Finance** e utiliza **React Router** para navegação e **Chart.js** para gráficos.

---

## 🚀 Funcionalidades

- Login e autenticação com token  
- Visualização de lançamentos (ganhos e despesas)  
- Inserir, editar e excluir lançamentos  
- Categorização completa  
- Resumo financeiro mensal  
- Gráficos de ganhos x despesas  
- Gerenciamento de perfil do usuário  
- Alteração de senha  
- Integração total com a API Finance  

---

## 📚 Tecnologias Utilizadas

- **React 19**
- **Vite**
- **React Router DOM**
- **Axios**
- **Chart.js + react-chartjs-2**
- **CSS / Styles do projeto**
- **ESLint**
- **JavaScript (ESM)**

---

## 📁 Estrutura do Projeto
```
src/  
├── assets/
├── components/
├── pages/
├── routes/
├── style/
└── main.jsx
```
---

## 🔧 Instalação e Execução

### 1️⃣ Instalar dependências
```
npm install
```
2️⃣ Rodar o projeto
npm run dev

Acessar em:
http://localhost:5173

📊 Exemplo de Gráfico (Chart.js)
```
import { Doughnut } from "react-chartjs-2";

export function GraficoResumo({ totalGanhos, totalDespesas }) {
  const data = {
    labels: ["Ganhos", "Despesas"],
    datasets: [
      {
        data: [totalGanhos, totalDespesas]
      }
    ]
  };

  return <Doughnut data={data} />;
}
```
🧭 Rotas Principais
```
/login
/registro
/dashboard
/lancamentos
/categorias
/perfil
```
🖥️ Build para Produção
```
npm run build
npm run preview
```

📝 Observações
Este projeto replica todas as funções do aplicativo mobile

Totalmente integrado com a API Finance

Pode ser hospedado em Vercel, Netlify, Hostinger, etc.

👤 Desenvolvido por
Eduardo Abreu



---
