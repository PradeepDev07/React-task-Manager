# React Task Manager

This is an assignment for **Absolute App Labs**.

## How to Run

1.  Open the terminal in the project folder.
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Start the development server:
    ```sh
    npm run dev
    ```
4.  Open the link shown in the terminal (usually `http://localhost:5173`).
## Features & Tech Stack
*   **Role & User:** based auth and render pages
*   **Drag & Drop:** Implemented using `react-dnd` and `react-dnd-html5-backend`.
*   **Notifications:** User feedback using `react-hot-toast`.
*   **Routing:** Client-side routing with `react-router-dom`.
*   **Unique IDs:** ID generation using `uuid`.
*   **React DOM:** `react-dom` for DOM rendering. 

## Default Data

### Default Users
| ID | Name | Password | Role |
| :--- | :--- | :--- | :--- |
| `u1` | pradeep admin | `123` | **admin** |
| `u2` | ravi | `123` | user |
| `u3` | gayu | `123` | user |

### Default Tasks
| ID | Title | Assigned To | Status |
| :--- | :--- | :--- | :--- |
| `t1` | Design Homepage | `u2` (ravi) | Pending |
| `t2` | Fix Login Bug | `u3` (gayu) | Pending |
| `t3` | Setup Database | unassigned | Pending |
| `t4` | Write Documentation | unassigned | Pending |

## Future Plans

*   **Upgrade Colors:** Improve the color scheme for a better look and feel.
*   **Animations:** Add smooth animations for drag-and-drop and page transitions.
*   **Performance:** Optimize rendering and state management for better speed.
*   **Backend:** Connect to a real database instead of using LocalStorage.
