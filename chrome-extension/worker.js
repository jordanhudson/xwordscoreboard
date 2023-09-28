// find the nytimes.com tab and refresh it
const refreshNYTimesTab = async () => {
  const tabs = await chrome.tabs.query({});
  const nyTimesTab = tabs.find((t) => {
    return t.url && t.url.toLowerCase().includes("nytimes.com")
  });
  if (nyTimesTab) {
    chrome.scripting.executeScript({
      target: { tabId: nyTimesTab.id },
      func : () => {
        location.reload();
      },
    });
  }
};

// scrape the times and upload them
const scrape = async () => {
  var payload = {};

  payload.dateStr = document.querySelector('.lbd-type__date').innerText;

  payload.scores = [];
  for(var e of document.querySelectorAll('.lbd-score:not(.no-rank)')) {
    payload.scores.push({
      name: e.querySelector('.lbd-score__name').textContent.replace(/\s+\(you\)$/, '').trim(),
      time: e.querySelector('.lbd-score__time').textContent,
    });
  }
  console.log(payload);
};

// refresh the nytimes.com tab every minute
const ALARM_NAME = 'crossword-scrape-alarm';
chrome.alarms.create(ALARM_NAME, {
  delayInMinutes: 1,
  periodInMinutes: 1
});
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME)
    refreshNYTimesTab();
});

// when the nytimes.com tab is refreshed, run the scraper
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.toLowerCase().includes("nytimes.com") && changeInfo.status == 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func : scrape,
    });
  }
});

refreshNYTimesTab();