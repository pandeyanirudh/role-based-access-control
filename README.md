# Role Based Access Control
Role-Based Access Control (RBAC) is a security model that regulates access to computer systems and resources based on the roles of individual users within an organization or system. RBAC ensures that only authorized users can perform specific actions on the system, based on their designated roles.

# Clone the repository
git clone https://github.com/pandeyanirudh/role-based-access-control.git

# Navigate into the project folder
cd rbac

# Install dependencies
1. install vs code
2. install nodejs
3. npm install npm install bcryptjs cookie-parser dotenv express helmet jsonwebtoken mongodb mongoose morgan nodemon

# Start the development server:
npm run dev

# Test the APIs
Use Postman or Apidog to test the endpoints.
eg. POST - http://localhost:1010/api/register

# Results
Register - 
![Register result Screenshot](https://github.com/pandeyanirudh/role-based-access-control/blob/main/result/register.png)

Login -
![Login result Screenshot](https://github.com/pandeyanirudh/role-based-access-control/blob/main/result/login.png)

Logout - 
![Logout result Screenshot](https://github.com/pandeyanirudh/role-based-access-control/blob/main/result/logout.png)

getUser - 
![get user result Screenshot](https://github.com/pandeyanirudh/role-based-access-control/blob/main/result/get-profile.png)

getAllUser - 
![all user detail result Screenshot](https://github.com/pandeyanirudh/role-based-access-control/blob/main/result/get-all-user.png)

change role - 
![change role result Screenshot](https://github.com/pandeyanirudh/role-based-access-control/blob/main/result/change-role.png)

# Summary
Role-Based Access Control is integral to managing user access in a secure, organized, and scalable way. It helps mitigate risks associated with unauthorized access, improves operational efficiency, and ensures compliance with best practices for securing resources. By using RBAC in this project, we ensure that each user interacts with the project in a controlled and predictable manner, according to their needs and responsibilities.
