import Head from "next/head";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [numPages, setNumPages] = useState(null);

  const handleShowResume = (e) => {
    setShowResume((prev) => setShowResume(!prev));
    setClicked((prev) => setClicked(!prev));
  };

  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(
      ".react-pdf__Page__textContent"
    );
    textLayers.forEach((layer) => {
      const { style } = layer;
      style.top = "0";
      style.left = "0";
      style.transform = "";
    });
  }

  return (
    <div className="container">
      <Head>
        <title>Youssef El Saadany - Personal Website</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>

      <header>
        <h1 className="title">Youssef El Saadany</h1>

        <p className="description">
          <code>Software Engineer</code>
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
      </header>

      <CSSTransition in={clicked} timeout={500} classNames="clicked">
        <main className={clicked ? "clicked" : ""}>
          <p onClick={() => setClicked((prev) => setClicked(!prev))}>Games</p>
          <p name="resume" onClick={handleShowResume}>
            Résumé
          </p>
          <p onClick={() => setClicked(!clicked)}>Portfolio</p>
          <p onClick={() => setClicked(!clicked)}>Contact</p>
        </main>
      </CSSTransition>
      <CSSTransition
        in={showResume}
        timeout={500}
        classNames="react-pdf__Document"
      >
        <Document
          className={showResume ? "resume" : ""}
          file="/CV_El_Saadany.pdf"
        >
          <Page
            pageNumber={1}
            width={900}
            onLoadSuccess={removeTextLayerOffset}
          />
        </Document>
      </CSSTransition>

      <footer>Made by Youssef El Saadany using Next.js</footer>
    </div>
  );
}

// Credits to integrate
// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
