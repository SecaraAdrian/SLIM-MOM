exports.getDailyKcal = (req, res) => {
    res.json({
        dailyKcal: 2000,
        notRecommended: ['Sugar', 'Fried Food', 'Soda'],
    });
};

exports.getPrivateDailyKcal = (req, res) => {
    res.json({
        dailyKcal: 1800,
        personalizedMessage: `Hello, user ${req.user.id}!`,
    });
};
