Feature: OrangeHRM Authentication and User Management


TC1 - Successful Login 
When the user enters username "Admin" and password "admin123"
And clicks the login button
Then the user should be redirected to the "Dashboard"
And the Dashboard heading should be visible

TC2 - Login Failure with Invalid Credentials 
When the user enters username "WrongUser" and password "WrongPass"
And clicks the login button
Then an error message "Invalid credentials" should be displayed

TC3 - Successful Logout 
Given the user is logged into the system
When the user clicks on the user dropdown menu
And selects "Logout"
Then the user should be redirected back to the login page

TC4 - Forgot Password Redirection 
When the user clicks on the "Forgot your password?" link
Then the user should be taken to the "Reset Password" page

TC5 - Add New Employee 
Given the user is logged into the system
And navigates to the "PIM" module
When the user adds a new employee with first name "Tony" and last name "Stark"
Then the employee record should be created successfully
And the "Personal Details" screen should be visible

TC6 - Search for an Employee 
Given the user is logged into the system
And navigates to the "PIM" module
When the user searches for an employee named "Tony"
Then the employee record should appear in the results table

TC7 - Search System User in Admin Module 
Given the user is logged into the system
And navigates to the "Admin" module
When the user searches for the username "Admin"
Then the table should display the record for "Admin"

TC8 - Sidebar Responsive Toggle 
Given the user is logged into the system
When the user clicks the sidebar toggle button
Then the side navigation panel should collapse or expand

TC9 - Login Page Mobile Responsiveness 
When the user accesses the site via a mobile viewport
Then the login button should be visible and clickable without horizontal scrolling