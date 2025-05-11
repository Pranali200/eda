

# EDA Dashboard for FMCG Retail Dataset

## Tech Stack

* **Frontend**: React.js, Recharts (for charts),Axios (Api call), Tailwind CSS (for styling)
* **Backend**: Django (for API handling)
* **Database**: MongoDB (for flexible data storage)
* **API Communication**: Axios (for making HTTP requests from the frontend to the Django backend)

## Thought Process

The goal of this project is to provide an easy-to-use dashboard that allows users to explore FMCG retail data by filtering and visualizing key metrics. The dataset includes sales, volume, and value data across various dimensions like brand, pack type, PPG, and year. The dashboard is designed to give users insights into market trends, performance by year, and contributions to sales and volume.

### Key Decisions

1. **React.js for Frontend**:

   * React was chosen for its efficient rendering and flexibility in building interactive UIs. With React's component-based structure, each chart and filter will be modular, making the codebase maintainable and scalable.

2. **Recharts for Data Visualization**:

   * Recharts is lightweight, easy to integrate with React, and provides a variety of chart types. Horizontal bar charts, line charts, and pie charts are ideal for visualizing sales, volume, and trends in this context.

3. **Django for Backend**:

   * Django was chosen for the backend to handle data processing and API creation. Its robust built-in features like authentication, ORM, and admin panel make it an ideal choice for handling the backend logic and database management.

4. **MongoDB for Database**:

   * MongoDB is used for flexible, NoSQL data storage. It allows for easy schema evolution, making it well-suited to the diverse FMCG retail data, which may have varying attributes across brands, pack types, and years.

5. **Tailwind CSS for Styling**:

   * Tailwind CSS allows for rapid development with a utility-first approach, enabling a clean, responsive design without excessive custom CSS.

6. **Filtering Mechanism**:

   * Filters like Brand, Pack Type, PPG, Channel, and Year allow users to narrow down data to specific segments. These filters are implemented using React’s state management and passed as query parameters to the Django API.

7. **Data Aggregation**:

   * The backend will process the FMCG dataset, aggregating data based on the selected filters. It will then return the processed data to the frontend for display.

---

## Dashboard Features

* **Filters**:

  * **Brand**: Filter by product brand.
  * **Pack Type**: Filter by packaging type.
  * **PPG**: Filter by price per gram.
  * **Channel**: Filter by sales channel (e.g., online, retail).
  * **Year**: Filter by year.

* **Charts**:

  * **Horizontal Bar Chart** for **Sales Value by Year**.
  * **Horizontal Bar Chart** for **Volume Contribution (lbs)**.
  * **Vertical Bar Chart** for **Year-wise Value**.
  * **Line Chart** for **Monthly Trend in Value**.

* **Contribution Charts**:

  * **Donut Chart** for **Market Share** (by Sales/Volume), with clear legends and visually distinct segments for easy understanding.

---

## Key Decisions

1. **Horizontal vs Vertical Bar Charts**:

   * Horizontal bar charts are used for sales value and volume contribution because they work well for longer labels (e.g., brand names, years) and provide better readability.

2. **Line Chart for Trends**:

   * A line chart was chosen to display the monthly trend in value due to its ability to highlight changes over time, making it perfect for visualizing trends.

3. **Market Share Visualization**:

   * A donut chart is used for market share to provide a clear, segmented view of how different brands or pack types contribute to the overall sales/volume.

4. **Responsiveness**:

   * Tailwind CSS ensures that the dashboard is responsive, offering a good user experience across various devices (desktop, tablet, mobile).

---

## Running the Project

### Backend (Django)

1. Install dependencies: `pip install -r requirements.txt`
2. Run the Django development server:

   ```bash
   python manage.py runserver 8000
   ```

### Frontend (React)

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Start the development server:

   ```bash
   npm start
   ```

---

This EDA dashboard is designed to empower users with a clear and interactive way of analyzing FMCG retail data and making data-driven decisions.

---
