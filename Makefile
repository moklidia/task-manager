migrate:
	docker-compose run --rm web bash -c "rails db:migrate"
bash:
	docker-compose run --rm --service-ports web /bin/bash