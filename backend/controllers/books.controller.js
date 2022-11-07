import { Sequelize } from "sequelize";
import Book from "../models/books.model.js";

const sequelize = new Sequelize(
    'idealab_assignment',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

// create books route
const createBook = async (req, res) => {
    const { title, author, isbn } = req.body

    try {
        const bookExists = await Book.findOne({ where: { isbn } }).catch(err => {
            if (err) console.log("Error : ", err)
        })

        if (bookExists) {

            return res.status(400).json({
                status: 'failed',
                error: "Book with this isbn already exists"
            })

        }


        const book = Book.create({
            title: title,
            author: author,
            isbn: isbn,
        })

        console.log("the created book", book)

        res.status(200).json({
            status: 'success',
            book: book
        })

    } catch (err) {
        console.error('Unable to create book record: ', err);
    }

}


// get all books route

const getAllBooks = async (req, res) => {
    try {
        // sequelize.sync().then(() => {
        let getBooks = await Book.findAll()
        res.status(200).json({
            status: 'Success',
            getBooks
        })
        // })
    } catch (err) {
        res.status(400).json({
            status: 'Get all books Failed',
            error: err
        })
    }

}

// get single post endpoint

const getSingleBook = async (req, res) => {
    const { id } = req.params
    try {
        let getBook = await Book.findByPk(id)
        res.status(200).json({
            status: 'success',
            getBook
        })
    } catch (err) {
        res.status(400).json({
            status: ' Failed',
            error: err
        })
    }

}


// update post endpoint 

const updateBook = async (req, res) => {
    const { title, author, isbn } = req.body

    const { id } = req.params
    try {
        const updateBook = await Book.findByPk(id)


        if (title) {
            updateBook.title = title
        }
        if (author) {
            updateBook.author = author
        }

        if (isbn) {
            updateBook.isbn = isbn
        }


        const updatedBook = await updateBook.update(
            {
                title: title,
                author: author,
                isbn: isbn
            }

        );


        res.status(200).json({
            status: `You just updated post`,
            updatedBook
        })
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            error: "Failed to update post"
        })
    }

}


// delete post endpoint 

const deleteBook = async (req, res) => {
    const { id } = req.params
    try {

        let deleteBook = await Book.findByPk(id)

        if (!deleteBook) {
            throw new Error("Book not found")
        }

        let deletedBook = await deleteBook.destroy()
        res.status(200).json({
            status: 'Deleted Successfully',
            deletedBook
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed to delete',
        })
    }
}



export {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
}