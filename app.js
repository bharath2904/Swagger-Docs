const express = require('express');
const app = express();
const swaggerDocs = require('./swagger');
const taskRoutes = require('./routes/task-routes');
const userRoutes = require('./routes/user-routes');
const connectToDB = require('./database/db');

app.use(express.json());
app.use('/api', taskRoutes); 
app.use('/api', userRoutes);

swaggerDocs(app);

connectToDB();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
});
