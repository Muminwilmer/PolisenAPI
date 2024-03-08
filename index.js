const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory at the root
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
