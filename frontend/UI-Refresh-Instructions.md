## UI Refresh & Layout Notes

This document explains how the React UI is structured so you can walk an interviewer through the layout and styling decisions. It only covers visual and layout concerns; data fetching and backend logic are unchanged.

### Card grid and image sizing

- **Component**: `frontend/src/components/BookList.tsx`
- **Styles**: `frontend/src/components/BookList.css`

Key ideas:

- Books are displayed in a responsive **CSS grid**:
  - The wrapper `div` uses the `card-container` class.
  - In CSS, `card-container` is defined as:
    - `display: grid;`
    - `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));`
    - `gap: 1.5rem;` and `width: 100%;`
  - This makes the cards expand to fill the available width on any screen size while wrapping cleanly as the viewport shrinks.

- Each book is rendered as a **card**:
  - The `card` class gives:
    - White background
    - Rounded corners
    - Soft shadow
    - A pink top border using the brand color `#bc7c7b`
  - There is a small hover effect (slight lift and stronger shadow) to make the UI feel interactive.

- Book cover images are **controlled to a consistent size**:
  - The `<img>` tag in `BookList.tsx` uses `className="book-cover"`.
  - In CSS, `.book-cover` sets:
    - `width: 100%;`
    - `height: 240px;` (reduced slightly on very small screens)
    - `object-fit: cover;` so images crop nicely without distortion.
  - Result: every card row stays aligned, regardless of the original dimensions of the uploaded cover image.

### Books page layout and sidebar filter

- **Component**: `frontend/src/pages/BooksPage.tsx`
- **Styles**: `frontend/src/pages/BooksPage.css`

Key ideas:

- The main content is wrapped in a semantic `<main>` with class `books-page`.
- The page uses **CSS grid** instead of Bootstrap columns:
  - On wider screens:
    - `grid-template-columns: 260px 1fr;`
    - Left column: `CategoryFilter` inside `books-page-sidebar`.
    - Right column: `BookList` inside `books-page-content`.
  - On smaller screens:
    - A media query collapses the grid to a single column so the filter appears above the cards.

- The sidebar (`books-page-sidebar`):
  - Is styled as a simple white card with padding, rounded corners, and a subtle shadow.
  - Makes it visually obvious that this is the control panel for filtering the list of books.

### Category filter wiring

- **Component**: `frontend/src/components/CategoryFilter.tsx`
- **API helper**: `frontend/src/api/BooksApi.ts`

How it works:

- `BooksPage` owns the `selectedCategories` state (an array of strings).
- `CategoryFilter` receives:
  - `selectedCategories`
  - `setSelectedCategories`
- When you click a checkbox, `CategoryFilter`:
  - Adds or removes that category string from `selectedCategories`.
  - Calls `setSelectedCategories` with the new array.
- `BookList` receives `selectedCategories` from `BooksPage` and passes it into `fetchBooks`.

On the network side:

- `fetchBooks` in `BooksApi.ts` builds the query string:
  - For each selected category, it appends a `bookTypes=...` parameter.
  - The request URL looks like:
    - `/AllBooks?pageSize=5&pageNum=1&bookTypes=Fiction&bookTypes=History`
- The backend endpoint `GetAllBooks` accepts a `List<string>? bookTypes`, so the selected categories from the sidebar control which books are returned.

### How to describe this in an interview

- Start with layout:
  - Navbar at the top, then a two-column layout: sidebar filter on the left, responsive grid of book cards on the right.
- Emphasize responsiveness:
  - CSS grid lets the card layout adapt to any screen size.
  - Media queries ensure the sidebar stacks above the cards on mobile.
- Call out visual consistency:
  - Controlled book-cover height keeps rows aligned.
  - Pink brand color (`#bc7c7b`) is reused for card accents and call-to-action buttons.
- Explain behavior:
  - Category checkboxes update React state in `BooksPage`.
  - That state flows into `BookList`, which calls the API with matching `bookTypes` query parameters so only the chosen categories are displayed.

