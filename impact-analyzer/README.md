# Impact Analyzer

A web application to analyze the impact of changes in your codebase.

## Features

*   **Dependency Mapping:** Visualize the dependencies between your applications and modules.
*   **Impact Analysis:** Analyze the impact of your committed changes across multiple microservices using AI.
*   **Diff Input:** Analyze the impact of your changes even before you commit them across multiple microservices using AI.
*   **Database Analysis:** Understand the impact of your database modification across your database.

## Getting Started

### Prerequisites

*   Node.js
*   npm

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/impact-analyzer.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd impact-analyzer
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

1.  Start the development server:
    ```sh
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:5173` (or the address shown in your terminal).

## Folder Structure

```
impact-analyzer/
├── src/
│   ├── components/
│   │   ├── app-selection/
│   │   ├── database/
│   │   ├── dependency-map/
│   │   └── diff-input/
│   ├── routes/
│   └── styles/
├── index.html
├── package.json
└── vite.config.js
```

*   `src/components`: Contains the React components used in the application.
*   `src/routes`: Contains the different pages of the application.
*   `src/styles`: Contains the CSS styles for the application.
*   `index.html`: The main HTML file.
*   `package.json`: The project's dependencies and scripts.
*   `vite.config.js`: The configuration file for Vite.
