### proxy-meli
Proxy tech challenge for MELI

## Uso e Teste
Criar um arquivo .env e copiar o conteudo de exemplo do env.example

O ideal seria ter o node e docker instalado pois apesar de ter um Dockerfile a api(httpbin.org) que está sendo usada de proxy acaba bloqueando 
e retornando 500 quando chamada dentro de um container, mas a aplicação é api agnostica, e basta setar o campo API_URL=minhaurldeapirest 
no arquivo .env e funcionará tambem

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

