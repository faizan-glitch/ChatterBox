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

 ## Project Structure
