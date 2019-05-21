const spicedPg = require("spiced-pg");

let secrets;

if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets"); // secrets.json is in .gitignore
}

const dbUrl = secrets.dbUrl;

const db = spicedPg(process.env.DATABASE_URL || dbUrl);

exports.createUser = (first, last, email, password) => {
    const q = `
    INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id
    `;
    return db.query(q, [
        first || null,
        last || null,
        email || null,
        password || null
    ]);
};

exports.returnPassword = email => {
    const q = `
        SELECT password, id
        FROM users
        WHERE email = ($1);

    `;
    return db.query(q, [email]);
};

exports.getUserInfo = (userId) => {
    const q = `
    SELECT id, first, last, email, bio, profession, photo_url
    FROM users
    WHERE id = ($1);
    `;
    return db.query(q, [userId]);
};

// =========== Update User Profile =========== //

exports.updateUserProfile = (userId, first, last, bio, profession) => {
    const q = `
    UPDATE users
    SET first = $2, last = $3, bio = $4, profession = $5
    WHERE id = $1
    RETURNING id, first, last, email, bio, profession, photo_url
    `;
    return db.query(q, [userId, first, last, bio, profession]);
};

// ========== Get House Profile ========== //

exports.getHouseProfile = (userId) => {
    const q = `
    SELECT id, house_name, description, space, address, postcode, photo
    FROM houses
    WHERE userId = ($1);
    `;
    return db.query(q, [userId]);
};

// ======== INSERT HOUSE INFO ============ //

exports.updateHouseProfile = (userId, house_name, description, space, address, postcode) => {
    const q = `
    INSERT INTO houses (userId, house_name, description, space, address, postcode)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (userId)
    DO UPDATE SET house_name = $2, description = $3, space = $4, address = $5, postcode = $6
    RETURNING id, house_name, description, space, address, postcode, photo
    `;
    return db.query(q, [userId, house_name, description, space, address, postcode]);
};


// ============= CREATE EVENT ============== ============= //

exports.createEvent = (userId, houseId, eventDate) => {
    const q = `
    INSERT INTO events (userId, houseId, eventDate)
    VALUES ($1, $2, $3)
    RETURNING id, eventDate, houseId
    `;
    return db.query(q, [userId, houseId, eventDate]);
};

// ================ GET EVENTS CREATED =========== //

exports.getEventsCreated = (userId) => {
    const q = `
    SELECT *
    FROM events
    WHERE userId = ($1);
    `;
    return db.query(q, [userId]);
};

// =============== DELETE EVENT =============== //

exports.deleteEvent = (eventId) => {
    const q = `
    DELETE FROM events
    WHERE (id = $1);
    `;
    return db.query(q, [eventId]);
};

// ============= GET EVENTS BY DATE ============== //

exports.getEventsByDate = (date) => {
    const q = `
    SELECT houses.id as houseId, eventDate, house_name, description, space, address, postcode, photo, events.id as eventId
    FROM events
    JOIN houses
    ON events.houseId = houses.id
    WHERE (eventDate = $1)
    `;

    return db.query(q, [date]);
};

// ========================

exports.getAllEvents = () => {
    const q = `
    SELECT houses.id as houseId, eventDate, house_name, description, space, address, postcode, photo, events.id as eventId
    FROM events
    JOIN houses
    ON events.houseId = houses.id
    `;

    return db.query(q);
};

//====== UPLOAD IMAGE ==============

exports.updateProfileImage = (image_url, id) => {
    const q = `
    UPDATE users
    SET photo_url = $1
    WHERE id = $2
    RETURNING id, first, last, email, bio, profession, photo_url
    `;
    return db.query(q, [image_url, id]);
};

// ============= UPLOAD IMAGE FOR HOUSE  =============

exports.updateHouseImage = (image_url, id) => {
    const q = `
    UPDATE houses
    SET photo = $1
    WHERE userId = $2
    RETURNING id, house_name, description, space, address, postcode, photo
    `;
    return db.query(q, [image_url, id]);
};


// ===================

// WHERE userId = $1
