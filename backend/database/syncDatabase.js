const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const SQL_FILE_PATH = path.join(__dirname, 'property_hub.sql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_user',
    password: 'your_password',
    database: 'your_database',
    multipleStatements: true,
});

async function syncDatabase() {
    const createdObjects = {
        tables: [],
        procedures: [],
        functions: [],
        events: [],
    };

    const connection = await pool.getConnection();
    try {
        console.log('🔄 Starting database sync...');
        const sqlScript = fs.readFileSync(SQL_FILE_PATH, 'utf8');

        const statements = sqlScript
            .split(/;\s*[\r\n]/)
            .map((stmt) => stmt.trim())
            .filter(Boolean);

        await connection.beginTransaction(); // DML rollback only

        for (const stmt of statements) {
            const normalized = stmt.toUpperCase();

            if (normalized.startsWith('CREATE TABLE')) {
                const tableName = stmt.match(/CREATE TABLE IF NOT EXISTS `?(\w+)`?/i)?.[1];
                if (tableName) {
                    const [rows] = await connection.query(`SHOW TABLES LIKE '${tableName}'`);
                    if (rows.length === 0) {
                        await connection.query(stmt);
                        createdObjects.tables.push(tableName);
                        console.log(`✅ Created table: ${tableName}`);
                    }
                }
            } else if (normalized.startsWith('CREATE PROCEDURE')) {
                const procName = stmt.match(/CREATE PROCEDURE `?(\w+)`?/i)?.[1];
                if (procName) {
                    const [rows] = await connection.query(`SHOW PROCEDURE STATUS WHERE Name = '${procName}'`);
                    if (rows.length === 0) {
                        await connection.query(stmt);
                        createdObjects.procedures.push(procName);
                        console.log(`✅ Created procedure: ${procName}`);
                    }
                }
            } else if (normalized.startsWith('CREATE FUNCTION')) {
                const funcName = stmt.match(/CREATE FUNCTION `?(\w+)`?/i)?.[1];
                if (funcName) {
                    const [rows] = await connection.query(`SHOW FUNCTION STATUS WHERE Name = '${funcName}'`);
                    if (rows.length === 0) {
                        await connection.query(stmt);
                        createdObjects.functions.push(funcName);
                        console.log(`✅ Created function: ${funcName}`);
                    }
                }
            } else if (normalized.startsWith('CREATE EVENT')) {
                const eventName = stmt.match(/CREATE EVENT `?(\w+)`?/i)?.[1];
                if (eventName) {
                    const [rows] = await connection.query(`SHOW EVENTS WHERE Name = '${eventName}'`);
                    if (rows.length === 0) {
                        await connection.query(stmt);
                        createdObjects.events.push(eventName);
                        console.log(`✅ Created event: ${eventName}`);
                    }
                }
            } else {
                // Assume this is DML (INSERT etc.)
                await connection.query(stmt);
                console.log(`➡️ Executed DML statement.`);
            }
        }

        await connection.commit();
        console.log('✅ Database sync complete.');

    } catch (error) {
        console.error('❌ Error occurred, rolling back...', error.message);
        try {
            await connection.rollback();
            console.log('↩️ Rolled back DML changes.');
        } catch (rollbackErr) {
            console.error('⚠️ Rollback failed:', rollbackErr.message);
        }

        // Simulated rollback for DDL
        for (const table of createdObjects.tables) {
            await connection.query(`DROP TABLE IF EXISTS \`${table}\``);
            console.log(`🗑️ Dropped table: ${table}`);
        }
        for (const proc of createdObjects.procedures) {
            await connection.query(`DROP PROCEDURE IF EXISTS \`${proc}\``);
            console.log(`🗑️ Dropped procedure: ${proc}`);
        }
        for (const func of createdObjects.functions) {
            await connection.query(`DROP FUNCTION IF EXISTS \`${func}\``);
            console.log(`🗑️ Dropped function: ${func}`);
        }
        for (const event of createdObjects.events) {
            await connection.query(`DROP EVENT IF EXISTS \`${event}\``);
            console.log(`🗑️ Dropped event: ${event}`);
        }

        console.error('❌ Database sync failed. Rollback completed.');
    } finally {
        connection.release();
    }
}

module.exports = syncDatabase;
