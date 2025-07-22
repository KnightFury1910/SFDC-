import { LightningElement } from 'lwc';

export default class BookCards extends LightningElement {
    books = [
        {
            id: 1,
            title: 'The Alchemist',
            author: 'Paulo Coelho',
            genre: 'Fiction',
            price: '$12.99',
            email: 'paulo@example.com'
        },
        {
            id: 2,
            title: 'Sapiens',
            author: 'Yuval Noah Harari',
            genre: 'History',
            price: '$15.50',
            email: 'yuval@example.com'
        },
        {
            id: 3,
            title: 'Atomic Habits',
            author: 'James Clear',
            genre: 'Self-help',
            price: '$10.00',
            email: 'james@example.com'
        },
        {
            id: 4,
            title: 'Clean Code',
            author: 'Robert C. Martin',
            genre: 'Programming',
            price: '$18.75',
            email: 'unclebob@example.com'
        },
        {
            id: 5,
            title: 'The Power of Now',
            author: 'Eckhart Tolle',
            genre: 'Spirituality',
            price: '$14.20',
            email: 'eckhart@example.com'
        }
    ];
}