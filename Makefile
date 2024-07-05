SHELL := /bin/bash

init:
	./scripts/init.sh

clean:
	find . -name node_modules -type d -prune -or -name cache -type d -or -name dist -type d -or -name '*.bak' -type f -or -name '*.log' -type f | xargs rm -rf

dedupe:
	./scripts/dedupe.sh

license-check:
	./scripts/license.sh 1

license-generate:
	./scripts/license.sh 3
