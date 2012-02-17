This script uses the POSLavu web API to grab all the rows from the database tables, then converts them from XML to CSV for trending, etc.

You need to be running an environment that uses Windows Scripting Host.

--> 1. Run setCScript.bat to set the correct interpreter for Windows.
       (default using WScript)

    2. Close all instances of Excel with these files loaded in them.
       Otherwise you will not have file access permission.

--> 3. Run getOrderContents.js

    4. Your CSV files are now ready.

Note:
Edit bottom lines of getOrderContents.js to change which tables to generate CSVs from. I've only included "orders" and "order_contents", you may want others. 
Refer to API doc at http://admin.poslavu.com/cp/areas/api_doc.html for a list of valid tables.

Also:
Please edit the dataname, token and key values. I've omitted them from the code due to making the repo public. Thanks.