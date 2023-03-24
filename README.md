# proxy-meli
Proxy tech challenge for MELI

## Introdução
Como o guia de getting started da api do MELI já não possuia mais suporte para aplicações rodando em localhost, o proxy é api agnostico, então qualquer api rest deveria funcionar(proxy testado com duas apis httpbin.org e inshorts.deta.dev)

## Guia de uso
Criar um arquivo .env e copiar o conteudo de exemplo do env.example

### Para utilizar apenas o docker basta descomentar as linhas do app do arquivo docker-compose.yml e rodar

Para rodar no docker: 
```
docker-compose up -d --build
```

### Para rodar localmente com node.js basta rodar o seguinte comando: 
```
docker-compose up -d --build
```

e uma vez que os bancos ja estejam de pé basta rodar: 
```
node index.js 
```

## Guia de teste

Para facilitar o teste, o projeto conta com uma coleção http que pode ser rodada no [insomnia](https://insomnia.rest/download) sob o nome de Insomnia_collection

## Sobre a arquitetura
![arch](https://raw.githubusercontent.com/KevinDaSilvaS/proxy-meli/main/arch.png?token=GHSAT0AAAAAAB5WVO6O3ADULQQSWXXSGVOMZA56JQQ)
