# SvelteKit Starter Template with Lucia Auth

This SvelteKit starter template streamlines your development process by providing pre-configured authentication with Lucia Auth, along with a foundation built on Tailwind CSS, Shadcn UI components, and SES for email functionality. Save time reinventing the wheel and focus on building your amazing SvelteKit application!

### Features:

- **Robust Authentication**: Secure user login, logout, and session
  management with Lucia Auth.

- **Modern Styling**: Leverage the power and flexibility of Tailwind CSS for a beautiful and responsive user interface.

- **Streamlined UI Components**: Get started quickly with pre-built and customizable components from Shadcn.

- **Integrated Email Functionality**: Utilize SES for sending emails from your SvelteKit application.

- **Planned Stripe Integration**: Stay tuned for seamless integration with Stripe for payment processing.

### Getting Started

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/KoesterJannik/sveltekit-repo-starter.git
   ```

2. **Install Dependencies**:

   ```bash
   cd sveltekit-repo-starter
   npm install
   ```

3. **Configure Environment Variables**:

   - Create a `.env` file in the root of the project.
   - Copy the contents of `.env.example` into `.env`.
   - Fill in the values for your environment variables.

4. **Start the Postgres Database**:

   ```bash
   docker-compose up -d
   ```

5. **Run Migrations**:

   ```bash
   npx prisma migrate dev
   ```

6. **Start the Development Server**:

   ```bash
   npm run dev
   ```

### Contributing

We welcome your contributions! Feel free to fork the repository, make changes, and submit a pull request. Here are some areas where you can help:

- Enhance existing features with bug fixes and improvements.
- Suggest additional functionalities you'd like to see.
- Extend the component library with valuable additions.
- Improve the documentation to make it even more user-friendly.

### License

**NOT YET LICENSED**

### Live Demo

Check out a live demo of this template in action [here](https://demo.koesterjannik.com).
