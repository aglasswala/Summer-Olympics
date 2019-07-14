Summer Olympics Software Engineering II Final Project 

Project Description

The goal of the project is to create an application that can:
  - Create and sell tickets to the general public
  - Competing athletes should be notified about when and where about their event 
  - Security department should be notified to have staff ready for each event
  - Medal Ceremonies should also be scheduled 

Tickets can either be free or full cost for the athletes/employees. Event schedule should not confict with other events, such as medal ceremonies/autograph signing.
If an event's timing or location is changed, all the tickets should be updated with the correct time, and atheletes should be notified of the change. 
Tickets are also only sold at competition events. 

To install:
  1. Download both repos - Summer-Olympics and Summer-Olympics-Server
  2. npm install both and set up the env variables 
  3. Create the connection to the database (PostgreSQL)
  4. Register a new user and change the register type to create new athletes/employees. 

Visit the live Summer-Olympics:
  https://aglasswala.github.io/Summer-Olympics/#/ 
  
  - Log in with bolt@gmail.com (Password: 123) for athlete
  - Log in with public@gmail.com (Password: 123) for public 
  - Log in with employee@gmail.com (Password: 123) for employee
  - Once you hit login, it may take a second to wake up the dyno server on Heroku

Feel free to leave an suggestions/comments via pull requests/issues. 