module.exports = Object.freeze({
    DATABASE_NAME: env('DATABASE_NAME', 'todo'),
    DATABASE_USERNAME: env('DATABASE_USERNAME', 'root'),
    DATABASE_PASSWORD: env('DATABASE_PASSWORD', ''),
    DATABASE_DRIVER: env('DATABASE_DRIVER','mongodb'),
    DATABASE_HOST: env('DATABASE_HOST', '127.0.0.1'),
    DATABASE_PORT: env('DATABASE_PORT', '27017'),
    DATABASE_LOGS: env('DATABASE_LOGS', false)
});