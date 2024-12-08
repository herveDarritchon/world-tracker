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
kubectl run world-tracker-postgres-postgresql-client --rm --tty -i --restart='Never' --namespace world-tracker --image docker.io/bitnami/postgresql:17.2.0-debian-12-r0 --env="PGPASSWORD=$POSTGRES_PASSWORD" \
--command -- psql --host world-tracker-postgres-postgresql -U postgres -d postgres -p 5432
````

````bash
helm install world-tracker oci://registry-1.docker.io/bitnamicharts/postgresql
Pulled: registry-1.docker.io/bitnamicharts/postgresql:16.2.5
Digest: sha256:98507e46a6aedb61d6075295a3c5354866875f628daf7a61862329ab398b7b43
NAME: world-tracker
LAST DEPLOYED: Thu Dec  5 19:08:09 2024
NAMESPACE: world-tracker
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
CHART NAME: postgresql
CHART VERSION: 16.2.5
APP VERSION: 17.2.0

** Please be patient while the chart is being deployed **

PostgreSQL can be accessed via port 5432 on the following DNS names from within your cluster:

    world-tracker-postgresql.world-tracker.svc.cluster.local - Read/Write connection

To get the password for "postgres" run:

    export POSTGRES_PASSWORD=$(kubectl get secret --namespace world-tracker world-tracker-postgresql -o jsonpath="{.data.postgres-password}" | base64 -d)

To connect to your database run the following command:

    kubectl run world-tracker-postgresql-client --rm --tty -i --restart='Never' --namespace world-tracker --image docker.io/bitnami/postgresql:17.2.0-debian-12-r2 --env="PGPASSWORD=$POSTGRES_PASSWORD" \
      --command -- psql --host world-tracker-postgresql -U postgres -d postgres -p 5432

    > NOTE: If you access the container using bash, make sure that you execute "/opt/bitnami/scripts/postgresql/entrypoint.sh /bin/bash" in order to avoid the error "psql: local user with ID 1001} does not exist"

To connect to your database from outside the cluster execute the following commands:

    kubectl port-forward --namespace world-tracker svc/world-tracker-postgresql 5432:5432 &
    PGPASSWORD="$POSTGRES_PASSWORD" psql --host 127.0.0.1 -U postgres -d postgres -p 5432

WARNING: The configured password will be ignored on new installation in case when previous PostgreSQL release was deleted through the helm command. In that case, old PVC will have an old password, and setting it through helm won't take effect. Deleting persistent volumes (PVs) will solve the issue.

WARNING: There are "resources" sections in the chart not set. Using "resourcesPreset" is not recommended for production. For production installations, please set the following values according to your workload needs:
  - primary.resources
  - readReplicas.resources
+info https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
````

### Port Forward Postgres

### Create

````bash
kubectl port-forward svc/world-tracker-postgresql 5432:5432 &
````

### List

````bash
ps -f | grep 'kubectl' | grep 'port-forward'
````

### Base de données

#### Mot de passe

````bash
export POSTGRES_PASSWORD=$(kubectl get secret --namespace world-tracker world-tracker-postgres-postgresql -o jsonpath="{.data.postgres-password}" | base64 -d)
````
#### Récupération du mot de passe

````bash
echo $POSTGRES_PASSWORD
````

#### Génération de la migration de la base de données

````bash
pnpm run db:generate
````

#### Exécution de la migration

````bash
pnpm run db:migrate
````

#### Population de la Base de données avec des data

````bash
pnpm run db:push
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

### List container helm

````bash
helm list -A -a
````

### Delete container helm

````bash
helm uninstall world-tracker
````

### List les persistents volumes

````bash
kubectl get pvc
````

### Delete persitent volume

````bash
kubectl delete pvc 'id-pvc'
````