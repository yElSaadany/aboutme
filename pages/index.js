import Head from "next/head";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Document, Page, pdfjs } from "react-pdf";
import { Snake } from "@bit/yelsaadany.react-games.snake";
import { Backdrop } from "../components/Backdrop";
import { Button } from "@material-ui/core";
import { CurrencyConverter } from "../components/CurrencyConverter";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [playSnake, setPlaySnake] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [currencyConverter, setCurrencyConverter] = useState(false);

  const showingSomething = (e) => {
    if (
      showResume == true ||
      showGames == true ||
      showPortfolio == true ||
      showContact == true
    ) {
      return true;
    }

    return false;
  };

  const handleShowResume = (e) => {
    if (showResume) {
      setShowResume(false);
      setClicked((prev) => setClicked(!prev));
    } else if (clicked) {
      stopShowing();
      setShowResume(true);
    } else {
      setShowResume(true);
      setClicked((prev) => setClicked(!prev));
    }
  };

  const handleShowGames = (e) => {
    if (showGames) {
      setShowGames(false);
      setClicked((prev) => setClicked(!prev));
    } else if (clicked) {
      stopShowing();
      setShowGames(true);
    } else {
      setShowGames(true);
      setClicked((prev) => setClicked(!prev));
    }
  };

  const handleShowPortfolio = (e) => {
    if (showPortfolio) {
      setShowPortfolio(false);
      setClicked((prev) => setClicked(!prev));
    } else if (clicked) {
      stopShowing();
      setShowPortfolio(true);
    } else {
      setShowPortfolio(true);
      setClicked((prev) => setClicked(!prev));
    }
  };

  const handleShowContact = (e) => {
    if (showContact) {
      setShowContact(false);
      setClicked((prev) => setClicked(!prev));
    } else if (clicked) {
      stopShowing();
      setShowContact(true);
    } else {
      setShowContact(true);
      setClicked((prev) => setClicked(!prev));
    }
  };

  const stopShowing = () => {
    setShowResume(false);
    setShowGames(false);
    setShowPortfolio(false);
    setShowContact(false);
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
          <p onClick={handleShowGames}>Stuff</p>
          <p name="resume" onClick={handleShowResume}>
            Résumé
          </p>
          <p onClick={handleShowPortfolio}>Portfolio</p>
          <p onClick={handleShowContact}>Contact</p>
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

      <CSSTransition in={showGames} timeout={500} classNames="games">
        <div className={showGames ? "games-content games" : "games"}>
          <div id="snake-game">
            {!playSnake ? (
              <Button variant="contained" onClick={() => setPlaySnake(true)}>
                Play Snake
              </Button>
            ) : (
              <Backdrop>
                <Snake gameOver={() => setPlaySnake(false)} />
              </Backdrop>
            )}
          </div>
          <div
            style={{ zIndex: playSnake ? "-100" : "0" }}
            id="currency-converter"
          >
            <p>Currency Converter</p>
            <CurrencyConverter />
          </div>
        </div>
      </CSSTransition>
      <CSSTransition in={showPortfolio} timeout={500} classNames="portfolio">
        <div
          className={
            showPortfolio ? "portfolio-content portfolio" : "portfolio"
          }
        >
          Portfolio
        </div>
      </CSSTransition>
      <CSSTransition in={showContact} timeout={500} classNames="contact">
        <div className={showContact ? "contact-content contact" : "contact"}>
          Contact
        </div>
      </CSSTransition>
      <footer>Made by Youssef El Saadany using Next.js</footer>
    </div>
  );
}

// Credits to integrate
// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
