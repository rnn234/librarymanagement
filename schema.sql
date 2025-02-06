CREATE TABLE members (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE books (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    stock INT NOT NULL CHECK (stock >= 0)
);

CREATE TABLE borrowings (
    id UUID PRIMARY KEY,
    member_id UUID REFERENCES members(id),
    book_id UUID REFERENCES books(id),
    borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP,
    status VARCHAR(10) CHECK (status IN ('BORROWED', 'RETURNED')) NOT NULL
);
