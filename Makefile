migrate:
	docker-compose run --rm web bash -c "rails db:migrate"