
Start 

`docker build -t ef-back . `

`docker compose  up -d `

to run migration `docker-compose exec ef npm exec knex migrate:up`

update
