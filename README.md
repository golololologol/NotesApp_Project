# NotesApp_Project
UNIVERSITY ASSIGNMENT
## Steps to Get It Running

### **Backend Setup**
1. Use Visual Studio 2022 with the .NET 8 SDK.
2. Go into `backend` folder, and open `NotesAPI.csproj` using Visual Studio.
3. **Install Required NuGet Packages:**
   - `Microsoft.AspNetCore.Identity.EntityFrameworkCore 8.0.14`
   - `Microsoft.EntityFrameworkCore.SqlServer 8.0.14`
   - `Microsoft.AspNetCore.Authentication.JwtBearer 8.0.14`
4. **Configure the Database:**
   - Update the connection string in **appsettings.json**.
   - Open the Package Manager Console and run:
     - `Add-Migration Initial`
     - `Update-Database`
5. **Run the API:**
   - Run the project by ensuring the launch configuration is set to `https` and then press the green "Run" arrow above.
   - The API should be available at `https://localhost:5001/api` and `http://localhost:5000/api`.

### **Frontend Setup**
1. Go into `frontend` folder.
2. **Install Additional Packages:**
   - Run: `npm install axios react-router-dom bootstrap`
3. **Run the React App:**
   - In the terminal, run: `npm start`
   - The frontend should launch.

### **Using the Application**
- **Registration/Login:**  
  Open the app and use the **Register** or **Login** page to create an account or log in. Upon success, a JWT token (valid for 1 hour) is stored in localStorage.
- **Notes Management:**  
  Once authenticated, the **Notes** page is accessible. You can create new notes, view a paginated list, edit or delete notes, and use the search bar to filter by title and creation date.
