# Project Brief: Geometry Wars Educacional

**Document Version:** 1.0
**Created:** 2025-09-25
**Business Analyst:** Mary

---

## Executive Summary

**Project Name:** Geometry Wars Educacional
**Project Type:** Jogo educacional web-based (PWA)
**Target Timeline:** 8-12 semanas para MVP
**Core Innovation:** Tower Defense matemático onde geometria vira estratégia épica

### Vision Statement
Transformar geometria em uma batalha épica onde alunos defendem territórios usando cálculos estratégicos, criando vício positivo no aprendizado matemático alinhado à BNCC.

### Success Metrics
- **Engajamento:** 20+ minutos por sessão (vs. 3-5min atividades tradicionais)
- **Retenção:** 70% dos alunos retornam na semana seguinte
- **Aprendizado:** Melhoria de 25% em avaliações de geometria
- **Adoção:** 50+ professores usando ativamente em 6 meses

---

## Problem Statement

### Current Pain Points
**Para Alunos:**
- Geometria vista como "matemática abstrata sem aplicação"
- Decoram fórmulas sem compreender significado
- Baixo engajamento com atividades tradicionais (3-5min atenção)
- Falta de feedback imediato sobre progresso

**Para Professores:**
- Criar atividades engajantes consome muito tempo
- Dificuldade de alinhar diversão com rigor pedagógico BNCC
- Falta de relatórios sobre progresso real dos alunos
- Limitações técnicas em escolas (internet instável, hardware antigo)

**Para Coordenadores:**
- Necessidade de evidências de alinhamento curricular
- Pressão por resultados mensuráveis em avaliações
- Resistência a tecnologias complexas de implementar

---

## Solution Overview

### Core Product: Geometry Wars Educacional
**Conceito:** Tower Defense onde formas geométricas "malévolas" invadem o mundo matemático e alunos defendem usando cálculos estratégicos.

### Key Features
1. **Sistema de Ondas Progressivas**
   - Invasões automáticas baseadas em configuração do professor
   - Dificuldade escalável por conceitos dominados
   - Boss battles com polígonos complexos

2. **Defesa Estratégica por Cálculos**
   - Arrastar formas para posições defensivas
   - Bônus de adjacência (triângulo + quadrado = multiplicador)
   - Condições lógicas ("defender só com área > 30")

3. **Professor Programming System**
   - Interface simples para configurar "regras de invasão"
   - Automação de conteúdo baseado em currículo
   - Relatórios automáticos de progresso BNCC

4. **Sandbox Pós-Vitória**
   - Alunos criam próprias invasões para outros
   - Experimentação livre com conceitos aprendidos
   - Sistema de compartilhamento entre turmas

### Technical Architecture
**Stack:** React + TypeScript + NextJS
**Graphics:** Canvas API para manipulação de formas
**Audio:** Web Audio API para narração épica
**Storage:** IndexedDB para funcionamento offline
**Deployment:** PWA para instalação sem app store

---

## Target Audience

### Primary Users
**Alunos (7-11 anos):**
- 3º ao 5º ano do Ensino Fundamental
- Características: nativos digitais, baixa tolerância a atividades monótonas
- Motivação: diversão, competição, descoberta
- Pain points: geometria abstrata, falta de contexto aplicado

**Professores (25-55 anos):**
- Ensino Fundamental I (matemática)
- Características: sobrecarregados, precisam de ferramentas práticas
- Motivação: engajamento dos alunos, evidências de aprendizado
- Pain points: tempo limitado, pressão por resultados

### Secondary Users
**Coordenadores Pedagógicos:**
- Necessidades: relatórios de alinhamento BNCC, métricas de progresso
- Decisores de adoção tecnológica nas escolas

**Pais/Responsáveis:**
- Interesse: progresso educacional dos filhos, atividades construtivas em casa

---

## Market Analysis

### Educational Games Landscape
**Competidores Diretos:**
- Khan Academy Kids (muito amplo, pouco focado em geometria brasileira)
- Mathletics (interface datada, não alinhado à BNCC)
- GCompris (open source, mas sem gamificação moderna)

**Vantagem Competitiva:**
- Primeiro tower defense educacional focado em geometria BNCC
- Sistema de automação de conteúdo para professores
- Funcionamento offline completo
- Criação de conteúdo pelos próprios alunos

### Market Size (Brasil)
- **TAM:** 27 milhões de alunos Ensino Fundamental (INEP 2023)
- **SAM:** 8,1 milhões alunos 3º-5º ano (target direto)
- **SOM:** 500 mil alunos em escolas com acesso tecnológico (inicial)

---

## Technical Requirements

### Minimum Viable Product (MVP)
**Core Gameplay:**
- 5 tipos de formas geométricas (triângulo, quadrado, retângulo, círculo, hexágono)
- 3 níveis de dificuldade progressiva
- Sistema básico de drag-and-drop para defesa
- Cálculos automáticos de área e perímetro
- Feedback visual/sonoro para acertos/erros

**Professor Dashboard:**
- Interface de configuração de invasões
- 3 templates pré-prontos por ano escolar
- Relatório básico: tempo jogado, conceitos praticados, taxa de acerto

**Technical Specs:**
- Performance: 30fps em tablets com 2GB RAM
- Offline: funcionamento completo sem internet
- Browser support: Chrome, Firefox, Safari (últimas 2 versões)
- Responsivo: 320px - 1920px
- Acessibilidade: WCAG 2.1 AA

### Future Iterations (Post-MVP)
**V2.0 - Sandbox Creator (3-4 meses pós-MVP):**
- Editor visual para alunos criarem invasões
- Sistema de compartilhamento entre turmas
- Polígonos irregulares e transformações geométricas

**V3.0 - Professor Quest Integration (6-8 meses):**
- NPCs educacionais que precisam de "ensino"
- Sistema narrativo expandido
- Integração com outras matérias (português, ciências)

---

## Business Model

### Monetization Strategy
**Freemium Approach:**
- **Versão Gratuita:** MVP completo, ilimitado para sempre
- **Premium Features:** Relatórios avançados, criação de conteúdo, suporte técnico
- **Enterprise:** Licenciamento para redes de ensino com customização

### Revenue Projections (12 meses)
- **Fase 1 (0-3 meses):** R$ 0 (MVP gratuito, foco em adoção)
- **Fase 2 (3-6 meses):** R$ 15.000/mês (200 professores premium @ R$ 75/mês)
- **Fase 3 (6-12 meses):** R$ 45.000/mês (600 professores + 5 licenças enterprise)

### Cost Structure
**Desenvolvimento (8-12 semanas MVP):**
- Desenvolvedor: R$ 48.000 (12 semanas × R$ 4.000/semana)
- Design/Audio: R$ 12.000 (freelancers)
- Infraestrutura: R$ 500/mês (hosting + CDN)

---

## Implementation Roadmap

### Phase 1: MVP Development (8-12 semanas)
**Semanas 1-2:** Arquitetura base + Canvas API setup
**Semanas 3-4:** Sistema de formas geométricas + drag-and-drop
**Semanas 5-6:** Lógica de invasões + cálculos matemáticos
**Semanas 7-8:** Professor dashboard + configuração básica
**Semanas 9-10:** Audio + narração épica + polish visual
**Semanas 11-12:** Testes com usuários + correções + PWA setup

### Phase 2: Pilot Program (4 semanas)
- Recrutar 10 professores beta-testers
- Testes em 5 escolas diferentes (urbana, rural, privada, pública)
- Coleta de feedback estruturado
- Iterações baseadas em dados reais de uso

### Phase 3: Launch & Scale (ongoing)
- Marketing orgânico via professores embaixadores
- Participação em eventos de educação
- Parcerias com secretarias municipais de educação
- Desenvolvimento de features premium

---

## Success Criteria & KPIs

### Product Success Metrics
**Engagement:**
- Tempo médio de sessão: 20+ minutos (objetivo)
- Sessions per user per week: 3+ (objetivo)
- Completion rate por nível: 75+ (objetivo)

**Learning Effectiveness:**
- Melhoria em avaliações geometria: 25+ (objetivo)
- Retenção de conceitos após 30 dias: 80+ (objetivo)
- Transfer para problemas não-gamificados: 60+ (objetivo)

**Business Metrics:**
- User acquisition cost: <R$ 50 por professor
- Monthly active users (MAU): 1000+ em 6 meses
- Net Promoter Score (NPS): 70+ entre professores

### Risk Mitigation
**Technical Risks:**
- Performance em hardware limitado: testes extensivos em tablets antigos
- Funcionamento offline: estratégia PWA + IndexedDB

**Market Risks:**
- Resistência de professores tradicionais: programa de embaixadores
- Competição de gigantes: foco em nicho (geometria BNCC) first

**Pedagogical Risks:**
- Não transferência de aprendizado: métricas de avaliação real
- "Só diversão sem educação": validação constante com pedagogos

---

## Next Steps

### Immediate Actions (Próximas 2 semanas)
1. **Validação Técnica:** Prova de conceito Canvas API + drag-and-drop
2. **Validação Pedagógica:** Entrevistas com 5 professores de matemática
3. **Validação de Mercado:** Survey com 50 professores sobre dores atuais
4. **Team Building:** Contratar designer UI/UX especializado em jogos educativos

### Decision Points
**Go/No-Go Decision (2 semanas):**
- Viabilidade técnica confirmada via protótipo
- Interesse de pelo menos 20 professores confirmado
- Orçamento de desenvolvimento aprovado

**Pivot Options (caso necessário):**
- Simplificar para quiz tradicional com tema tower defense
- Expandir para outras matérias além de geometria
- Focar em mercado B2C (pais) em vez de B2B (escolas)

---

*Project brief criado através de comprehensive brainstorming session usando BMAD-METHOD™ framework*

**Document Status:** Ready for stakeholder review and technical validation