import { Book } from "../types/Book";

interface FetchBooksResponse {
  bookList: Book[];
  totalNumBooks: number;
}

const API_URL = "https://localhost:5000/Book";

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
