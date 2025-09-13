# Organização de Mídias das Atividades

Este documento lista todas as mídias (áudios e imagens) necessárias para as atividades educacionais.

## Construtor de História do Brasil (`pages/construtor_historia_brasil.html`)

### Áudios Implementados
- **Funcionalidade:** Botão de áudio (🔊) laranja ao lado esquerdo de cada evento histórico
- **Total de Áudios:** 30 áudios de narração (5 eventos × 6 blocos históricos)
- **Convenção de Nomenclatura:** `bloco_X_evento_Y.mp3`
- **Sistema Anti-Sobreposição:** Impede que múltiplos áudios toquem simultaneamente

#### Padrão de Nomenclatura dos Áudios:
- **Formato:** `bloco_X_evento_Y.mp3`
- **X:** Número do bloco (1, 2, 3, 4, 5, 6)
- **Y:** Número do evento (1, 2, 3, 4, 5)

#### Blocos e Eventos:

##### Bloco 1: Brasil Independente
1. `bloco_1_evento_1.mp3` - Descobrimento do Brasil (1500)
2. `bloco_1_evento_2.mp3` - Chegada da Família Real (1808)
3. `bloco_1_evento_3.mp3` - Volta de Dom João VI (1821)
4. `bloco_1_evento_4.mp3` - Grito do Ipiranga (1822)
5. `bloco_1_evento_5.mp3` - Coroação de Dom Pedro I (1822)

##### Bloco 2: República Brasileira
1. `bloco_2_evento_1.mp3` - Abolição da Escravatura (1888)
2. `bloco_2_evento_2.mp3` - Proclamação da República (1889)
3. `bloco_2_evento_3.mp3` - Primeira Constituição Republicana (1891)
4. `bloco_2_evento_4.mp3` - Era Vargas Começa (1930)
5. `bloco_2_evento_5.mp3` - Nova Constituição (1988)

##### Bloco 3: Brasil Moderno
1. `bloco_3_evento_1.mp3` - Fundação de Brasília (1960)
2. `bloco_3_evento_2.mp3` - Início da Ditadura Militar (1964)
3. `bloco_3_evento_3.mp3` - Fim da Ditadura (1985)
4. `bloco_3_evento_4.mp3` - Criação do Real (1994)
5. `bloco_3_evento_5.mp3` - Olimpíadas no Rio (2016)

##### Bloco 4: Grandes Navegações
1. `bloco_4_evento_1.mp3` - Conquista de Ceuta (1415)
2. `bloco_4_evento_2.mp3` - Cabo da Boa Esperança (1488)
3. `bloco_4_evento_3.mp3` - Colombo chega à América (1492)
4. `bloco_4_evento_4.mp3` - Vasco da Gama na Índia (1498)
5. `bloco_4_evento_5.mp3` - Pedro Álvares no Brasil (1500)

##### Bloco 5: Período Colonial
1. `bloco_5_evento_1.mp3` - Expedições Colonizadoras (1530)
2. `bloco_5_evento_2.mp3` - Primeiro Governo-Geral (1549)
3. `bloco_5_evento_3.mp3` - Destruição de Palmares (1694)
4. `bloco_5_evento_4.mp3` - Inconfidência Mineira (1789)
5. `bloco_5_evento_5.mp3` - Conjuração Baiana (1798)

##### Bloco 6: Era Vargas
1. `bloco_6_evento_1.mp3` - Revolução de 1930 (1930)
2. `bloco_6_evento_2.mp3` - Nova Constituição (1934)
3. `bloco_6_evento_3.mp3` - Estado Novo (1937)
4. `bloco_6_evento_4.mp3` - CLT - Leis Trabalhistas (1943)
5. `bloco_6_evento_5.mp3` - Fim do Estado Novo (1945)

#### Lista Completa de Arquivos por Pasta:
```
media/audios/historia/bloco_1/
├── bloco_1_evento_1.mp3
├── bloco_1_evento_2.mp3
├── bloco_1_evento_3.mp3
├── bloco_1_evento_4.mp3
└── bloco_1_evento_5.mp3

media/audios/historia/bloco_2/
├── bloco_2_evento_1.mp3
├── bloco_2_evento_2.mp3
├── bloco_2_evento_3.mp3
├── bloco_2_evento_4.mp3
└── bloco_2_evento_5.mp3

... (repetindo até bloco_6)
```

### Imagens Placeholder
- **Observação:** Esta atividade não possui imagens específicas implementadas, apenas ícones emoji nos eventos.

---

## Detective da História - Independência do Brasil (`pages/detective_historia_independencia.html`)

### Imagens Placeholder
1. **Arquivo:** `misterios/familia_real_1808.png`
   - **Descrição:** Ilustração da família real fugindo de Napoleão Bonaparte
   - **Contexto:** Mistério-001 - Abertura dos Portos às Nações Amigas

2. **Arquivo:** `misterios/dia_do_fico_1821.png`
   - **Descrição:** Ilustração de Dom Pedro decidindo ficar no Brasil
   - **Contexto:** Mistério-002 - O Dia do Fico

3. **Arquivo:** `misterios/grito_ipiranga_1822.png`
   - **Descrição:** Ilustração do Grito do Ipiranga às margens do rio
   - **Contexto:** Mistério-003 - O Grito do Ipiranga

4. **Arquivo:** `misterios/proclamacao_republica_1889.png`
   - **Descrição:** Ilustração da Proclamação da República
   - **Contexto:** Mistério-004 - Proclamação da República

5. **Arquivo:** `misterios/constituicao_cidada_1988.png`
   - **Descrição:** Ilustração da Constituição Federal de 1988
   - **Contexto:** Mistério-005 - Constituição Federal de 1988

---

## Corrida da História do Brasil (`pages/corrida_historia_brasil.html`)

### Imagens Placeholder

#### Bloco 1: Colonização e Invasões Holandesas
1. **Arquivo:** `caminhos/ilustra_cabral.png`
   - **Descrição:** Ilustração da chegada de Pedro Álvares Cabral ao Brasil (1500)

2. **Arquivo:** `caminhos/ilustra_salvador.png`
   - **Descrição:** Ilustração da criação de Salvador como primeira capital (1549)

3. **Arquivo:** `caminhos/ilustra_franca_antartica.png`
   - **Descrição:** Ilustração da tentativa francesa de colonização no Rio de Janeiro (1555)

4. **Arquivo:** `caminhos/ilustra_holanda_salvador.png`
   - **Descrição:** Ilustração da invasão holandesa em Salvador (1624)

5. **Arquivo:** `caminhos/ilustra_nassau.png`
   - **Descrição:** Ilustração de Maurício de Nassau modernizando Recife (1630)

#### Bloco 2: Expansão e Mineração
6. **Arquivo:** `caminhos/ilustra_ouro_minas.png`
   - **Descrição:** Ilustração da descoberta de ouro em Minas Gerais (1693)

7. **Arquivo:** `caminhos/ilustra_tratado_madri.png`
   - **Descrição:** Ilustração do Tratado de Madri definindo fronteiras (1750)

8. **Arquivo:** `caminhos/ilustra_inconfidencia.png`
   - **Descrição:** Ilustração da Inconfidência Mineira (1789)

9. **Arquivo:** `caminhos/ilustra_dom_joao.png`
   - **Descrição:** Ilustração da chegada de Dom João VI ao Brasil (1808)

10. **Arquivo:** `caminhos/ilustra_reino_unido.png`
    - **Descrição:** Ilustração da criação do Reino Unido do Brasil (1815)

#### Bloco 3: Independência e Império
11. **Arquivo:** `caminhos/ilustra_grito_ipiranga.png`
    - **Descrição:** Ilustração do Grito do Ipiranga (1822)

12. **Arquivo:** `caminhos/ilustra_primeira_constituicao.png`
    - **Descrição:** Ilustração da primeira Constituição do Brasil (1824)

13. **Arquivo:** `caminhos/ilustra_abdicacao_dom_pedro.png`
    - **Descrição:** Ilustração da abdicação de Dom Pedro I (1831)

14. **Arquivo:** `caminhos/ilustra_dom_pedro_ii_jovem.png`
    - **Descrição:** Ilustração da coroação de Dom Pedro II jovem (1840)

15. **Arquivo:** `caminhos/ilustra_lei_eusebio.png`
    - **Descrição:** Ilustração da Lei Eusébio de Queirós (1850)

#### Bloco 4: Abolição e República Velha
16. **Arquivo:** `caminhos/ilustra_lei_aurea.png`
    - **Descrição:** Ilustração da Princesa Isabel assinando a Lei Áurea (1888)

17. **Arquivo:** `caminhos/ilustra_proclamacao_republica.png`
    - **Descrição:** Ilustração da Proclamação da República (1889)

18. **Arquivo:** `caminhos/ilustra_revolucao_30.png`
    - **Descrição:** Ilustração da Revolução de 1930 (1930)

19. **Arquivo:** `caminhos/ilustra_revolucao_32.png`
    - **Descrição:** Ilustração da Revolução Constitucionalista (1932)

20. **Arquivo:** `caminhos/ilustra_estado_novo.png`
    - **Descrição:** Ilustração do Estado Novo de Getúlio Vargas (1937)

#### Bloco 5: Brasil Contemporâneo
21. **Arquivo:** `caminhos/ilustra_copa_50.png`
    - **Descrição:** Ilustração da Copa do Mundo de 1950 no Brasil

22. **Arquivo:** `caminhos/ilustra_brasilia.png`
    - **Descrição:** Ilustração da inauguração de Brasília (1960)

23. **Arquivo:** `caminhos/ilustra_ditadura.png`
    - **Descrição:** Ilustração do início da Ditadura Militar (1964)

24. **Arquivo:** `caminhos/ilustra_fim_ditadura.png`
    - **Descrição:** Ilustração do fim da Ditadura (1985)

25. **Arquivo:** `caminhos/ilustra_constituicao_88.png`
    - **Descrição:** Ilustração da promulgação da Constituição Federal (1988)

#### Bloco 6: Personalidades do Brasil
26. **Arquivo:** `caminhos/ilustra_dom_pedro_i.png`
    - **Descrição:** Ilustração de Dom Pedro I proclamando a independência (1822)

27. **Arquivo:** `caminhos/ilustra_princesa_isabel.png`
    - **Descrição:** Ilustração da Princesa Isabel assinando a Lei Áurea (1888)

28. **Arquivo:** `caminhos/ilustra_getulio_vargas.png`
    - **Descrição:** Ilustração de Getúlio Vargas assumindo a presidência (1930)

29. **Arquivo:** `caminhos/ilustra_jk.png`
    - **Descrição:** Ilustração de Juscelino Kubitschek construindo Brasília (1950)

30. **Arquivo:** `caminhos/ilustra_tancredo.png`
    - **Descrição:** Ilustração de Tancredo Neves como primeiro presidente civil (1985)

---

## Quiz de Operações Matemáticas (`pages/operacoes_matematicas.html`)

### Áudios Implementados
- **Funcionalidade:** Sistema de áudios inteligente
  - **🔊** Botão azul para ouvir o enunciado do problema (manual)
  - **🎧** Áudio da explicação toca AUTOMATICAMENTE 1 segundo após escolher uma resposta
- **Total de Áudios:** 270 áudios de narração (2 áudios × 5 problemas × 27 blocos)
- **Convenção de Nomenclatura:** `bloco_XX_questao_X_TIPO.mp3`
- **Sistema Anti-Sobreposição:** Impede que múltiplos áudios toquem simultaneamente

#### Padrão de Nomenclatura dos Áudios:
- **Formato:** `bloco_XX_questao_X_TIPO.mp3`
- **XX:** Número do bloco com 2 dígitos (01, 02, 03, ..., 27)
- **X:** Número da questão (1, 2, 3, 4, 5)
- **TIPO:** `enunciado` ou `explicacao`

#### Exemplos de Nomes de Arquivos:
- Bloco 1, Questão 1, Enunciado: `bloco_01_questao_1_enunciado.mp3`
- Bloco 1, Questão 1, Explicação: `bloco_01_questao_1_explicacao.mp3`
- Bloco 15, Questão 3, Enunciado: `bloco_15_questao_3_enunciado.mp3`
- Bloco 15, Questão 3, Explicação: `bloco_15_questao_3_explicacao.mp3`
- Bloco 27, Questão 5, Enunciado: `bloco_27_questao_5_enunciado.mp3`
- Bloco 27, Questão 5, Explicação: `bloco_27_questao_5_explicacao.mp3`

#### Lista Completa de Arquivos por Pasta:
```
media/audios/matematica/bloco_01/
├── bloco_01_questao_1_enunciado.mp3
├── bloco_01_questao_1_explicacao.mp3
├── bloco_01_questao_2_enunciado.mp3
├── bloco_01_questao_2_explicacao.mp3
├── bloco_01_questao_3_enunciado.mp3
├── bloco_01_questao_3_explicacao.mp3
├── bloco_01_questao_4_enunciado.mp3
├── bloco_01_questao_4_explicacao.mp3
├── bloco_01_questao_5_enunciado.mp3
└── bloco_01_questao_5_explicacao.mp3

media/audios/matematica/bloco_02/
├── bloco_02_questao_1_enunciado.mp3
├── bloco_02_questao_1_explicacao.mp3
├── bloco_02_questao_2_enunciado.mp3
├── bloco_02_questao_2_explicacao.mp3
├── bloco_02_questao_3_enunciado.mp3
├── bloco_02_questao_3_explicacao.mp3
├── bloco_02_questao_4_enunciado.mp3
├── bloco_02_questao_4_explicacao.mp3
├── bloco_02_questao_5_enunciado.mp3
└── bloco_02_questao_5_explicacao.mp3

... (repetindo até bloco_27)
```

---

## Estrutura de Pastas Recomendada

```
media/
├── misterios/
│   ├── familia_real_1808.png
│   ├── dia_do_fico_1821.png
│   ├── grito_ipiranga_1822.png
│   ├── proclamacao_republica_1889.png
│   └── constituicao_cidada_1988.png
├── caminhos/
│   ├── ilustra_cabral.png
│   ├── ilustra_salvador.png
│   ├── ilustra_franca_antartica.png
│   ├── ilustra_holanda_salvador.png
│   ├── ilustra_nassau.png
│   ├── ilustra_ouro_minas.png
│   ├── ilustra_tratado_madri.png
│   ├── ilustra_inconfidencia.png
│   ├── ilustra_dom_joao.png
│   ├── ilustra_reino_unido.png
│   ├── ilustra_grito_ipiranga.png
│   ├── ilustra_primeira_constituicao.png
│   ├── ilustra_abdicacao_dom_pedro.png
│   ├── ilustra_dom_pedro_ii_jovem.png
│   ├── ilustra_lei_eusebio.png
│   ├── ilustra_lei_aurea.png
│   ├── ilustra_proclamacao_republica.png
│   ├── ilustra_revolucao_30.png
│   ├── ilustra_revolucao_32.png
│   ├── ilustra_estado_novo.png
│   ├── ilustra_copa_50.png
│   ├── ilustra_brasilia.png
│   ├── ilustra_ditadura.png
│   ├── ilustra_fim_ditadura.png
│   ├── ilustra_constituicao_88.png
│   ├── ilustra_dom_pedro_i.png
│   ├── ilustra_princesa_isabel.png
│   ├── ilustra_getulio_vargas.png
│   ├── ilustra_jk.png
│   └── ilustra_tancredo.png
├── musicas/
│   └── fundo/
│       ├── musica_fundo_1.mp3
│       ├── musica_fundo_2.mp3
│       ├── musica_fundo_3.mp3
│       ├── musica_fundo_4.mp3
│       └── musica_fundo_5.mp3
└── audios/
    ├── historia/
    │   ├── bloco_1/
    │   ├── bloco_2/
    │   ├── bloco_3/
    │   ├── bloco_4/
    │   ├── bloco_5/
    │   └── bloco_6/
    └── matematica/
        ├── bloco_01/
        ├── bloco_02/
        ├── ...
        └── bloco_27/
```

## Música de Fundo (`media/musicas/fundo/`)

### Sistema de Música Ambiente Implementado
- **Funcionalidade:** Música de fundo toca automaticamente em todas as atividades
- **Volume:** 15% (baixo, não interfere com áudios educacionais que são 80%)
- **Comportamento:** 
  - Seleção aleatória de uma das 5 músicas disponíveis
  - Loop infinito da música selecionada
  - Inicia automaticamente quando possível (depende das políticas do navegador)
  - Ativada automaticamente na primeira interação do usuário

### Arquivos de Música de Fundo Necessários:
```
media/musicas/fundo/
├── musica_fundo_1.mp3
├── musica_fundo_2.mp3
├── musica_fundo_3.mp3
├── musica_fundo_4.mp3
└── musica_fundo_5.mp3
```

### Características Técnicas:
- **Sistema Anti-Sobreposição:** A música de fundo não interfere com áudios educacionais
- **Volume Inteligente:** 15% para música, reduz para 5% durante áudios educacionais (80%)
- **Botão de Controle:** Botão flutuante roxo 🎵/🔇 no canto superior direito
- **Gestão Automática:** Para e reinicia quando necessário
- **Implementado em:** Quiz de Matemática e Construtor de História

---

## Sons de Feedback (`media/sons/feedback/`)

### Sistema de Feedback Sonoro Implementado
- **Funcionalidade:** Sons aleatórios que tocam automaticamente em acertos e erros
- **Volume:** 70% (médio, não muito alto nem baixo)
- **Comportamento:**
  - **Acerto:** 1 de 4 sons de acerto aleatório
  - **Erro:** 1 de 4 sons de erro aleatório
  - **Reprodução:** Imediata quando o usuário responde

### Arquivos de Sons de Feedback Necessários:
```
media/sons/feedback/
├── acertos/
│   ├── acerto_1.mp3
│   ├── acerto_2.mp3
│   ├── acerto_3.mp3
│   └── acerto_4.mp3
└── erros/
    ├── erro_1.mp3
    ├── erro_2.mp3
    ├── erro_3.mp3
    └── erro_4.mp3
```

### Características Técnicas:
- **Seleção Aleatória:** Escolhe um som diferente a cada resposta
- **Volume Balanceado:** 70% para ser audível mas não invasivo
- **Implementado em:** Todas as atividades (Quiz de Matemática e Construtor de História)

---

## Resumo Total

- **Imagens para História:** 30 ilustrações históricas
- **Áudios para História:** 30 áudios implementados (5 eventos × 6 blocos históricos)
- **Áudios para Matemática:** 270 áudios implementados (2 tipos × 5 questões × 27 blocos)
- **Músicas de Fundo:** 5 músicas ambiente implementadas
- **Sons de Feedback:** 8 sons de feedback implementados (4 acertos + 4 erros)
- **Total de arquivos de mídia:** 343 arquivos

## Observações

1. Todas as imagens atualmente mostram placeholder text (ex: "Evidência Fotográfica 1808")
2. Os caminhos das imagens estão relativos às pastas onde serão organizadas
3. Recomenda-se criar as imagens em formato PNG com dimensões adequadas para web
4. **✅ Os áudios estão implementados** com sistema inteligente anti-sobreposição
5. Se um arquivo de áudio não existir, o sistema apenas registra no console sem quebrar a funcionalidade
6. **Botão 🔊 (azul):** Reproduz o enunciado do problema manualmente
7. **Áudio automático:** Explicação toca automaticamente 1 segundo após responder
8. **Sistema Anti-Sobreposição:** Todos os áudios param o áudio anterior antes de tocar o novo
9. **🎵 Música de Fundo:** Toca automaticamente em volume baixo (15%) em todas as atividades

## Convenção de Nomenclatura para Áudios

**Padrão obrigatório:** `bloco_XX_questao_X_TIPO.mp3`
- XX = Número do bloco com 2 dígitos (01-27)
- X = Número da questão (1-5)
- TIPO = `enunciado` ou `explicacao`
- Localização: `media/audios/matematica/bloco_XX/`

**Exemplos práticos:**
- **Enunciados:**
  - `media/audios/matematica/bloco_01/bloco_01_questao_1_enunciado.mp3`
  - `media/audios/matematica/bloco_15/bloco_15_questao_3_enunciado.mp3`  
  - `media/audios/matematica/bloco_27/bloco_27_questao_5_enunciado.mp3`
- **Explicações:**
  - `media/audios/matematica/bloco_01/bloco_01_questao_1_explicacao.mp3`
  - `media/audios/matematica/bloco_15/bloco_15_questao_3_explicacao.mp3`  
  - `media/audios/matematica/bloco_27/bloco_27_questao_5_explicacao.mp3`

## Convenção de Nomenclatura para Áudios de História

**Padrão obrigatório:** `bloco_X_evento_Y.mp3`
- X = Número do bloco (1-6)
- Y = Número do evento (1-5)
- Localização: `media/audios/historia/bloco_X/`

**Exemplos práticos:**
- `media/audios/historia/bloco_1/bloco_1_evento_1.mp3` (Descobrimento do Brasil)
- `media/audios/historia/bloco_3/bloco_3_evento_2.mp3` (Início da Ditadura Militar)
- `media/audios/historia/bloco_6/bloco_6_evento_5.mp3` (Fim do Estado Novo)