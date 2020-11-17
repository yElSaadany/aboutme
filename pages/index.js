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
  const [showGPG, setShowGPG] = useState(false);

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

  const copyToClipboard = (e) => {
    console.log(document.getElementById("gpg-key-value").innerText);
    const text = document.getElementById("gpg-key-value").innerText;
    const elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
  };

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
          {!showGPG && (
            <Button
              id="gpg-key-button"
              variant="contained"
              onClick={() => setShowGPG(true)}
            >
              GPG Key
            </Button>
          )}

          <CSSTransition
            in={showGPG}
            timeout={300}
            classNames="gpg"
            unmountOnExit
          >
            <div id="gpg-key">
              <div id="gpg-key-header">
                <Button
                  id="gpg-key-copy"
                  variant="contained"
                  onClick={copyToClipboard}
                >
                  Copy
                </Button>
                <Button id="gpg-key-download" variant="contained">
                  <a href="/mykey.asc" download>
                    Download
                  </a>
                </Button>
              </div>
              <p id="gpg-key-value">
                -----BEGIN PGP PUBLIC KEY BLOCK-----
                mQGNBF+0U+0BDACzRa0wSe8Et0R5LWDIcHvo+00BECfP9xz6B84fE/1dIApi49tR
                0frKz1EbjoMo0HBt7N4gvWO/Z2L9j2MeuuMTgY8lXUb6Gz5Aw62Bq8fP4RQTiqAx
                HP9TLctsHvDcvBSJ62d7Q0VKk+0TgjOPrqvlpl9/lmbE2E98NRT0fVWRKMvCaA51
                SEcw4W8LpTz/QbzZ4j9U65ncdivRfnNtHGhdvnwRJICpMBqTfPDqUh1bngZPKqj5
                bek4ON90v/pB2gbRZesR/TEKXAeDTNa5qD9y9bOSOzl6XEOg8I6cgvBde0Kn4L4q
                rTViGqcWHSqT+Q+OIFu2ovGC9UjJCEW8fJYJr27eqOFRNsNRlxw3v3alLwrmCi8k
                8TpZrE242H6UdtMllrkbNk1mVKxoTOlrWGgRQ42HUvwW8qeSKTkYtB5dqcTz4VB3
                EQYm+0vqG/ieTBPCqHXttTdfHkhgW33UX8Nmr97vsTaXHRFRxHqU6jNlP3KVqLcQ
                icVb/ocYKjsLcwsAEQEAAbQuWW91c3NlZiBFbCBTYWFkYW55IDx5b3Vzc2VmLnNh
                YWRhbnlAZ21haWwuY29tPokB1AQTAQgAPhYhBGwcd3C7/YNJ4zqpSOjMd99Te4EL
                BQJftFPtAhsDBQkDwmcABQsJCAcCBhUKCQgLAgQWAgMBAh4BAheAAAoJEOjMd99T
                e4EL+UAL/3HAvaS54BaJbtQN1kpwZW6xCi+88gCuS+9i45zzenB25QY2mf16bPgY
                hc/kc9Uh1UQ7R5+EloXMcRlx/2iXDiU0h9ZIl9irlG6mSMym027mpFngWe1SY+N1
                1ArRD2vJVMRnLfgOPPRV+mT1AprHTGeuAegO0T4lVNeL7d0A4i+c4457xlFcYVHM
                p57HALJJIlC93LqloxuKCRg4UxzSL8sT/bOTSbiFKjHsR3/XDziToUzbLb/us4+d
                fOA/vWtFzfpdKPhf7YyNAjzaXkNL4iFf7/Q2iv6HLRrjFEjdHASe9FJWwMPIF/69
                G1G1gkOKUwkeBFhkjcVgpMPhBnkmlH2b3e4+xYGpFXKUhw/HuDh7iG+Rws3hTyw2
                6K7rOTe/oPlhsxRLJ+bIunN/7/i0vZCXb3B5G04kOnOCtfUbeQr5hK80Ef76kXRm
                j1IbN1dHEnwWc73eL/3KhqfcJWuDgGY4dPSgA7wdmj8udb/ZeRTiIc8orkgVW/vs
                +jqk9Yb7lbkBjQRftFPtAQwAu2qtrbwd5t6HE97HSqmBX/98krqpdkEunERwit7L
                lGoezNcO97JihVScxBH1dEi6g7pw00nTqAdruTKVAwdRlD04f3F9L+Wj1TFZnhs6
                vFoOBkj9HQYY7WMYepeLP6kq26XePhwxpZJh+qXovAJnuUpxD3oPlZzxGBSqIn2Q
                GG3y5EgUPf+jV6oaoahwW3XimkU0gv6CO9iyPJjL5tBBbFP9+Uegn1Nj6i0X0syk
                9zNTzrlp3BYB1y8bC8MU2+A3crJ0kdzy7aG7ABJ1n3ZX+XRvBX5gI/KY7L+lNOZ/
                oQ89jcuQtozWlryRweCw8b1Xi0Nl7ya4TtIdRFyD7uMjgL5seG15AY2B3md3ybHX
                aa1Q2m3ydLgPtMsFJ3t84aw5Eo8/VOc2O29O1eCy8EFHPyiJQ0/a77dqE4awTOpa
                rCbX2zczQSmITi0igfn3GaqczBbuBfESK2auC7GdBAeEXbObVh57M+ARGUCQjcXi
                n/X4peDuxwTdN8GQhhBkEqmTABEBAAGJAbwEGAEIACYWIQRsHHdwu/2DSeM6qUjo
                zHffU3uBCwUCX7RT7QIbDAUJA8JnAAAKCRDozHffU3uBC/g6DACtoGlgaEe9B/9e
                coxTVUt8cH7LJ02X2HV5s+RHXYMCJyTXWhycrLn9F8M1p2mFnGX3Z/3jdb9C+2IK
                QWmo0hP5QdEzcQ8YIwQK0URsKz24cNmGeJTM8yXKWbiCJw4sPOmmpD7WXRRgFu+t
                fFgcZZRhkzTziBChlluRn3XdcUi1QqzEHGZdQq23T5wvC0wxJJbXfRRGy47CSYK6
                e72mit0dqy57IyNzg6kVCX5ZLLc7ScuKm3xyAxkd1JAOoHCq9ymt7+o7fqAkM6sT
                CZTZBqg0l0rTj0BsHrliYVvUQavRR0K6JQMfOBjSLcslgDdFxVGpM3kQ3lIhvuR4
                kHLo81i/GEkyA/uZza38Y+QdXF8tsvqaiXuSET+czKlZVmAYIJig7989bcHMF56W
                6WLpIRgZha+taNcGk4txPMn4gqAPy6xMLY1pcx7JVIfnRbz1zautZYTrSkyoOnYW
                ztnmBNE11/k6EFc9FGdikwDUPAm0FN/DuhNgPJq5tHbsezDLuDA= =0Zco
                -----END PGP PUBLIC KEY BLOCK-----
              </p>
              <Button
                id="gpg-key-close"
                variant="contained"
                onClick={() => setShowGPG(false)}
              >
                Close
              </Button>
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
      <footer>Made by Youssef El Saadany using Next.js</footer>
    </div>
  );
}

// Credits to integrate
// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
