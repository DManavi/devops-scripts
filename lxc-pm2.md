
# How to deploy an application on a LXC container using PM2 as host

# Variables
All the variables that wrapped into $(VAR_NAME) must be available in deployment process.

# Script

```sh

$(LXC_BIN) exec $(LXC_CONTAINER) -- mkdir -p $(TEMP_PATH)/$(PACKAGE_NAME)/

$(LXC_BIN) file push $(TEMP_PATH)/$(PACKAGE_NAME)/$(ARCHIVE_PACKAGE_NAME) $(LXC_CONTAINER)/$(TEMP_PATH)/$(PACKAGE_NAME)/

rm -rf $(TEMP_PATH)/$(PACKAGE_NAME)/$(ARCHIVE_PACKAGE_NAME)


$(LXC_BIN) exec $(LXC_CONTAINER) -- rm -rf $(DEPLOY_PATH)/$(APP_NAME)

$(LXC_BIN) exec $(LXC_CONTAINER) -- mkdir -p $(DEPLOY_PATH)/$(APP_NAME)


$(LXC_BIN) exec $(LXC_CONTAINER) -- tar -xf $(TEMP_PATH)/$(PACKAGE_NAME)/$(ARCHIVE_PACKAGE_NAME) --directory $(DEPLOY_PATH)/$(APP_NAME)


$(LXC_BIN) exec $(LXC_CONTAINER) ash -- -c 'cd $(DEPLOY_PATH)/$(APP_NAME) && npm rebuild bcrypt --build-from-source'


$(LXC_BIN) exec $(LXC_CONTAINER) -- rm -rf $(TEMP_PATH)/$(PACKAGE_NAME)/$(ARCHIVE_PACKAGE_NAME)


$(LXC_BIN) file push $(TEMP_PATH)/$(PACKAGE_NAME)/pm2.json $(LXC_CONTAINER)/$(TEMP_PATH)/$(PACKAGE_NAME)/pm2.json

$(LXC_BIN) exec $(LXC_CONTAINER) -- pm2 startOrGracefulReload $(TEMP_PATH)/$(PACKAGE_NAME)/pm2.json

$(LXC_BIN) exec $(LXC_CONTAINER) -- pm2 save

$(LXC_BIN) exec $(LXC_CONTAINER) -- rm -rf $(TEMP_PATH)/$(PACKAGE_NAME)/

rm -rf $(TEMP_PATH)/$(PACKAGE_NAME)

```