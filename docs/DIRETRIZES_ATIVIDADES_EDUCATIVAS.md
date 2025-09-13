# Diretrizes para Atividades Educativas
## Portal de Atividades Educativas

Este documento estabelece os padrões e práticas que todas as atividades do portal devem seguir para manter consistência, usabilidade e qualidade de dados.

## 1. Estrutura Padrão de Atividade

### 1.1 Tela Inicial
- **Nome do estudante**: Campo obrigatório para identificação
- **Fonte padrão**: Comic Sans MS (com opção para OpenDyslexic se necessário)
- **Botão "Voltar ao Portal"**: Navegação `../index.html`
- **Design responsivo**: Compatível com diferentes tamanhos de tela

### 1.1.1 Portal Principal - Layout dos Cards
- **Ícone centralizado**: Grande e visualmente atrativo
- **Título e descrição**: Claros e informativos
- **Informações organizadas**:
  - Tempo estimado centralizado com ícone ⏱️
  - Categoria e dificuldade lado a lado abaixo do tempo
  - Badges coloridas com bordas arredondadas
- **Botão de ação**: Destaque com gradiente e hover effects

### 1.2 Tela de Seleção de Blocos/Níveis
- **Saudação personalizada**: "Olá, [Nome do Estudante]!"
- **Tutorial**: Instruções claras sobre como jogar a atividade
- **Linha divisória sutil**: Entre tutorial e blocos (`border-t border-gray-200 my-6`)
- **Blocos organizados**: Grid responsivo com informações dos blocos
- **Botão "Finalizar Sessão"**: Para encerrar e baixar CSV

### 1.3 Interface de Jogo
- **Header informativo**: Nome do estudante, progresso, pontuação
- **Feedback visual**: Celebrações e mensagens de erro
- **Botão de interrupção**: Para voltar à seleção de blocos
- **Indicadores de progresso**: Barras, estrelas ou percentual

### 1.4 Tela de Resultado
- **Resumo da performance**: Pontuação, acertos, tempo
- **Badges/Conquistas**: Quando aplicável
- **Opções de continuidade**: Novo bloco ou finalizar sessão

## 2. Padrão CSV - OBRIGATÓRIO

### 2.1 Formato Unificado
Todas as atividades DEVEM exportar CSV com esta estrutura exata:

```csv
Nome,Materia,Atividade,Bloco,Questao,Tempo_Execucao,Acertos,Erros,Score
```

### 2.2 Descrição dos Campos

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| **Nome** | Nome do estudante | `João Silva` |
| **Materia** | Disciplina da atividade | `Matematica`, `Historia`, `Portugues` |
| **Atividade** | Nome específico da atividade | `Quiz de Operacoes`, `Construtor de Historia`, `Detective da Historia` |
| **Bloco** | Nome do bloco/nível jogado | `Nivel Iniciante`, `Brasil Independente`, `Misterio da Independencia` |
| **Questao** | Identificador da questão/evento | `5_tentativas`, `Questao_3`, `Evento_1822` |
| **Tempo_Execucao** | Tempo gasto na atividade | `120s`, `3m45s` |
| **Acertos** | Número de respostas corretas | `4`, `5` |
| **Erros** | Número de respostas incorretas | `1`, `0` |
| **Score** | Porcentagem de aproveitamento | `80%`, `100%` |

### 2.3 Exemplos por Tipo de Atividade

#### Matemática - Quiz de Operações
```csv
Nome,Materia,Atividade,Bloco,Questao,Tempo_Execucao,Acertos,Erros,Score
Ana Silva,Matematica,Quiz de Operacoes,Nivel Aventureiro,5_questoes,180s,4,1,80%
```

#### História - Construtor de História
```csv
Nome,Materia,Atividade,Bloco,Questao,Tempo_Execucao,Acertos,Erros,Score
Pedro Santos,Historia,Construtor de Historia,Brasil Independente,8_tentativas,240s,5,3,100%
```

#### História - Corrida da História
```csv
Nome,Materia,Atividade,Bloco,Questao,Tempo_Execucao,Acertos,Erros,Score
Maria Oliveira,Historia,Corrida da Historia,Colonizacao e Invasoes,7_eventos,6s,5,2,100%
```

#### História - Detective da História
```csv
Nome,Materia,Atividade,Bloco,Questao,Tempo_Execucao,Acertos,Erros,Score
Carlos Lima,Historia,Detective da Historia,Caso Independencia,5_misterios,450s,5,1,90%
```

## 3. Funcionalidades Obrigatórias

### 3.1 Sistema de Navegação
- **Voltar ao portal**: Sempre disponível com `../index.html`
- **Voltar à seleção**: Durante o jogo, opção de voltar aos blocos
- **Progressão linear**: Tela inicial → Seleção → Jogo → Resultado

### 3.2 Sistema de Sessão
- **Armazenamento local**: Dados da sessão em localStorage
- **Acumulação de resultados**: Multiple blocos por sessão
- **Finalização controlada**: Botão para encerrar e baixar CSV
- **Limpeza de dados**: Reset completo após finalização

### 3.3 Feedback Visual
- **Celebrações**: Mensagens positivas com animações
- **Erros construtivos**: Feedback educativo, não punitivo
- **Progresso visível**: Barras, contadores ou indicadores
- **Responsividade**: Interface adaptável a diferentes telas

### 3.4 Acessibilidade
- **Fontes dislexia-friendly**: OpenDyslexic como opção
- **Contraste adequado**: Cores que facilitam leitura
- **Tamanhos de fonte**: Adequados para diferentes idades
- **Interface intuitiva**: Ícones e instruções claras

### 3.5 Elementos Visuais Padronizados
- **Linhas divisórias**: `border-t border-gray-200 my-6` entre seções
- **Espaçamentos**: Consistentes entre elementos (my-6, mb-4, etc.)
- **Bordas arredondadas**: rounded-lg, rounded-xl para elementos
- **Sombras sutis**: shadow-lg, shadow-xl para profundidade
- **Transições**: hover:scale-105, transition-all duration-300

## 4. Estrutura de Arquivos

### 4.1 Localização
```
atividades/
├── index.html (portal principal)
├── pages/
│   ├── operacoes_matematicas.html
│   ├── construtor_historia_brasil.html
│   ├── corrida_historia_brasil.html
│   └── detective_historia_independencia.html
└── docs/
    └── DIRETRIZES_ATIVIDADES_EDUCATIVAS.md
```

**Atividades Disponíveis:**
- Quiz de Operações Matemáticas (Matemática)
- Construtor de História do Brasil (História - Intermediário)
- Corrida da História do Brasil (História - Avançado)
- Detective da História - Independência (História - Intermediário)

### 4.2 Nomenclatura
- **Arquivos HTML**: lowercase com underscores
- **Classes CSS**: kebab-case
- **IDs**: camelCase
- **Funções JS**: camelCase

## 5. Implementação Técnica

### 5.1 Framework e Bibliotecas
- **React**: Via CDN (react + react-dom + babel)
- **Tailwind CSS**: Via CDN para estilização
- **Fontes**: Google Fonts (OpenDyslexic + Comic Sans MS)

### 5.2 Estrutura HTML Base
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Nome da Atividade]</title>
    <link href="https://fonts.googleapis.com/css2?family=OpenDyslexic:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Comic+Sans+MS:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root">
        <div class="loading">
            <div class="spinner"></div>
            Carregando [Nome da Atividade]...
        </div>
    </div>
    <script type="text/babel">
        // Código React da atividade
    </script>
</body>
</html>
```

## 6. Validação e Testes

### 6.1 Checklist de Qualidade
- [ ] CSV exportado segue o padrão exato
- [ ] Navegação funciona corretamente
- [ ] Tutorial está na tela de seleção
- [ ] Botão de finalizar sessão funciona
- [ ] Dados são limpos após finalização
- [ ] Interface é responsiva
- [ ] Fontes carregam corretamente
- [ ] Feedback visual funciona
- [ ] localStorage funciona corretamente

### 6.2 Testes de Funcionalidade
1. **Fluxo completo**: Início → Seleção → Jogo → Resultado → Finalização
2. **Navegação**: Todos os botões de voltar funcionam
3. **Dados**: CSV contém informações corretas
4. **Responsividade**: Interface funciona em mobile e desktop
5. **Acessibilidade**: Fontes e contrastes adequados

## 7. Manutenção e Atualizações

### 7.1 Versionamento
- Manter histórico de alterações
- Testar compatibilidade com versões anteriores
- Documentar mudanças significativas

### 7.2 Performance
- Otimizar carregamento de recursos
- Minimizar uso de localStorage
- Garantir fluidez das animações

---

**Última atualização**: Janeiro 2025
**Versão**: 1.0.0
**Autor**: Sistema Educativo Integrado