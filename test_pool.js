const { Pool } = require('@neondatabase/serverless');
const ws = require('ws');
const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_ZxCRDf4Qo2iN@ep-ancient-rain-ao796qwa-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  webSocketConstructor: ws
});

console.log("Pool options:", pool.options);

pool.connect((err, client, done) => {
  if (err) {
    console.error("Connect error:", err);
  } else {
    console.log("Connected successfully!");
    done();
  }
  process.exit();
});
