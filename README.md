# HealthConnect
A smart interactive solution that connects patients to doctors and increases efficiency in healthcare services

### Team Members
 * Vanessa Chu
 * Yu Li
 * Akanksha Nilosey
 * Suyash Soumya

For more information, please view our [wiki](https://github.com/vchu22/HealthConnect/wiki) page.
***
## Getting Started
To start using this web application, simply open a terminal (or PowerShell on Windows, alternatively, you can use [Git Bash](https://git-scm.com/downloads)) and cd into a directory where you want to store this repo
```
cd /path-to-store-this-repo/
```
Then, type in this to download the code of this repo
```
git clone https://github.com/vchu22/HealthConnect.git
```
Before you can run the server, you need to edit the `.env` file in order to connect to your database. (You will need to create your own database according to [this schema](https://github.com/vchu22/HealthConnect/blob/master/wiki/Database%20ER%20Diagram.png). Use a SQL file in the [db folder](https://github.com/vchu22/HealthConnect/tree/master/db) to setup your database.)

After that, type in the command below to start the server
```
npm start
```
Now, open up a browser and type in `localhost:3000` in the address bar. You should be able to see the homepage
