### Alterações e explicações:

- Ao invés de ter um if para cada tipo de bloco, criamos uma função que calcula o resultado para qualquer atributo (como VELOCIDADE, MANOBRABILIDADE, ou PODER).

- Criamos uma função para logar o resultado do dado, evitando a repetição do código de log para cada tipo de habilidade.

- A lógica do confronto foi separada em uma função para evitar duplicação.

- A lógica da habilidade foi unificada em uma função genérica, eliminando os múltiplos if para cada tipo de bloco.

- Mudei de commomjs para modules em type no package.json

- Adicionei uma função de sleep para observar o comportamento em cada interação

- Adicionei uma lógica de random para escolher personagens aleatorios com base em uma lista

- Separei os personagens do restante do codigo em um arquivo .json

### Principais melhorias:

- A função processBlock agora lida com qualquer tipo de bloco, seja "RETA", "CURVA" ou "CONFRONTO".

- A função processConfrontation trata exclusivamente do bloco "CONFRONTO".

- Eliminei os múltiplos if para verificar cada tipo de bloco e substituí por uma lógica mais flexível e centralizada.

- A função logRollResult foi mantida, mas agora pode ser reutilizada para qualquer tipo de atributo, reduzindo duplicação.


