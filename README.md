# StudyBuddy

StudyBuddy is a modern web application designed to facilitate online education, offering an intuitive platform for both students and instructors.

## Features

- _Explore Courses_: Discover a wide range of courses across various subjects.
- _Enroll in Courses_: Easily enroll in courses of interest with just a few clicks.
- _Create Courses_: Instructors can effortlessly create and manage courses using a user-friendly form.
- _Secure Payments_: Stripe Checkout integration ensures secure and convenient payment transactions.
- _Multimedia Asset Management_: Cloudinary integration enables efficient management of multimedia assets like images and videos.
- _Responsive Design_: The application is built with responsive design principles, ensuring a seamless experience across devices.

## Technologies Used

- _Frontend_: React.js, Tailwind CSS, Framer Motion
- _Backend_: Node.js, Express.js
- _Database_: MongoDB
- _Cloud Storage_: Cloudinary
- _Payment Processing_: Stripe

## Installation

1. Clone the repository: git clone <repository-url>
2. Navigate to the project directory: cd StudyBuddy
3. Install dependencies: npm install
4. Set up environment variables:
   - Create a .env file in the root directory
   - Define the following variables:

     PORT=3000
     MONGODB_URI=<your-mongodb-uri>
     STRIPE_API_KEY=<your-stripe-api-key>
     CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
     CLOUDINARY_API_KEY=<your-cloudinary-api-key>
     CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
5. Start the development server: npm start

## Contributing

Contributions are welcome! Feel free to open issues and pull requests to suggest improvements or report bugs.
