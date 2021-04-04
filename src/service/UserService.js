const db = require('../config/db');
const helper = require('../config/helper');
const config = require('../config/config');


async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, username, last_name, first_name, age FROM user LIMIT ?,?`,
        [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function create(user) {
    const result = await db.query(
        `INSERT INTO user (username, password, last_name, first_name, age) VALUES (?, ?, ?, ?, ?)`,
        [
            user.username,
            user.password,
            user.last_name,
            user.first_name,
            user.age
        ]
    );

    let message = 'Error in creating user';

    if (result.affectedRows) {
        message = 'User created successfully';
    }

    return { message };
}

async function update(id, user) {
    const result = await db.query(
        `UPDATE user SET username=?, password=?, last_name=?, first_name=?, age=? WHERE id=?`,
        [
            user.username,
            user.password,
            user.last_name,
            user.first_name,
            user.age,
            id
        ]
    );

    let message = 'Error in updating user';

    if (result.affectedRows) {
        message = 'User updated successfully';
    }

    return { message };
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM user WHERE id=?`,
        [id]
    );

    let message = 'Error in deleting user';

    if (result.affectedRows) {
        message = 'User deleted successfully';
    }

    return { message };
}


module.exports = {
    getMultiple,
    create,
    update,
    remove
}
