# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## setup

````bash
    ░▒▓    ~/Workspace/Perso/Behaska/FoundryVTT  npx sv create world-tracker
    (node:76415) ExperimentalWarning: CommonJS module /opt/homebrew/lib/node_modules/npm/node_modules/debug/src/node.js is loading ES Module /opt/homebrew/lib/node_modules/npm/node_modules/supports-color/index.js using require().
    Support for loading ES Module in require() is an experimental feature and might change at any time
    (Use `node --trace-warnings ...` to show where the warning was created)
    Need to install the following packages:
    sv@0.6.6
    Ok to proceed? (y) y
    
    ┌  Welcome to the Svelte CLI! (v0.6.6)
    │
    ◇  Which template would you like?
    │  SvelteKit minimal
    │
    ◇  Add type checking with Typescript?
    │  Yes, using Typescript syntax
    │
    ◆  Project created
    │
    ◇  What would you like to add to your project? (use arrow keys / space bar)
    │  prettier, eslint, vitest, playwright, tailwindcss, drizzle, lucia, paraglide
    │
    ◇  tailwindcss: Which plugins would you like to add?
    │  typography, forms, container-queries
    │
    ◇  drizzle: Which database would you like to use?
    │  PostgreSQL
    │
    ◇  drizzle: Which PostgreSQL client would you like to use?
    │  Postgres.JS
    │
    ◇  drizzle: Do you want to run the database locally with docker-compose?
    │  Yes
    │
    ◇  lucia: Do you want to include a demo? (includes a login/register page)
    │  Yes
    │
    ◇  paraglide: Which languages would you like to support? (e.g. en,de-ch)
    │  en,fr
    │
    ◇  paraglide: Do you want to include a demo?
    │  Yes
    │
    ◇  Which package manager do you want to install dependencies with?
    │  pnpm
    │
    ◆  Successfully setup add-ons
    │
    ◆  Successfully installed dependencies
    │
    ◇  Successfully formatted modified files
    │
    ◇  Project next steps ─────────────────────────────────────────────────────╮
    │                                                                          │
    │  1: cd world-tracker                                                     │
    │  2: git init && git add -A && git commit -m "Initial commit" (optional)  │
    │  3: pnpm dev --open                                                      │
    │                                                                          │
    │  To close the dev server, hit Ctrl-C                                     │
    │                                                                          │
    │  Stuck? Visit us at https://svelte.dev/chat                              │
    │                                                                          │
    ├──────────────────────────────────────────────────────────────────────────╯
    │
    ◇  Add-on next steps ──────────────────────────────────────────────────╮
    │                                                                      │
    │  drizzle:                                                            │
    │  - You will need to set DATABASE_URL in your production environment  │
    │  - Run pnpm run db:start to start the docker container               │
    │  - Run pnpm run db:push to update your database schema               │
    │                                                                      │
    │  lucia:                                                              │
    │  - Run pnpm run db:push to update your database schema               │
    │  - Visit /demo/lucia route to view the demo                          │
    │                                                                      │
    │  paraglide:                                                          │
    │  - Edit your messages in messages/en.json                            │
    │  - Consider installing the Sherlock IDE Extension                    │
    │  - Visit /demo/paraglide route to view the demo                      │
    │                                                                      │
    ├──────────────────────────────────────────────────────────────────────╯
    │
    └  You're all set!
````

## Installation de Postgres

````bash
kubectl run my-release-postgresql-client --rm --tty -i --restart='Never' --namespace nihongo-flash --image docker.io/bitnami/postgresql:17.2.0-debian-12-r0 --env="PGPASSWORD=$POSTGRES_PASSWORD" \
--command -- psql --host my-release-postgresql -U postgres -d postgres -p 5432
````

````bash
helm install my-release oci://registry-1.docker.io/bitnamicharts/postgresql
Pulled: registry-1.docker.io/bitnamicharts/postgresql:16.2.2
Digest: sha256:c606abf37a17ffd8a7db17accd07b3287f80f9eafab5539c1215cb4e148a2e57
NAME: my-release
LAST DEPLOYED: Fri Nov 22 20:44:57 2024
NAMESPACE: nihongo-flash
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
CHART NAME: postgresql
CHART VERSION: 16.2.2
APP VERSION: 17.2.0

** Please be patient while the chart is being deployed **

PostgreSQL can be accessed via port 5432 on the following DNS names from within your cluster:

    my-release-postgresql.nihongo-flash.svc.cluster.local - Read/Write connection

To get the password for "postgres" run:

    export POSTGRES_PASSWORD=$(kubectl get secret --namespace nihongo-flash my-release-postgresql -o jsonpath="{.data.postgres-password}" | base64 -d)

To connect to your database run the following command:

    kubectl run my-release-postgresql-client --rm --tty -i --restart='Never' --namespace nihongo-flash --image docker.io/bitnami/postgresql:17.2.0-debian-12-r0 --env="PGPASSWORD=$POSTGRES_PASSWORD" \
      --command -- psql --host my-release-postgresql -U postgres -d postgres -p 5432

    > NOTE: If you access the container using bash, make sure that you execute "/opt/bitnami/scripts/postgresql/entrypoint.sh /bin/bash" in order to avoid the error "psql: local user with ID 1001} does not exist"

To connect to your database from outside the cluster execute the following commands:

    kubectl port-forward --namespace nihongo-flash svc/my-release-postgresql 5432:5432 &
    PGPASSWORD="$POSTGRES_PASSWORD" psql --host 127.0.0.1 -U postgres -d postgres -p 5432

WARNING: The configured password will be ignored on new installation in case when previous PostgreSQL release was deleted through the helm command. In that case, old PVC will have an old password, and setting it through helm won't take effect. Deleting persistent volumes (PVs) will solve the issue.

WARNING: There are "resources" sections in the chart not set. Using "resourcesPreset" is not recommended for production. For production installations, please set the following values according to your workload needs:
- primary.resources
- readReplicas.resources
  +info https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
````

### Forward du port de Postgres pour le local

````bash
kubectl port-forward svc/my-release-postgresql 5432:5432 &
````

### Connexion à la base de données

````bash
export POSTGRES_PASSWORD=$(kubectl get secret --namespace world-tracker my-release-postgresql -o jsonpath="{.data.postgres-password}" | base64 -d)
````

### DataSource

````text
#DataSourceSettings#
#LocalDataSource: postgres@localhost
#BEGIN#
<data-source source="LOCAL" name="postgres@localhost" uuid="b5c5a0a5-a673-4012-b693-23d09c5b703c"><database-info product="PostgreSQL" version="17.2" jdbc-version="4.2" driver-name="PostgreSQL JDBC Driver" driver-version="42.7.3" dbms="POSTGRES" exact-version="17.2" exact-driver-version="42.7"><identifier-quote-string>&quot;</identifier-quote-string></database-info><case-sensitivity plain-identifiers="lower" quoted-identifiers="exact"/><driver-ref>postgresql</driver-ref><synchronize>true</synchronize><jdbc-driver>org.postgresql.Driver</jdbc-driver><jdbc-url>jdbc:postgresql://localhost:5432/postgres</jdbc-url><secret-storage>master_key</secret-storage><user-name>postgres</user-name><schema-mapping><introspection-scope><node kind="database" qname="@"><node kind="schema" qname="@"/></node></introspection-scope></schema-mapping><working-dir>$ProjectFileDir$</working-dir></data-source>
#END#
````

### Compte user de test

````text
user: hervedarritchon
password: acp4gTeDea#P63$Q
````