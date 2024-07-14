create table users(
    user_id serial primary key,
    name varchar(255) not null,
    email varchar(255) unique not null,
    password varchar(255) not null,
);

create table posts(
    post_id serial primary key,
    author_id int,
    title varchar(255),
    content text,
    create_at timestamp,
    constraint author_id foreign key(author_id) references users(user_id) on delete cascade on update cascade
);

create table user_token(
    token_id serial primary key,
    token varchar(255),
    fk_user int,
    constraint fk_user foreign key(fk_user) references users(user_id) on delete cascade on update cascade
);