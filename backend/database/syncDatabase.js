const fs = require('fs');
const path = require('path');
const pool = require('../lib/mySql.js');

async function syncDatabase(sqlFilePath) {
    try {
        const sql = fs.readFileSync(path.resolve(sqlFilePath), 'utf-8');

        const statements = sql
            .split(/;\s*$/m)
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0);

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            for (const statement of statements) {
                try {
                    await connection.query(statement);
                } catch (err) {
                    console.warn('Skipping failed statement:', statement);
                    console.warn(err.message);
                }
            }

            await connection.commit();
            console.log('✅ Database synced successfully.');
        } catch (err) {
            await connection.rollback();
            console.error('❌ Failed to sync database. Rolled back.');
            console.error(err.message);
        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('❌ Error during database sync:', err.message);
    }
}

module.exports = syncDatabase;
