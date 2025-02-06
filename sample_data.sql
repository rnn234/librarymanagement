INSERT INTO members (id, name, email, phone, address) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'John Doe', 'john.doe@email.com', '081234567890', '123 Main St, City'),
('550e8400-e29b-41d4-a716-446655440001', 'Jane Smith', 'jane.smith@email.com', '081234567891', '456 Oak Ave, Town');

INSERT INTO books (id, title, author, stock) VALUES
('660e8400-e29b-41d4-a716-446655440002', 'Book One', 'Author One', 5),
('660e8400-e29b-41d4-a716-446655440003', 'Book Two', 'Author Two', 3);

INSERT INTO borrowings (id, member_id, book_id, borrow_date, status) VALUES
('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440002', NOW(), 'BORROWED');
