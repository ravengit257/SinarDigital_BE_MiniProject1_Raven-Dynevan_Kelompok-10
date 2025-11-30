import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const dataPath = path.join(dirname , "..", "..", "data", "data.json")

const baca = fs.readFileSync(dataPath, "utf-8")
const data = JSON.parse(baca)

const movies = data.movies


export const getHome = (req, res) => {
  res.send(`
    <h1>Welcome To Movie Recommendation App</h1> 
    <a href ="/movie" Movie Recommendation </a>Movie Recommendtion<br>
    <a href ="/about" About </a>About Page <br>
    <a href ="/contact" Contact </a>Contact Page <br>
   

    `);
};

export const getAbout = (req, res) => {
  res.send(`<h1>About This Application</h1>
<p>Welcome to the Movie Recommendation App! Aplikasi ini dibuat untuk memberikan rekomendasi film berdasarkan usia dan gender pengguna. Kami ingin membantu Anda menemukan film yang aman, menarik, dan sesuai preferensi Anda.</p>

<h2>How It Works</h2>
<p>Cukup masukkan usia dan gender Anda pada halaman Movie. Sistem kami akan memilih film yang cocok dari database film yang telah dikurasi.</p>

<h2>Developer</h2>
<p>Aplikasi ini dikembangkan oleh Raven>sebagai mini project belajar Node.js & Express.</p>



<p>Untuk feedback atau pertanyaan, silakan kunjungi halaman Contact.</p>
`);
};

export const getContactForm = (req, res) => {
  res.send(`
    <h1>Contact Form</h1>
    <form method="POST" action="/movie/contact">
      <label>Email: <input type="email" name="email" required></label><br><br>
      <label>Message: <textarea name="message"></textarea></label><br><br>
      <button type="submit">Send</button>
    </form>
  `);
};

export const formatMessage = (body) => {
  return{
  email: body.email.trim(),
  message: body.message.trim()
  }
}

export const submitContact = (req, res) => {
  const formatted = formatMessage(req.body);

  res.send(`
    <h1>Thank You!</h1>
    <p>Your email: ${formatted.email}</p>
    <p>Your message: ${formatted.message}</p>
    <a href="/">Back Home</a>
  `);
};

export const movieRec = (req, res) => {
  const {age, gender} = req.body
  const ageNum = Number(age)
  const baca = fs.readFileSync(dataPath, "utf-8")
  const data = JSON.parse(baca) 
  
  const movies = data.movies

  const recommended = movies.filter(movie => {
    return ageNum >= movie.minAge && movie.gender === gender.toLowerCase()
  })

  if (recommended.length === 0) {
    return res.send("No movie fits the criteria")
  } 

  const randomIndex = Math.floor(Math.random() * recommended.length)
  const randomMovie = recommended[randomIndex]

  res.send(`
      <h1>Your Movie Recommendation</h1>

      <img src = "${randomMovie.poster}" alt="${randomMovie.title}.jpg" width ="200">


        <p><strong>${randomMovie.title}</strong></p>
        <p>Rating: ${randomMovie.rating}</p>
        <p>Minimum Age: ${randomMovie.minAge}</p>
        <p> Genre : ${randomMovie.genre}</p>
        <p> Description : ${randomMovie.description}</p>
        

    `)

};

export const movieInput = (req, res) => {
  res.send(`      
     <h1>Movie Recommendation</h1>
        <form method="POST" action="/movie/recommend">
            <label>Age: <input type="number" name="age" required></label><br><br>
            <label>Gender:
                <select name="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex"> Any </option>
                </select>
            </label><br><br>
            <button type="submit">Get Recommendation</button>
        </form>`)
}

// 1. Movie list 
// 2. Movie Recommendation
// 3. About
// 4. 