const db = require('better-sqlite3')('proj.db');

function run(name) {
    try {
        const row = db.prepare('SELECT auth_name, code FROM projected_crs WHERE name = ?').get(name);

        if (row) {
            return {
                authority: row.auth_name || '',
                code: row.code || '0'
            }
        } else {
            return {
                authority: '',
                code: '0'
            }
        }

    } catch (_error) {
        return {
            authority: '',
            code: '0'
        }
    }
}

exports.handler = async (event) => {
    const result = run(event.name)

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
};
