/// <reference lib="dom" />
import { JSDOM } from 'jsdom';

(async function () {
  try {
    // fetch it
    const response = await fetch("https://www.nytimes.com/puzzles/leaderboards", {
      "credentials": "include",
      "headers": {
        cookie: "nyt-a=-67dOvOXNnaAusHN04OvWL; nyt-purr=cfhhcfhhhukfhufhh; nyt-jkidd=uid=96751066&lastRequest=1704762878773&activeDays=%5B0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C1%2C1%5D&adv=2&a7dv=2&a14dv=2&a21dv=2&lastKnownType=sub&newsStartDate=&entitlements=; purr-cache=<K0<r<C_<G_<S0<a1<ur<T0; iter_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiI2NDM3Njg3YWJjMGY0MzAwMDE3YzVjNzEiLCJhaWRfZXh0Ijp0cnVlLCJjb21wYW55X2lkIjoiNWMwOThiM2QxNjU0YzEwMDAxMmM2OGY5IiwiaWF0IjoxNjkwNDkwMDM1fQ.0JVBRDGCQ4P0sg2Dd4LtCDs6ljQBm3VSdEOVzJxfcTI; _cb=B5RgGzDpSM78BwJsHf; _chartbeat2=.1690490018894.1695836117065.0000000000000101.DNZvMDCXq_kZBUr5sjDNjw8Lsg5gS.1; __gads=ID=9b0fcb211d878552:T=1695665449:RT=1695665449:S=ALNI_MZikfsd1ZXwKjDc7DnmK5jb0VeP7A; __gpi=UID=000009d5396645d6:T=1695665449:RT=1695665449:S=ALNI_Mbs6qFh8g3aPHPCBtAEQXzLEF0CQg; _v__chartbeat3=BizcXT93OCtCx_EcN; nyt-b3-traceid=8b193d22cda1402a84cfabb477427556; nyt-gdpr=0; nyt-geo=CA; regi_cookie=regi_id=96751066; b2b_cig_opt=%7B%22isCorpUser%22%3Afalse%7D; edu_cig_opt=%7B%22isEduUser%22%3Afalse%7D; nyt-auth-method=username; NYT-S=0^CBYSLwj9u_KsBhD1vPKsBhoSMS0H85UpyruMw60lnXXd38mZINqbkS4qAgACOL_d1OsFGkCHicvGnXpDxe5aFO1QRnYwIN_sTp0Zwc4p0NKlK5rir7p9DJlSMQh8dFE6mt-TNoaWsFGEPQDBBJqYdEr0IJII; SIDNY=CBYSLwj9u_KsBhD1vPKsBhoSMS0H85UpyruMw60lnXXd38mZINqbkS4qAgACOL_d1OsFGkCHicvGnXpDxe5aFO1QRnYwIN_sTp0Zwc4p0NKlK5rir7p9DJlSMQh8dFE6mt-TNoaWsFGEPQDBBJqYdEr0IJII; NYT-MPS=0000000c1df0064a50f73c314ed871057a8b1a88156c7c915227a54475b4088541d252a3337236526a0fef380b4935c3ace35faa0912408a12bf307a337e",
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-CA,en-US;q=0.7,en;q=0.3",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "X-Forwarded-For": "66.249.66.1",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
      },
      "method": "GET",
      "mode": "cors"
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const htmlText = await response.text();

    // parse it
    const doc = (new JSDOM(htmlText)).window.document;
    const date = doc.querySelector('.lbd-type__date')?.textContent;
    const times = [];
    for (const scoreNode of doc.querySelectorAll('.lbd-score')) {
      const name = scoreNode.querySelector('.lbd-score__name')?.textContent?.trim();
      const time = scoreNode.querySelector('.lbd-score__time')?.textContent;
      if (time === undefined || time === '--') continue;
      times.push({ name, time });
    }
    const payload = { date, times };
    console.log(payload);
  } catch (error) {
    console.error('Error:', error);
  }
})();