# FileManagerReactASP

**FileManagerReactASP** is a web-based file management application developed using React.js for the frontend and ASP.NET Core for the backend. This application allows users to manage their files efficiently with a modern and responsive user interface.

## Features

- **User Authentication**: Secure login and registration functionality.
- **File Upload/Download**: Easy upload and download of files.
- **File Organization**: Create, rename, and delete folders to organize files.
- **File Previews**: View previews of supported file types.
- **Search Functionality**: Search files and folders quickly.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React.js, HTML5, CSS3
- **Backend**: ASP.NET Core
- **Database**: SQL Server
- **Version Control**: Git
- **Deployment**: Docker, Kubernetes

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/enesscigdem/FileOrbisReact_Web.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd FileOrbisReact_Web
    ```
3. **Install frontend dependencies:**
    ```bash
    cd client
    npm install
    ```
4. **Install backend dependencies:**
    ```bash
    cd ../server
    dotnet restore
    ```
5. **Configure the database connection:**
   - Update the `appsettings.json` file in the `server` directory with your SQL Server connection string.

6. **Run the application:**
    ```bash
    cd server
    dotnet run
    ```

7. **Run the frontend application:**
    ```bash
    cd ../client
    npm start
    ```

## Usage

1. **Open your browser and navigate to** `http://localhost:3000`.
2. **Register or login** to your account.
3. **Start managing your files** using the intuitive user interface.

## Contributing

We welcome contributions to enhance the functionality and user experience of FileManagerReactASP. Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact [Enes Çiğdem] at [enescigdeem@gmail.com].
