
# PM2 process file template

## Normal NodeJS application

```json

{
    "name": "__APP_NAME__",
    "script": "__MAIN_FILE__",
    "watch": false,
    "merge_logs": true,
    "cwd": "__DEPLOY_PATH__/__APP_NAME__",
    "instances": __INSTANCES__,
    "env": {}
}

```

## Bash script

```json

{
    "name": "__APP_NAME__",
    "script": "__MAIN_FILE__",
    "watch": false,
    "merge_logs": true,
    "cwd": "__DEPLOY_PATH__/__APP_NAME__",
    "exec_mode": "fork",
    "interpreter": "__INTERPRETER_PATH__",
    "args": "__APP_ARGS__",
    "env": {}
}

```