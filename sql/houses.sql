DROP TABLE IF EXISTS houses;


CREATE TABLE houses(
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL UNIQUE REFERENCES users(id),
    house_name VARCHAR(300),
    description VARCHAR(500),
    space INT NOT NULL,
    address VARCHAR(300),
    postcode VARCHAR(300),
    photo VARCHAR(300)
);

SELECT * FROM houses;
