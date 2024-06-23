# Project Setup Instructions

## Frontend Setup

1. **Clone the repository** and navigate to the frontend directory:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment variables**:
   - Create a new file named `.env.local` in the `frontend` directory.
   - Add the following variables to the `.env.local` file:
     ```env
     MONGODB_URI=<your-mongodb-uri>
     NEXTAUTH_SECRET=<your-nextauth-secret>
     ```
     Replace `<your-mongodb-uri>` with your MongoDB connection string and `<your-nextauth-secret>` with your secret key (e.g., `12345678`).

4. **Frontend setup is complete**.

## Backend Setup

1. **Navigate to the backend directory** from the root of the project:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment variables**:
   - Create a new file named `.env` in the `backend` directory.
   - Add the following variable to the `.env` file:
     ```env
     MONGO_URI=<your-mongodb-uri>
     ```
     Replace `<your-mongodb-uri>` with the same MongoDB connection string used in the frontend setup.

4. **Run the backend application**:
   ```bash
   node app
   ```

## Contribution

All done! You have set up everything. Feel free to contribute or suggest any improvements! 🎉🚀

 