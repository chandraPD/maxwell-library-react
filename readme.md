[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://chandrapd.github.io/maxwell-library">
    <img src="https://chandrapd.github.io/maxwell-library/auth/assets/images/bookshelf.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Maxwell Library</h3>
  <p align="center">
    A dashboard for library management
  </p>
</p>


Contribute : 
Fork, create your branch and pull request into main

Cara menjalankan : 
Required Node.js to run

```sh
$ npm install
$ npm start
```

Untuk Koneksi dengan Back End sudah terkoneksi secara otomatis pada heroku.

Apabila ingin melakukan settingan database sendiri :
Pull https://github.com/chandraPD/maxwell dan ikuti langkah-langkah nya

Settingan Database :
Untuk merubah database, dapat mengubah 2 file berikut,
  - 1. ./src/instances/axios-instances.js 
    a. Mengubah baseURL: ‘YOUR_URL/’
  - 2. ./src/Services/auth.service.js
    a. Mengubah API_URL : ‘YOUR_URL/auth/’

Akses secara local :
```sh
http://localhost:3000/
```

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/chandraPD/maxwell-library-react.svg?style=flat-square
[contributors-url]: https://github.com/chandraPD/maxwell-library-react/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chandraPD/maxwell-library-react.svg?style=flat-square
[forks-url]:https://github.com/chandraPD/maxwell-library-react/network/members
[stars-shield]: https://img.shields.io/github/stars/chandraPD/maxwell-library-react.svg?style=flat-square
[stars-url]: https://github.com/chandraPD/maxwell-library-react/stargazers
[issues-shield]: https://img.shields.io/github/issues/chandraPD/maxwell-library-react.svg?style=flat-square
[issues-url]:https://github.com/chandraPD/maxwell-library-react/issues
[license-shield]: https://img.shields.io/github/license/chandraPD/maxwell-library-react.svg?style=flat-square
[license-url]: https://github.com/chandraPD/maxwell-library-react/main/LICENSE.txt
