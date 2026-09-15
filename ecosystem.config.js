module.exports = {
  apps: [
    {
      name: 'code-grid-api',
      script: 'dist/src/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
