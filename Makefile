migrate:
	docker-compose run --rm web bash -c "rails db:migrate"
bash:
	docker-compose run --rm web bash
lint:
	node_modules/.bin/eslint app/javascript app/assets
lint-fix:
	node_modules/.bin/eslint --fix app/javascript app/assets

