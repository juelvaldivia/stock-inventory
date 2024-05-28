include make/variables.mk

APP_NAME := stock-inventory
DOCKER_COMPOSE_FILE := ./docker-compose.yml
COMPOSE_FLAGS := --project-name $(APP_NAME) -f $(DOCKER_COMPOSE_FILE)
BUILD_FLAGS := --force-rm

SERVICES = inventory web-app

.DEFAULT_GOAL := start

help: ## Show this help.
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)
	@echo 'services:'
	@echo '$(WHITE)backend:$(RESET)'
	@echo '  $(YELLOW)inventory$(RESET)'
	@echo '$(WHITE)frontend:$(RESET)'
	@echo '  $(YELLOW)web-app$(RESET)'

build: ##@build Builds all containers or just c=<name>
	@$(DOCKER_COMPOSE) $(COMPOSE_FLAGS) build $(BUILD_FLAGS) $(c)

clean-volumes: ##@clean Cleans all volumes created for application in local machine
	@if [[ ! -z $$($(DOCKER) volume ls | grep '$(APP_NAME)') ]]; then \
		$(DOCKER) volume rm `$(DOCKER) volume ls | grep '${APP_NAME}' | awk '{ print $$2 }'`; \
	fi

clean-images: ##@clean Cleans untagged images
	@if [[ ! -z $$($(DOCKER) images -f "dangling=true" -q) ]]; then \
		$(DOCKER) rmi `$(DOCKER) images -f "dangling=true" -q`; \
	fi

clean: confirm clean-images clean-volumes ##@clean Cleans all volumes and images created for application in local machine

up: ##@execution Starts all services or just c=<name> in the foreground
	@$(DOCKER_COMPOSE) $(COMPOSE_FLAGS) up $(c)

down: ##@execution Stops and destroys all services
	@$(DOCKER_COMPOSE) $(COMPOSE_FLAGS) down

start: ##@execution Starts all services or just c=<name> in the background
	@$(DOCKER_COMPOSE) $(COMPOSE_FLAGS) up -d $(c)

stop: ##@execution Stops all services or just c=<name>
	@$(DOCKER_COMPOSE) $(COMPOSE_FLAGS) stop $(c)

restart: ##@execution Restarts all services or just c=<name>
	@$(DOCKER_COMPOSE) $(COMPOSE_FLAGS) stop $(c)
	@$(DOCKER_COMPOSE) $(COMPOSE_FLAGS) up -d $(c)

destroy: confirm down clean-volumes ##@build Destroys all containers, networks, data and volumes

logs: ## Shows live logs for all services or just for c=<name>
	@$(DOCKER_COMPOSE) $(COMPOSE_FLAGS) logs -f $(c)

status: ## Shows status of containers
	@$(DOCKER_COMPOSE) $(COMPOSE_FLAGS) ps

ps: status ## Alias of status

shell: ##@miscellaneous Connect to service c=<name> with sh shell
	@$(DOCKER_COMPOSE) $(COMPOSE_FLAGS) run $(c) /bin/sh

psql: ##@miscellaneous Connect to Postgres database db=<name>
	@$(DOCKER_COMPOSE) $(COMPOSE_FLAGS) run database psql -h database -U postgres $(db)

psql-ls: ##@miscellaneous Show databases in Postgres
	@$(DOCKER_COMPOSE) $(COMPOSE_FLAGS) run database psql -h database -U postgres -l

confirm:
	@(read -p "$(RED)Are you sure? [y/N]$(RESET): " sure && case "$$sure" in [yY]) true;; *) false;; esac)
