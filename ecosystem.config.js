module.exports = {
  apps: [
    {
      name: "Test-BasicInfo",
      script: "dist/app.js",
      instances: 1,
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
