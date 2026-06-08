# Gabriel Bin Imóveis — Portal Web

Portal imobiliário do corretor autônomo Gabriel Bin.  
**CRECI-SP 302244-F** · Santos e Região

---

## 🏠 O que é este projeto

Sistema completo para corretor autônomo com:
- **Portal público** — listagem e busca de imóveis com filtros
- **Landing page por imóvel** — página focada em conversão para cada imóvel
- **CRM** *(próxima etapa)* — captação e gestão de leads
- **Módulo de cadastro** *(próxima etapa)* — cadastro de imóveis pelo corretor
- **ERP** *(próxima etapa)* — agenda, tarefas e rotina

---

## 🚀 Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/gabriel-bin-imoveis.git
cd gabriel-bin-imoveis

# 2. Instale as dependências
npm install

# 3. Rode em desenvolvimento
npm run dev

# Acesse: http://localhost:3000
```

---

## 🌐 Deploy (Vercel)

O site é publicado automaticamente no Vercel a cada `git push` na branch `main`.

**URL de produção:** https://gabriel-bin-imoveis.vercel.app

---

## 🛠 Stack tecnológica

| Tecnologia | Uso | Custo |
|---|---|---|
| Next.js 14 | Framework React | Gratuito |
| Vercel | Hospedagem | Gratuito |
| GitHub | Versionamento de código | Gratuito |
| Montserrat (Google Fonts) | Tipografia | Gratuito |
| Supabase *(em breve)* | Banco de dados | Gratuito |

---

## 📁 Estrutura do projeto

```
gabriel-bin-imoveis/
├── src/
│   └── app/
│       ├── page.js        ← Portal principal (Home + Listagem + Landing)
│       ├── layout.js      ← Layout global + SEO
│       └── globals.css    ← Variáveis de design e estilos base
├── public/                ← Imagens e arquivos estáticos
├── next.config.js
├── package.json
└── README.md
```

---

## 🎨 Identidade visual

- **Cor principal:** `#021356` (azul)
- **Cor de destaque:** `#FADB24` (amarelo)
- **Cor secundária:** `#FFFFFF` (branco)
- **Tipografia:** Montserrat (Google Fonts)

---

## 📋 Histórico de versões

| Versão | Data | Descrição |
|---|---|---|
| v1.0.0 | Jun/2026 | Portal público — Home, Listagem e Landing Page |

---

## 📞 Contato

**Gabriel Bin** · CRECI-SP 302244-F  
Santos e Região · (13) 99999-0000
