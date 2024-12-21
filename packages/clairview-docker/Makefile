prod-build:
	@cd ../.. && docker build -f ./packages/clairview-docker/clairview/Dockerfile --tag clairview . && cd -

prod-run:
	@docker run -d -p 3000:3000 --name clairview clairview

prod-postgres-run:
	@docker run -d -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres --name clairview-postgres clairview-postgres

prod-website-build:
	@cd ../.. && docker build -f ./packages/clairview-docker/clairview-website/Dockerfile --tag clairview-website . && cd -

prod-website-run:
	@docker run -d -p 3000:3000 --name clairview-website clairview-website
