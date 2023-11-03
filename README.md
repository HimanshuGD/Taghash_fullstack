

# TagHash Full stack website

Home assesment of 1 day for creating a specific task of making full stack website with given documentation.


## Technologies
- I used React for frontend
- I used Node.js/Express.js for making server 
- Postgresql for storing data
- Postman API to create and send API requests
- TablePlus for checking connection and teble


> A simple website integrated with many things
> which gives information about polls.

## Starting steps

- First create a folder for your project
- On terminal, run a code given below
```sh
npx create npx create-react-app myapp
```
- After downloading all files, go to Visual studio code and start coding
- This will be our frontend folder
- Comeback to previous project folder and again do the same
- This will be our backend folder
- But in backend folder, remove all unnecessary files and folders
- We just need one file name 'server.js' for running our server
- That server will be used to send and recieve API calls


## Creating our Database

I used Postgresql as per your order.
 Let's see
 
### Steps
- Install postgresql as given in this documentation [postgre-url]
- Read the documentation nicely [Postdoc]
- There are many steps in between, like creating database and then table and then assigning keys and values
- Connect your database to TablePlus [tableplus]
- This help us to see visually and check our table and do changes 


![alt text](/img/tableplus.png)
Using this makes our work little bit easy

## Creating our server

I used node.js/express.js for creating a server. Yeah, that's not easy, I get a lot of issues and tried to solve as many as I can.

Let's see

### Steps
- import the libraries we needed and check whether it is present in our dependencies or not
- Use this command to download the dependencies
```sh
npm install "name of dependencies u want to download"
```
- Then add details of ur database using postgresql connection pool using 'pg' library
- Now we had to add different method for requesting API calls
- As per given documentation, I assigned the endpoint and routes and different method

For checking whether the server is working or not, I used Postman API, which help us to send API requests.


![alt text](/img/postman.png)
Using postman API maybe little tricky but once I get it, it became too easy...


## Steping towards Frontend

- This is a part which is length and where I face a lot of errors
- Just 3 javasript files I made- for bar, for polling and other is helper file
- Using different inbuilt functions of react and knowledge of html and css, I tried to make a simple screen

I tried to make it good as way as possible but there were so many errors coming that I am not able to found on google too...




![alt text](/img/1.png)
This is where I was using postman for fetching data using get method
![alt text](/img/2.png)
Trying to implement post method for /vote
![alt text](/img/3.png)
This is bar graph 

There are still some errors which needed to be resolved but needed more time.
Thank you very much for giving this assesment as it showed me how much I know about development. I still need to learn a lot of things and also looking forward to meet with you guys...

# Thank you !!!


### References
- My udemy courses
- Google search and many other websites
- Documentation of every technologies
- Some youtube videos


   [Postdoc]: <https://www.postgresql.org/docs/current/>
   [postgre-url]: <https://www.postgresql.org/download/>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [tableplus]: <https://docs.tableplus.com/>
