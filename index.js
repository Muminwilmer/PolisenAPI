const express = require('express');

const app = express();

// Serve static files from the 'public' directory at the root
app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
