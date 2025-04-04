import { Book } from "../types/Book";

interface FetchBooksResponse {
  bookList: Book[];
  totalNumBooks: number;
}

const API_URL =
  "https://mission13-brown-g2cyasa2a2duf6ec.eastus-01.azurewebsites.net/Book";

// collecting every book
export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
      .join(`&`);

    const response = await fetch(
      `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${
        selectedCategories.length ? `&${categoryParams}` : ""
      }`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects: ", error);
    throw error;
  }
};

// adding an new book
export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error("Failed to add project");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding project,", error);
    throw error;
  }
};

// updating a book
export const updateBook = async (
  bookId: number,
  updateBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBook),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

// to delete book
export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
