module.exports = function (webpackEnv) {
    return {
        resolve: {
            fallback: { "path": false,
                        "crypto": false
    
            }
        }
    }
}