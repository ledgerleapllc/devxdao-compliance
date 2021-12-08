<p align="center" padding-top="100">
	<img src="https://ledgerleap.com/web/images/devxdao-compliance-logo.svg" width="400">
</p>

## DevxDao Program Management Frontend

The DevxDao's Program Management and Operations portal hosted at https://compliance.devxdao.com

This is a frontend repo of the portal. Backend repo for this project is located here, https://github.com/ledgerleapllc/devxdao-backend

This project also has the following portal repos associated with it:

Main DevxDao frontend portal: https://github.com/ledgerleapllc/devxdao-frontend

Program Management portal: https://github.com/ledgerleapllc/devxdao-pm

### Prerequesites

Relies on NodeJS version 14+

You can find documentation on NodeJS here https://github.com/nodejs/help

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Install and Deploy

First we need a server to use. Apache/Nginx

```bash
sudo apt -y install apache2
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod ssl
sudo apt-get update
```

Setup the repo according to our VHOST path. Note, the actual VHOST path in this case should be set to **/var/www/devxdao-compliance/build**

```bash
cd /var/www/
git clone https://github.com/ledgerleapllc/devxdao-compliance
cd devxdao-compliance
```

If you do not have Node installed yet, we use v14.x. Script below

```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt install nodejs -y
```

Install packages

```bash
npm install
```

You will need to modify **.env.production** and specify variables to fit the server on which you're deploying. Default domains specified are portal.devxdao.com and backend.devxdao.com.

Requires Yarn build

```bash
yarn build
```

The above commands will build to **build/** on site using the variables from your .env.production file.

### Default user/passwords

Default user/admin logins are created in the portal during initial install. 
All the default logins that are created on install are given random hash passwords that can be found printed in your backend laravel log file that will look something like this:

```
[2021-11-30 18:13:51] production.INFO:  Created <type> admin
[2021-11-30 18:13:51] production.INFO:  Email: <email>
[2021-11-30 18:13:51] production.INFO:  Password: <random_password>
```
