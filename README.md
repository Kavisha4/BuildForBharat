# **Optimal Storage & Retrieval in Sparse Matrix**

## **Introduction**
Pincode-based serviceability is crucial for merchants to define the areas where they can provide their products and services. However, handling serviceability verification efficiently, especially at scale, poses a significant challenge. This problem statement focuses on devising an optimal solution for storing and retrieving pincode serviceability information by merchants, considering a large number of merchants and pincodes.

## **Problem Statement**
The task involves designing a data structure to store pincode serviceability information by merchants in an m*n sparse matrix format. The sparse matrix represents whether a merchant serves a particular pincode. With more than 30,000 pincodes and over 100 million merchants, the solution must enable near real-time verification of serviceability.

## **Solution Overview**
The proposed solution utilizes Google Cloud Platform (GCP) services, including BigQuery for storing and querying the sparse matrix data, an instance on GCP to host the backend application, and React with Tailwind CSS for building the front-end interface.

### **Components:**
1. **Backend Application (Hosted on GCP Instance):**
   - Utilizes BigQuery for storing the sparse matrix data.
   - Provides endpoints for querying pincode serviceability information.

2. **Frontend Application (Built with React and Tailwind CSS):**
   - Allows users to input one or more pincodes to search for.
   - Displays the serviceability status for the given pincode(s) based on the retrieved data from the backend.

## **Implementation Details**
### **Backend Setup:**
1. **Google Cloud Platform (GCP) Project Creation:**
   - Created a GCP project to host the backend application and store data in BigQuery.

2. **BigQuery Dataset Creation:**
   - Created a BigQuery dataset to store the sparse matrix data.
   - Defined a schema for the dataset with fields for pincode, merchant ID, and serviceability status.

3. **Backend Application Development:**
   - Implemented endpoints for storing and retrieving pincode serviceability data from BigQuery.

### **Frontend Setup:**
1. **React Application Initialization:**
   - Initialized a new React application using Create React App.

2. **Component Development:**
   - Developed components for user input and displaying serviceability information.
   - Utilized Tailwind CSS for styling the components.

3. **Integration with Backend:**
   - Connected the frontend application to the backend endpoints for fetching pincode serviceability data.

### **Testing:**
1. **Unit Testing:**
   - Wrote unit tests to ensure the correctness of backend and frontend components.
   - Utilized Jest and React Testing Library for testing React components.

2. **Integration Testing:**
   - Performed integration tests to verify the interaction between frontend and backend components.

## **Assumptions**
1. The frontend application interacts securely with the backend through HTTPS requests.
2. The solution is designed to handle the anticipated scale of data and user traffic.
3. The data to be inputed has to have pincodes as rows and merchant_ids as the columns

## **Conclusion**
The proposed solution provides an efficient way to store and retrieve pincode serviceability information using a combination of BigQuery, GCP services, React, and Tailwind CSS. By leveraging cloud-based infrastructure and modern web technologies, the solution offers scalability, performance, and real-time responsiveness, meeting the requirements of large-scale pincode-based serviceability verification.
