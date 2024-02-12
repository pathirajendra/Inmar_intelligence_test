<h3>Database Setup</h3>

Choose SQL Server and create database<br>
<b>Download code from repository</b><br>
Run all the .sql files from dbScripts folder using SQL Management Studio<br>
It will create required tables and inserts data to respective tables

<h3>Code Setup</h3>
Open the src folder from Visual Studio Code<br>
Open Terminal then install node modules with command `npm install`<br>
Once the above command finished the execution, run command `npm run start` to run backend api<br>


Open Postman, then request the resouce `http://localhost:3000/api/v1/location`, you will see all the meta data

<h3>Implemented Features</h3>
  a.  Async/Await <br>
  b.  Promises<br>
  c.  Exception Handling<br>
  d.  Input validations with Joi Library<br>
  e.  Logging with log4js<br>
  f.  Data from one table & multiple tables
