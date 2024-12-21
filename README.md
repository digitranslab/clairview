<h1 align="center" style="border-bottom: none">
    Clairview

    The Open Source Airtable Alternative
</h1>

<p align="center">
ClairView is the fastest and easiest way to build databases online.
</p>



# Installation

## Docker with SQLite

```bash 
docker run -d \
  --name noco \
  -v "$(pwd)"/clairview:/usr/app/data/ \
  -p 8080:8080 \
  digitranslab/clairview:latest
  ```

## Docker with PG
```bash
docker run -d \
  --name noco \
  -v "$(pwd)"/clairview:/usr/app/data/ \
  -p 8080:8080 \
  -e NC_DB="pg://host.docker.internal:5432?u=root&p=password&d=d1" \
  -e NC_AUTH_JWT_SECRET="569a1821-0a93-45e8-87ab-eb857f20a010" \
  digitranslab/clairview:latest
```

## Auto-upstall
Auto-upstall is a single command that sets up ClairView on a server for production usage.
Behind the scenes it auto-generates docker-compose for you.

```bash
bash <(curl -sSL http://install.clairview.com/noco.sh) <(mktemp)
```

Auto-upstall does the following: 🕊
- 🐳 Automatically installs all pre-requisites like docker, docker-compose
- 🚀 Automatically installs ClairView with PostgreSQL, Redis, Minio, Traefik gateway using Docker Compose. 🐘 🗄️ 🌐
- 🔄 Automatically upgrades ClairView to the latest version when you run the command again.
- 🔒 Automatically setups SSL and also renews it. Needs a domain or subdomain as input while installation.
> install.clairview.com/noco.sh script can be found [here in our github](https://raw.githubusercontent.com/digitranslab/clairview/develop/docker-compose/1_Auto_Upstall/noco.sh)


## Other Methods

> Binaries are only for quick testing locally.

| Install Method                | Command to install                                                                                                                                                                                                                                                                                                                                                         |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 🍏 MacOS arm64 <br>(Binary)   | `curl http://get.clairview.com/macos-arm64 -o clairview -L && chmod +x clairview && ./clairview`                                                                                                                                                                                                                                                                                       |
| 🍏 MacOS x64 <br>(Binary)     | `curl http://get.clairview.com/macos-x64 -o clairview -L && chmod +x clairview && ./clairview`                                                                                                                                                                                                                                                                                         |
| 🐧 Linux arm64 <br>(Binary)   | `curl http://get.clairview.com/linux-arm64 -o clairview -L && chmod +x clairview && ./clairview`                                                                                                                                                                                                                                                                                       |
| 🐧 Linux x64 <br>(Binary)     | `curl http://get.clairview.com/linux-x64 -o clairview -L && chmod +x clairview && ./clairview`                                                                                                                                                                                                                                                                                         |
| 🪟 Windows arm64 <br>(Binary) | `iwr http://get.clairview.com/win-arm64.exe -OutFile Noco-win-arm64.exe && .\Noco-win-arm64.exe`                                                                                                                                                                                                                                                                              |
| 🪟 Windows x64 <br>(Binary)   | `iwr http://get.clairview.com/win-x64.exe -OutFile Noco-win-x64.exe && .\Noco-win-x64.exe`                                                                                                                                                                                                                                                                                    |


> When running locally access clairview by visiting: [http://localhost:8080/dashboard](http://localhost:8080/dashboard)

For more installation methods, please refer to [our docs](https://docs.clairview.com/category/installation)


# Features

### Rich Spreadsheet Interface

- ⚡ &nbsp;Basic Operations: Create, Read, Update and Delete Tables, Columns, and Rows
- ⚡ &nbsp;Fields Operations: Sort, Filter, Group, Hide / Unhide Columns
- ⚡ &nbsp;Multiple Views Types: Grid (By default), Gallery, Form, Kanban and Calendar View
- ⚡ &nbsp;View Permissions Types: Collaborative Views, & Locked Views
- ⚡ &nbsp;Share Bases / Views: either Public or Private (with Password Protected)
- ⚡ &nbsp;Variant Cell Types: ID, Links, Lookup, Rollup, SingleLineText, Attachment, Currency, Formula, User, etc
- ⚡ &nbsp;Access Control with Roles: Fine-grained Access Control at different levels
- ⚡ &nbsp;and more ...

### App Store for Workflow Automations

We provide different integrations in three main categories. See <a href="https://docs.clairview.com/account-settings/oss-specific-details/#app-store" target="_blank">App Store</a> for details.

- ⚡ &nbsp;Chat: Slack, Discord, Mattermost, and etc
- ⚡ &nbsp;Email: AWS SES, SMTP, MailerSend, and etc
- ⚡ &nbsp;Storage: AWS S3, Google Cloud Storage, Minio, and etc

### Programmatic Access

We provide the following ways to let users programmatically invoke actions. You can use a token (either JWT or Social Auth) to sign your requests for authorization to ClairView.

- ⚡ &nbsp;REST APIs
- ⚡ &nbsp;ClairView SDK
