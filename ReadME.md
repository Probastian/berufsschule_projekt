Projekt Setup:
 [1] Clone from GitHub: https://github.com/Probastian/berufsschule_projekt.git

 [2] Set-Up Database: 
    From project root call: 'mysql -u username -p < database/narc_dump.sql'
    Depending on whether windows is the '/' must be '\'

 [3] install all npm dependencies:
    [3.1] call npm install in the server folder
    [3.2] call npm install in the client folder

 [4] run the development build
    [4.1] run 'npm start' in the server folder 
            -> should be started on localhost:3000
    [4.2] run 'npm start' in the client folder 
            -> should be started on localhost:4200 and proxy to localhost:3000 for data requests