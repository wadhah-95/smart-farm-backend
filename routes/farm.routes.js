const express = require('express');
const router = express.Router();

router.put('/farms/:id', (req, res) => {
    res.json({ message: "Farm updated successfully" });
});

module.exports = router;