# 🏛️ University Admission Portal 2026
**City Institute of Technology | Full-Stack Enrollment System**

A modern, full-stack web application designed to streamline the college admission process. This system handles everything from initial application and merit calculation to secure payment simulation and automated PDF receipt generation.

---

## 🚀 Key Features
* **Dynamic Admission Form:** Intelligent UG/PG switching with real-time mark validation.
* **Automated Merit Logic:** Instant calculation of average marks and scholarship percentages (e.g., >90% for 50% discount).
* **Secure Payment Gateway:** A professional UI simulation for processing enrollment fees using a glassmorphism design.
* **Digital Receipting:** Automated generation of downloadable PDF receipts featuring the **CIT Logo** and the **Student's Photo**.
* **Database Integration:** Persistent storage of applicant data and transaction history using MySQL.

---

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3 (Glassmorphism & 3D Effects), Bootstrap 5, JavaScript.
* **Backend:** Node.js, Express.js.
* **Database:** MySQL.
* **Libraries:** * `Multer`: For secure student photo uploads.
    * `html2pdf.js`: For high-quality client-side PDF generation.
    * `mysql2`: For high-performance database connectivity.

---

## 📖 Working Principle
The system operates on a **Client-Server-Database (MVC)** architecture:

1.  **Data Capture (Frontend):** JavaScript listeners monitor form inputs. As marks are entered, the system calculates merit scores and scholarship eligibility instantly using client-side logic.
2.  **Multipart Handling (Middleware):** When the form is submitted, the `Multer` middleware intercepts the request. It saves the student's photo into the `/uploads` folder and prepares the text data for the database.
3.  **Data Persistence (Backend):** Node.js executes an `INSERT` SQL query to move the student's record into a permanent MySQL table.
4.  **Session Transition:** The server returns a unique Application ID, which is passed to the Payment Gateway via URL parameters to maintain user state.
5.  **Document Rendering:** Upon successful payment, the system reconstructs the student's data into a branded receipt template and uses `html2pdf.js` to generate a vector-based PDF for download.

---

## ⚙️ Installation & Setup

1.  **Initialize Project:**
    ```bash
    npm init -y
    npm install express mysql2 multer body-parser
    ```

2.  **Database Setup:**
    * Create a database named `cit_admission`.
    * Run the provided SQL table schema in your MySQL terminal.

3.  **Folder Structure:**
    * Ensure an `uploads/` folder exists in the root directory.
    * Place `logo.png`, `pay.jpg`, and `success.jpg` in the root folder.

4.  **Run the Server:**
    ```bash
    node server.js
    ```
    *Access the portal at http://localhost:3000*

---

## 📜 License
This project is developed for academic purposes at City Institute of Technology (2026).
