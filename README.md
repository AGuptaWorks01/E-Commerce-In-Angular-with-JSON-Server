# E-Commerce-In-Angular-with-JSON-Server

This project is an E-Commerce web application built using Angular for the frontend and JSON Server as a mock backend API. It demonstrates a typical online shopping experience with product browsing, cart management, and order features.

## Features

- User authentication (login/signup)
- Product catalog with category filtering and search
- Product details view
- Add to cart and cart management
- Order placement and order history
- Responsive design for desktops and mobiles
- Uses JSON Server as a mock RESTful API backend

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Angular CLI](https://angular.io/cli)
- [JSON Server](https://github.com/typicode/json-server)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AGuptaWorks01/E-Commerce-In-Angular-with-JSON-Server.git
   cd E-Commerce-In-Angular-with-JSON-Server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start JSON Server**
   ```bash
   npm run json-server
   ```
   This will run JSON Server on [http://localhost:3000](http://localhost:3000).

4. **Start the Angular application**
   ```bash
   ng serve
   ```
   Navigate to [http://localhost:4200](http://localhost:4200) in your browser.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   ├── guards/
│   │   └── ...
│   ├── assets/
│   └── environments/
├── db.json           # JSON Server database
├── package.json
├── angular.json
└── ...
```

## Scripts

- `ng serve`: Run Angular development server
- `npm run json-server`: Start the mock backend using JSON Server

## Customization

- To add/edit products, users, or orders, modify `db.json`.
- Update Angular components and services in `src/app/` as needed.

## Acknowledgements

- [Angular](https://angular.io/)
- [JSON Server](https://github.com/typicode/json-server)
- [Bootstrap](https://getbootstrap.com/) (if used for styling)

## License

This project is licensed under the MIT License.
