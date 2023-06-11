Deployment:
Quick Picks is deployed and can be accessed at https://quick-picx.netlify.app/. Feel free to explore the live version of the application.

Quick Picks:
Quick Picks is a React application that allows users to browse movies, get movie recommendations based on factors such as mood, time of day, occassion and more. 

Key Features:

Personalized Recommendations: Quick Picks offers users personalized movie recommendations. The algorithm considers factors such as user mood, time of day, and occasion to provide the most suitable movie suggestions.

Streaming Availability: Integrated with the Streamline API, Quick Picks displays the availability of each movie on various streaming platforms. This allows users to easily find and watch their preferred movies.

Data Visualization: Quick Picks provides insights to users through charts and graphs, displaying data like top 5 actors and popular genres. This feature enhances user engagement and provides a visually interactive experience.

Roulette Feature: Quick Picks includes a movie roulette feature where users can create a list of their favorite movies. The app then picks a movie at random from this list, adding an element of surprise and fun to the movie selection process.

To run the application on your local machine, please follow the instructions below.

Prerequisites:
Before you can run Quick Picks, you must have MySQL server installed and running on your machine. You will also need to edit the .env file to add your SQL password, and username.

Installation:
To install the necessary dependencies, open your terminal and navigate to the root directory of the project. Then, enter the following command:

"npm install"

This will install all the required packages and modules.

Seed Database
Quick Picks requires a MySQL database with some pre-populated data in order to function properly. To create and populate the database with seed data, run the following command:

"node seeds.js"
This will create the necessary tables and populate them with sample data.

Running the Application
To start the application, navigate to the root directory of the project and enter the following command:

"npm start"
This will start the development server and open the application in your default browser.

Note: If you are using Node version above 16 then in the package.json in the client folder, change the line

"start": "react-scripts start"

to 

"start": "react-scripts --openssl-legacy-provider start"
