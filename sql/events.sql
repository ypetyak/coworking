DROP TABLE IF EXISTS events;


CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL REFERENCES users(id),
    houseId INT NOT NULL REFERENCES houses(id),
    eventDate VARCHAR(300)
);

SELECT * FROM events;
