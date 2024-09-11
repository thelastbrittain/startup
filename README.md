# Pyramid Startup
A repository to hold a personal website
Here are my [Notes](https://github.com/thelastbrittain/startup/blob/main/notes.md)

## Elevator Pitch
After a year or so of climbing, most climbers feel that they are beginning to plateau. They don’t understand that they will not climb a harder grade every session, and they fail to track their progress. The climbing pyramid theory is that to climb a route ranked 1 grade harder, you must climb 2-3 routes that are 1 grade easier. If you log every climb you’ve ever done, the results appear like a pyramid, with a high quantity of easier climbs as the base and a few, harder routes forming the top. This application helps people track the routes they have climbed and displays their efforts in a pyramid, showing them the progress they really are making. 

## Design


## Technologies
- HTML - Uses correct HTML structure for application. 5 HTML pages. One for login, one for submitting a climb, one for viewing your pyramid, one for viewing list of other people who have posted a pyramid, one About page
- CSS - Use for styling, color choice, and resizing based on color choice
- JavaScript - Handles login, adding a climb, properly displaying the pyramid, properly displaying other users, and backend endpoint calls.
- React - Single page application utilizing React Router to connect pages and dynamically display data. 
- Service - Backend service with endpoints for:
- - Submitting a route
- - Retrieving other user’s pyramid
- - Showing stock climbing images after submitting a climb (Pexels)
- DB/Login - Store account credentials and personal pyramids. Authentication required to create personal pyramid
- WebSocket - When a user submits a climb, their pyramid is updated for everyone

