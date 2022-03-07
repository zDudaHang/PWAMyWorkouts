CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL
);

CREATE TABLE followers (
    followed_user_id INT,
    follower_user_id INT,
    PRIMARY KEY (followed_user_id, follower_user_id),
    FOREIGN KEY (followed_user_id)
      REFERENCES users (id),
    FOREIGN KEY (follower_user_id)
      REFERENCES users (id)
);

CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    creator_id INT,
    title VARCHAR (50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    FOREIGN KEY (creator_id)
      REFERENCES users (id)
);

CREATE TABLE subscriptions (
    endpoint VARCHAR UNIQUE NOT NULL,
    sub_public_key VARCHAR UNIQUE NOT NULL,
    sub_private_key VARCHAR UNIQUE NOT NULL,
    sub_user_id INT,
    FOREIGN KEY (sub_user_id)
      REFERENCES users (id)
);
