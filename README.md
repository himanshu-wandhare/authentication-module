<h3 align="center">Basic Registration Form</h3>

## <a name="tech-stack">⚙️ Tech Stack</a>

- Node.js
- Express.js
- Passport.js

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/himanshu-wandhare/healthcare_carepluse.git
cd healthcare
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
SECRET=anysecretkeyhere
PORT=3000
CLIENT_ID=
CLIENT_SECRET=
```

Replace the placeholder values with your actual Google Cloud Console credentials. You can obtain these credentials by signing up on the [Google Cloud Console](https://console.cloud.google.com/).

**Running the Project**

```bash
node app.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
