## Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Olu-wafemi/drop-innovations-assesment.git
cd drop-innovations-assesment
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Configure Environment Variables

Create a **.env** file in the root directory following the guide in the env.example file:

### 4️⃣ Set Up Database

Run the following to initialize Prisma and apply migrations:

```sh
npx prisma migrate dev --name init
```

### 5️⃣ Start the Server

For **development** :

```sh
npm run dev
```

For **production**:

```sh
npm run build
npm start
```

---

## 📝 Documentation

Check out the full API documentation here [Postman](https://documenter.getpostman.com/view/18572653/2sAYdfpW3y)
