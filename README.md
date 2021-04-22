Contém a aplicação desenvolvida durante a Next Level Week de 2021.

Para subir o servidor fake, utilize:
```
json-server src/services/server.json --host $(hostname -I | cut -c1-14) --port 3333 --delay 700
```