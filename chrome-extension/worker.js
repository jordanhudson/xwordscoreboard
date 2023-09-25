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

const scrape = async () => {
  console.log('*** BEGIN SCRAPER ***');
  const dateStr = document.getElementsByClassName("lbd-type__date")[0].innerText;
  console.log(dateStr);
  console.log('*** END SCRAPER ***');
};

const ALARM_NAME = 'crossword-scrape-alarm';
chrome.alarms.create(ALARM_NAME, {
  delayInMinutes: 1,
  periodInMinutes: 1
});
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME)
    refreshNYTimesTab();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.toLowerCase().includes("nytimes.com") && changeInfo.status == 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func : scrape,
    });
  }
});

refreshNYTimesTab();