module.exports = {
    plugins: [
        require('postcss-inline-svg')(),
        require('postcss-svgo'),
        require('autoprefixer')({
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ]
        })
    ]
};
