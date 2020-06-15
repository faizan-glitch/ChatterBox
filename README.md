# ChatterBox
A web app for realtime communication written using Socket IO that uses Nodejs as a backend and MongoDB as Database.
## Getting Started
1. Download and Install [Node.js](https://nodejs.org/en/download/)
      * Linux (Ubuntu based distros)
      ```console
        sudo apt-get install curl
        curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
        sudo apt-get install nodejs
      ```
2. Clone the [Github Repo](https://github.com/faizan-glitch/ChatterBox.git)
  ```properties
  git clone https://github.com/faizan-glitch/ChatterBox.git
  ```
3. Go into the local copy of the repo.
### Installing Dependencies
Type the following command in the terminal
 ```properties
 npm install
 ```
### Setting the App Key
1. Go to **config** folder.
2. Replace the **keys.example.js** with the **keys.js** file. 
### Configuring the Gmail Account to send emails
By default Google considers third party apps using its services as **"Less Secure"** apps. And doesn't allow access to them. 
To give access to this app.
1. Go into the account settings of the gmail account you used in the keys.js
2. On the `Settings` page, click on `Security`.
3. Scroll down till `Less secure app access`.
4. Turn it On.
### Running the app
  * Development environment
    ```properties
    npm run dev
    ```
  * Production environment
    ```properties
    npm start
    ```
The app should now be running.
