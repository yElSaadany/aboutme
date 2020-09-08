import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Youssef El Saadany - Personal Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Youssef El Saadany</h1>

        <p className="description">
          <code>Computer Science Student</code>
        </p>

        <div id="social-media-icons">
          <a href="https://www.instagram.com/y.elsaadany/">
            <img src="/instagram.svg" alt="Instagram logo" width="35px" />
          </a>
          <a href="https://github.com/yElSaadany">
            <img src="/github.svg" alt="Github logo" width="35px" />
          </a>
          <a href="mailto:youssef.saadany@gmail.com">
            <img src="/mail.svg" alt="Mail logo" width="35px" />
          </a>
        </div>
      </main>

      <footer>Made by Youssef El Saadany using Next.js</footer>
    </div>
  );
}

// Credits to integrate
// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
