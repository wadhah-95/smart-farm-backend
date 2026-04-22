exports.updateFarm = (req, res) => {
    const farmId = parseInt(req.params.id);
    const { name } = req.body;

    // simulation base de données
    const farm = { id: 1, name: "Old Farm", owner: 1 };

    const currentUserId = 1;

    if (farmId !== farm.id) {
        return res.status(404).json({ message: "Farm not found" });
    }

    if (farm.owner !== currentUserId) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    farm.name = name || farm.name;

    res.json({
        message: "Farm updated successfully",
        farm
    });
};