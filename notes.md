# EC2 Instance
- **IP Address** - http://34.203.64.180 
- **SSH Command** -- ssh -i /Users/benjaminbrittain/Desktop/CS260/260KeyPair/260-webserver-keypair.pem ubuntu@34.203.64.180 
- **Deployment Command** ./deployFiles.sh -k ../260KeyPair/260-webserver-keypair.pem -h 34.203.64.180 -s pyramid


# Midterm Questions:

**HTML AND CSS**
What does the <link> element do?
--It links external resources (like CSS files) to an HTML document.

What does a <div> tag do?
--It defines a generic container for grouping content, with no default styling.

What is the difference between #title and .grid selector?
--#title selects an element with the ID title.
.grid selects all elements with the class grid.

What is the difference between padding and margin?
--Padding: Space inside an element’s border.
Margin: Space outside the element, separating it from others.

How will the images be displayed using flex?
--Images will align based on the flex container’s settings, such as justify-content and align-items. Example: row or column layout.

What does the following padding CSS do?
--Example: padding: 10px 20px; sets 10px padding for top and bottom, 20px for left and right.


**JavaScript Code**
What does the arrow syntax function declaration do?
--Example: (x) => x * 2 declares an anonymous function that returns the parameter x multiplied by 2.

What does the following code using map with an array output?
--Example: [1, 2, 3].map(x => x * 2) outputs [2, 4, 6].

What does the code using getElementById and addEventListener do?
--Adds an event listener to an element, triggering a function when the event occurs.

What does the # selector in JavaScript do?
--Selects an element by ID (e.g., document.querySelector('#myId')).

**HTML and CSS Specifics**
Which of the following are true about the DOM?
--The DOM represents the HTML document as a tree structure, allowing JavaScript to manipulate it.

Default CSS display property of <span>?
--Inline (display: inline).
The <span> element is an inline HTML element used to apply styling or behaviors to specific parts of text or content within a 
larger block, without breaking the flow of that content. It doesn't have any inherent meaning or styling by default, but with 
CSS, you can transform it visually and behaviorally.

How would you change all <div> elements to have a red background using CSS?
--Example: div { background-color: red; }

How to display an image with a hyperlink in HTML?
--<a href="https://example.com"><img src="image.jpg" alt="example"></a>

CSS Box Model: Order of box layers from inside to outside?
--Content → Padding → Border → Margin

How to set the word "trouble" green in CSS without affecting "double"?
html
<span class="green">trouble</span>double
css
.green { color: green; }

**JavaScript Logic**
What will the following code output in a for loop with console.log?
Example:
for (let i = 0; i < 3; i++) console.log(i);
--Output:
0  
1  
2  

How to select an element by ID and change its text color to green in JavaScript?
document.getElementById('byu').style.color = 'green';
Opening HTML tags for paragraph, lists, and headings?
--<p>, <ol>, <ul>, <h2>, <h1>, <h3>

How do you declare the document type in HTML?
--<!DOCTYPE html>

Valid JavaScript syntax for control structures?
if (x) {...} else {...}  
for (let i = 0; i < n; i++) {...}  
while (condition) {...}  
switch (x) { case 1: ...; break; }

Correct syntax for a JavaScript object?
const obj = { key: 'value', anotherKey: 42 };

Can you add new properties to JavaScript objects?
--Yes, e.g., obj.newKey = 'newValue';

Tag to include JavaScript in HTML?
--<script src="script.js"></script>

How to change "animal" to "crow" without affecting "fish"?

<span id="animal">animal</span> <span>fish</span>
document.getElementById('animal').textContent = 'crow';

What describes JSON?
--JSON is a lightweight data format for structured data, using key-value pairs.

**Command Line Tools**
What do chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo do?
chmod: Change permissions
pwd: Print current directory
cd: Change directory
ls: List files
vim/nano: Text editors
mkdir: Make directory
mv: Move/rename files
rm: Remove files/directories
man: Display manual pages
ssh: Remote login
ps: List processes
wget: Download files
sudo: Run as superuser

Which command creates a remote shell session?
--ssh

What does ls -la show?
--Lists all files (including hidden) with detailed permissions and metadata.

Domain hierarchy of banana.fruit.bozo.click?
Top-level domain: .click
Subdomain: banana
Root domain: fruit.bozo.click

Is a web certificate necessary for HTTPS?
--Yes

Can a DNS A record point to another A record or IP?
--Only to an IP address, not another A record.

Port assignments for 443, 80, and 22?
443: HTTPS
80: HTTP
22: SSH

**JavaScript Promises**
--new Promise((resolve) => resolve(42)).then(console.log); # output = 42

The execution of a promise allows the main rendering thread to continue while some action is executed in the background. 
You create a promise by calling the Promise object constructor and passing it an executor function that runs the asynchronous operation.
 Executing asynchronously means that promise constructor may return before the promise executor function runs. The state of the promise execution is always in one of three possible states.

pending - Currently running asynchronously
fulfilled - Completed successfully
rejected - Failed to complete



justify content vs Align content:

Justify-content
Justify-content operates along the main axis of the flex container, which is typically horizontal for row-based 
layouts and vertical for column-based layouts13. It controls how flex items are distributed within the container along 
this main axis.
Key features:
Aligns items horizontally by default (in row-based layouts)
Offers values like flex-start, flex-end, center, space-between, space-around, and space-evenly
Useful for controlling horizontal spacing between items
Align-content
Align-content, on the other hand, operates along the cross axis of the flex container, which is perpendicular 
to the main axis13. It controls how multiple lines of flex items are distributed within the container along the cross axis.
Key features:
Aligns items vertically by default (in row-based layouts)
Offers values like flex-start, flex-end, center, stretch, space-between, and space-around
Useful for controlling vertical spacing between multiple lines of flex items
Important distinctions:
Axis of operation: Justify-content works on the main axis, while align-content works on the cross axis13.
Single vs. multiple lines: Justify-content affects the distribution of items within a single line, whereas align-content affects the distribution of multiple lines of items3.
Default behavior: Justify-content has a default value of flex-start, while align-content defaults to stretch3.
Flexibility: Justify-content offers more options for distributing space between items, including space-evenly, which 
is not available for align-content1.
To use these properties effectively, it's crucial to understand the flex container's main and cross axes, which can change based
 on the flex-direction property. By combining justify-content and align-content, you can achieve precise control over the layout 
 and spacing of flex items in both directions within your flex container.



 Proj: Got to instlaling react router dom. INstalled bootstrap, but haven't imported it into any files. 


# Final Questions:

What is the default port for HTTP/HTTPS/SSH?
HTTP: 80
HTTPS: 443
SSH: 22


What does an HTTP status code in the range of 300/400/500 indicate?
300: Redirection
400: Client error
500: Server error


What does the HTTP header content-type allow you to do?
Specifies media type of the resource


What does a “Secure cookie”/”Http-only cookie”/”Same-site cookie” do?
Secure: Sent over HTTPS only
HttpOnly: Inaccessible via JavaScript
SameSite: Restricts cross-site requests


Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /api/document?
Logs: Request URL and Request Type


Given the following Express service code: What does the following front end JavaScript that performs a fetch return?
Returns a promise resolving to a response object


Given the following MongoDB query, select all of the matching documents {name:Mark}
Query: db.collection.find({name: "Mark"})


How should user passwords be stored?
Use cryptographic hashes with salts (e.g., bcrypt)


Assuming the following node.js websocket code in the back end, and the following front end websocket code, what will the front end log to the console?
Logs messages exchanged over WebSocket


What is the websocket protocol intended to provide?
Full-duplex communication over a single TCP connection


What do the following acronyms stand for? JSX, JS, AWS, NPM, NVM
JSX: JavaScript XML
JS: JavaScript
AWS: Amazon Web Services
NPM: Node Package Manager
NVM: Node Version Manager


Assuming an HTML document with a body element. What text content will the following React component generate? The react component will use parameters.
Depends on component logic and parameters


Given a set of React components that include each other, what will be generated?
Rendered output based on component hierarchy and props


What does a React component with React.useState do?
Manages state in functional components


What are React Hooks used for?
Enable state and side effects in functional components


What does the State Hook/Context Hook/Ref Hook/Effect Hook/Performance Hook do?
State Hook: Manages state
Context Hook: Accesses context data
Ref Hook: References DOM elements or values across renders
Effect Hook: Handles side effects like data fetching


Given React Router code, select statements that are true.
Depends on specific code and routing logic


What does the package.json file do?
Defines project metadata, scripts, and dependencies


What does the fetch function do?
Performs network requests and handles responses asynchronously


What does node.js do?
Executes JavaScript on server side


What does pm2 do?
Manages Node.js application processes


What does Vite do?
Provides fast development server and optimized builds
