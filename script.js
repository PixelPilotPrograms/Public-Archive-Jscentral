const SEASONAL_PLAYLISTS = {
  summer: { label: 'Summer playlist', id: 'PLLH5-2tbx7Gg', url: 'https://music.youtube.com/playlist?list=PLLH5-2tbx7Gg&si=3y_vfy-zr15jl140' },
  christmas: { label: 'Christmas playlist', id: 'PLKTFuqXLtU1k', url: 'https://music.youtube.com/playlist?list=PLKTFuqXLtU1k&si=5s8zW8x6VXsNbAHT' },
  halloween: { label: 'Halloween playlist', id: 'PLeJDmFD12HHc', url: 'https://music.youtube.com/playlist?list=PLeJDmFD12HHc' }
};

const HOLIDAY_DROPS = {
  summer: { kicker: 'Summer signal', headline: 'The days are longer.', copy: 'Turn the signal up, choose a Summer playlist, and let the workbench stay open a little later.', mark: 'SUN' },
  christmas: { kicker: 'Christmas signal', headline: 'Leave a little light on.', copy: 'Warm edges, generous pauses, and a small seasonal transmission from the workbench.', mark: 'XMAS' },
  halloween: { kicker: 'Halloween signal', headline: 'Something is watching.', copy: 'The lab lights are low. Follow the strange signal and inspect the source.', mark: 'BOO' },
  easter: { kicker: 'Easter signal', headline: 'Look a little closer.', copy: 'There is something tucked into the interface. Follow the small clue and keep looking.', mark: 'EGG' }
};

const SEASONAL_STATES = {
  winter: {
    label: 'Winter', short: 'WIN', range: 'DEC / JAN / FEB', number: '01',
    headline: 'Keep the signal', name: 'warm.', intro: 'A quieter season for careful systems, warm light, and one more useful experiment.',
    title: 'Build a little shelter.', copy: 'Winter is good for making things that hold up: fewer promises, better details, and a bench light left on.'
  },
  spring: {
    label: 'Spring', short: 'SPR', range: 'MAR / APR / MAY', number: '02',
    headline: 'Let something', name: 'begin.', intro: 'The interface is opening up. Follow the new paths, test the bright ideas, and keep the first version light.',
    title: 'Make room for a first draft.', copy: 'Spring rewards curiosity. Start with a small question, then give it enough space to become a real thing.'
  },
  autumn: {
    label: 'Autumn', short: 'AUT', range: 'SEP / OCT / NOV', number: '04',
    headline: 'Collect what', name: 'worked.', intro: 'The season for sharper edits, amber light, and turning scattered notes into something you can use.',
    title: 'Keep the useful parts.', copy: 'Autumn is a good excuse to revisit the workbench. Save the lessons, lose the noise, and make the next version clearer.',
    playlistKey: 'summer'
  },
  summer: {
    label: 'Summer', short: 'SUM', range: 'JUN / JUL / AUG', number: '03',
    headline: 'Turn the signal', name: 'up.', intro: 'Longer days, faster loops, and enough heat to make the browser feel like a workbench.',
    title: 'Follow the bright thread.', copy: 'Summer is for visible experiments: let the interaction be obvious, let the idea get a little loud, and see what responds.',
    playlistKey: 'summer'
  },
  halloween: {
    label: 'Halloween', short: 'HAL', range: 'SEP / OCT', number: '05',
    headline: 'Something is', name: 'watching.', intro: 'The lab lights are low. Follow the strange signal, inspect the source, and leave the interface a little haunted.',
    title: 'Let the interface get strange.', copy: 'A little motion, a little mystery, and a reason to look twice before you move on.',
    playlistKey: 'halloween'
  },
  easter: {
    label: 'Easter', short: 'EGG', range: 'EASTER WEEKEND', number: '06',
    headline: 'Look a little', name: 'closer.', intro: 'There is something tucked into the interface. Follow the small clue, click the unexpected thing, and keep looking.',
    title: 'Find the hidden signal.', copy: 'The best Easter eggs do not interrupt the work. They reward attention, then disappear back into the system.',
    playlistKey: 'summer'
  }
};

function getEasterDate(year) {
  const century = Math.floor(year / 100);
  const yearOfCentury = year % 100;
  const lunarCorrection = Math.floor((century + 8) / 25);
  const centuryCorrection = Math.floor((century - lunarCorrection + 1) / 3);
  const goldenNumber = year % 19;
  const moonPhase = (19 * goldenNumber + century - Math.floor(century / 4) - centuryCorrection + 15) % 30;
  const weekdayOffset = (32 + 2 * (century % 4) + 2 * Math.floor(yearOfCentury / 4) - moonPhase - (yearOfCentury % 4)) % 7;
  const monthOffset = Math.floor((goldenNumber + 11 * moonPhase + 22 * weekdayOffset) / 451);
  const easterMonth = Math.floor((moonPhase + weekdayOffset - 7 * monthOffset + 114) / 31) - 1;
  const easterDay = ((moonPhase + weekdayOffset - 7 * monthOffset + 114) % 31) + 1;
  return new Date(year, easterMonth, easterDay);
}

function getSeasonalState(date = new Date()) {
  const month = date.getMonth() + 1;
  const easter = getEasterDate(date.getFullYear());
  const daysFromEaster = Math.round((date - easter) / 86400000);
  let key = month <= 2 ? 'winter' : month <= 5 ? 'spring' : month <= 8 ? 'summer' : 'autumn';
  if (month === 12 || (date.getFullYear() === 2026 && month >= 9)) key = 'christmas';
  else if (month === 9 || month === 10) key = 'halloween';
  else if (daysFromEaster >= -3 && daysFromEaster <= 1) key = 'easter';
  return { key, year: date.getFullYear(), ...SEASONAL_STATES[key] };
}

SEASONAL_STATES.christmas = {
  label: 'Christmas', short: 'XMAS', range: 'COUNTDOWN TO DEC 25', number: '07',
  headline: 'Leave a little', name: 'light on.', intro: 'A small seasonal transmission from the workbench: warm edges, generous pauses, and one bright surprise.',
  title: 'Build something that glows.', copy: 'Christmas mode is a reminder to make the useful thing feel human too. Take the long way through one good detail.',

  playlistKey: 'christmas'
};

function initSeasonalExperience() {
  const season = getSeasonalState();
  const isSeasonalPage = Boolean(document.querySelector('[data-seasonal-page]'));
  document.body.dataset.season = season.key;
  if (isSeasonalPage) document.body.dataset.festive = 'christmas';
  document.querySelectorAll('[data-season-label]').forEach(element => { element.textContent = season.label; });
  document.querySelectorAll('[data-season-year]').forEach(element => { element.textContent = season.year; });
  document.querySelectorAll('[data-season-name]').forEach(element => { element.textContent = season.name; });
  document.querySelectorAll('[data-season-headline]').forEach(element => { element.textContent = season.headline; });
  document.querySelectorAll('[data-season-intro]').forEach(element => { element.textContent = season.intro; });
  document.querySelectorAll('[data-season-short]').forEach(element => { element.textContent = season.short; });
  document.querySelectorAll('[data-season-range]').forEach(element => { element.textContent = season.range; });
  document.querySelectorAll('[data-season-number]').forEach(element => { element.textContent = season.number; });
  document.querySelectorAll('[data-season-event]').forEach(element => { element.textContent = season.label; });
  initHolidayDrop(season);
  initPlaylistPlayer(season);
  initChristmasCountdown();

  if (!document.querySelector('[data-seasonal-banner]') && !document.querySelector('[data-seasonal-page]')) {
    const nav = document.querySelector('.site-nav');
    if (nav) {
      const banner = document.createElement('aside');
      banner.className = 'seasonal-banner';
      banner.dataset.seasonalBanner = '';
      const bannerText = document.createElement('span');
      bannerText.textContent = `A note for ${season.label}`;
      const bannerLink = document.createElement('a');
      bannerLink.href = 'seasonal.html';
      bannerLink.textContent = 'See the seasonal page ↗';
      banner.append(bannerText, bannerLink);
      nav.insertAdjacentElement('afterend', banner);
    }
  }
}

let christmasCountdownTimer;

function initChristmasCountdown() {
  const countdown = document.querySelector('[data-christmas-countdown]');
  if (!countdown) return;
  clearInterval(christmasCountdownTimer);

  const updateCountdown = () => {
    const now = new Date();
    const isChristmasDay = now.getMonth() === 11 && now.getDate() === 25;
    let christmasYear = now.getFullYear();
    let target = new Date(christmasYear, 11, 25);
    if (!isChristmasDay && target <= now) {
      christmasYear += 1;
      target = new Date(christmasYear, 11, 25);
    }

    const secondsRemaining = isChristmasDay ? 0 : Math.max(0, Math.floor((target - now) / 1000));
    const units = {
      days: Math.floor(secondsRemaining / 86400),
      hours: Math.floor((secondsRemaining % 86400) / 3600),
      minutes: Math.floor((secondsRemaining % 3600) / 60),
      seconds: secondsRemaining % 60
    };
    Object.entries(units).forEach(([unit, value]) => {
      countdown.querySelector(`[data-countdown-${unit}]`).textContent = String(value).padStart(2, '0');
    });
    countdown.querySelector('[data-countdown-year]').textContent = christmasYear;
    countdown.querySelector('[data-countdown-note]').textContent = isChristmasDay ? 'Merry Christmas!' : 'Until December 25';
    countdown.hidden = false;
  };

  updateCountdown();
  christmasCountdownTimer = setInterval(updateCountdown, 1000);
}

function initHolidayDrop(season) {
  const drop = document.querySelector('[data-holiday-drop]');
  if (!drop) return;
  const content = HOLIDAY_DROPS[season.key] || { kicker: `${season.label} signal`, headline: season.title, copy: season.intro, mark: season.short };
  drop.querySelector('[data-holiday-kicker]').textContent = content.kicker;
  drop.querySelector('[data-holiday-headline]').textContent = content.headline;
  drop.querySelector('[data-holiday-copy]').textContent = content.copy;
  drop.querySelector('[data-holiday-mark]').textContent = content.mark;
}

function initPlaylistPlayer(season) {
  const player = document.querySelector('[data-playlist-player]');
  const select = document.querySelector('[data-playlist-select]');
  const frame = document.querySelector('[data-playlist-frame]');
  const fallback = document.querySelector('[data-playlist-fallback]');
  if (!player || !select || !frame || !fallback) return;

  const playlists = Object.values(SEASONAL_PLAYLISTS);
  select.replaceChildren(...playlists.map(playlist => {
    const option = document.createElement('option');
    option.value = playlist.id;
    option.textContent = playlist.label;
    return option;
  }));
  const activePlaylist = SEASONAL_PLAYLISTS[season.playlistKey] || SEASONAL_PLAYLISTS.summer;
  select.value = activePlaylist.id;
  const updatePlayer = () => {
    const playlist = playlists.find(item => item.id === select.value) || playlists[0];
    frame.src = `https://www.youtube.com/embed?list=${playlist.id}&rel=0`;
    fallback.href = playlist.url;
    fallback.textContent = `Open ${playlist.label} in YouTube Music ↗`;
  };
  select.onchange = updatePlayer;
  updatePlayer();
}

function initShareAction() {
  const shareButton = document.querySelector('[data-share-page]');
  if (!shareButton) return;
  shareButton.addEventListener('click', async () => {
    const shareData = {
      title: document.title,
      text: 'Explore the seasonal signal at JS Central.',
      url: window.location.href
    };
    if (navigator.share) {
      await navigator.share(shareData).catch(() => {});
      return;
    }
    try {
      await navigator.clipboard?.writeText(window.location.href);
      shareButton.textContent = 'Link copied';
    } catch {
      shareButton.textContent = 'Copy the page link';
    }
    setTimeout(() => { shareButton.textContent = 'Share this page'; }, 1600);
  });
}

function initPrivacyNotice() {
  if (document.querySelector('.legal-page') || document.querySelector('.not-found') || window.location.pathname.includes('/archive/') || localStorage.getItem('privacy-notice-seen') === 'true') return;
  localStorage.setItem('privacy-notice-seen', 'true');
  const notice = document.createElement('aside');
  notice.className = 'privacy-notice';
  notice.setAttribute('role', 'alertdialog');
  notice.setAttribute('aria-labelledby', 'privacy-notice-title');
  notice.innerHTML = '<div><p class="eyebrow">A small site update</p><h2 id="privacy-notice-title">The rules got clearer.</h2><p>JS Central uses Google AdSense and Cloudflare delivery, security, and aggregate traffic statistics. Embedded-guide records stay in your browser profile and are not sent to a server.</p><a href="legal.html#privacy">Read the privacy policy <span aria-hidden="true">↗</span></a></div><button type="button" aria-label="Dismiss privacy update">Close</button>';
  const close = notice.querySelector('button');
  close.addEventListener('click', () => notice.remove());
  document.body.append(notice);
  close.focus();
}

function initGuideRecords() {
  const root = document.querySelector('[data-guide-records]');
  if (!root) return;

  const form = root.querySelector('[data-record-form]');
  const list = root.querySelector('[data-record-list]');
  const status = root.querySelector('[data-record-status]');
  const recordId = form.elements.namedItem('recordId');
  const submitButton = root.querySelector('[data-record-submit]');

  const fieldLimits = {
    board: 120,
    firmware: 120,
    supply: 240,
    expected: 1000,
    observed: 1000,
    steps: 1600,
    change: 1000,
    result: 1000,
    next: 1000
  };
  let databasePromise;

  function openDatabase() {
    if (databasePromise) return databasePromise;
    databasePromise = new Promise((resolve, reject) => {
      const opening = indexedDB.open('js-central-guide-records', 1);
      opening.onupgradeneeded = () => {
        if (!opening.result.objectStoreNames.contains('records')) {
          opening.result.createObjectStore('records', { keyPath: 'id' });
        }
      };
      opening.onsuccess = () => {
        opening.result.onversionchange = () => opening.result.close();
        resolve(opening.result);
      };
      opening.onerror = () => reject(opening.error || new Error('Could not open browser storage.'));
      opening.onblocked = () => reject(new Error('Close other site tabs to update browser storage.'));
    });
    return databasePromise;
  }

  function validateRecord(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    if (Object.keys(value).some(key => !Object.hasOwn(fieldLimits, key))) return null;
    const record = {};
    for (const [field, maxLength] of Object.entries(fieldLimits)) {
      const fieldValue = value[field] ?? '';
      if (typeof fieldValue !== 'string' || fieldValue.length > maxLength) return null;
      record[field] = fieldValue;
    }
    return Object.values(record).some(field => field.trim().length > 0) ? record : null;
  }

  async function readRecords() {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('records', 'readonly');
      const request = transaction.objectStore('records').getAll();
      request.onsuccess = () => resolve(request.result.sort((first, second) => second.updatedAt - first.updatedAt).slice(0, 50));
      request.onerror = () => reject(request.error || new Error('Could not read saved records.'));
    });
  }

  async function saveRecord(data, id) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('records', 'readwrite');
      const store = transaction.objectStore('records');
      let savedRecord;
      let failure;
      transaction.oncomplete = () => resolve(savedRecord);
      transaction.onabort = () => reject(failure || transaction.error || new Error('Could not save the record.'));

      if (id) {
        const lookup = store.get(id);
        lookup.onsuccess = () => {
          if (!lookup.result) {
            failure = new Error('That saved record no longer exists.');
            transaction.abort();
            return;
          }
          savedRecord = { ...lookup.result, data, updatedAt: Date.now() };
          store.put(savedRecord);
        };
        lookup.onerror = () => { failure = lookup.error; };
        return;
      }

      const count = store.count();
      count.onsuccess = () => {
        if (count.result >= 50) {
          failure = new Error('This browser has reached the 50-record limit.');
          transaction.abort();
          return;
        }
        const now = Date.now();
        savedRecord = { id: crypto.randomUUID(), data, createdAt: now, updatedAt: now };
        store.add(savedRecord);
      };
      count.onerror = () => { failure = count.error; };
    });
  }

  async function deleteRecord(id) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction('records', 'readwrite');
      transaction.objectStore('records').delete(id);
      transaction.oncomplete = resolve;
      transaction.onabort = () => reject(transaction.error || new Error('Could not delete the record.'));
    });
  }

  function showEmpty(message) {
    const empty = document.createElement('p');
    empty.className = 'guide-record-empty';
    empty.textContent = message;
    list.replaceChildren(empty);
  }

  function renderRecords(records) {
    if (!records.length) {
      showEmpty('No saved test records yet.');
      return;
    }

    const items = records.map(record => {
      const item = document.createElement('article');
      item.className = 'guide-record-item';
      const details = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = record.data.board || 'Untitled test record';
      const summary = document.createElement('p');
      const updated = new Date(record.updatedAt);
      const date = Number.isNaN(updated.getTime()) ? '' : updated.toLocaleString();
      summary.textContent = [record.data.observed, date].filter(Boolean).join(' · ');
      details.append(title, summary);

      const actions = document.createElement('div');
      actions.className = 'guide-record-item-actions';
      const loadButton = document.createElement('button');
      loadButton.className = 'record-action';
      loadButton.type = 'button';
      loadButton.textContent = 'Load';
      loadButton.addEventListener('click', () => {
        for (const [name, value] of Object.entries(record.data)) {
          const field = form.elements.namedItem(name);
          if (field) field.value = value;
        }
        recordId.value = record.id;
        submitButton.textContent = 'Update record';
        status.textContent = 'Record loaded for editing.';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      const deleteButton = document.createElement('button');
      deleteButton.className = 'record-action';
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', async () => {
        deleteButton.disabled = true;
        try {
          await deleteRecord(record.id);
          if (recordId.value === record.id) {
            form.reset();
            recordId.value = '';
            submitButton.textContent = 'Save record';
          }
          await refreshRecords();
          status.textContent = 'Record deleted.';
        } catch (error) {
          status.textContent = error.message;
          deleteButton.disabled = false;
        }
      });
      actions.append(loadButton, deleteButton);
      item.append(details, actions);
      return item;
    });
    list.replaceChildren(...items);
  }

  async function refreshRecords() {
    renderRecords(await readRecords());
  }

  root.querySelector('[data-record-new]').addEventListener('click', () => {
    form.reset();
    recordId.value = '';
    submitButton.textContent = 'Save record';
    status.textContent = 'New test record.';
    form.elements.namedItem('board').focus();
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = validateRecord(Object.fromEntries([...form.querySelectorAll('[data-record-field]')]
      .map(field => [field.name, field.value])));
    if (!data) {
      status.textContent = 'Add at least one field and check its length.';
      return;
    }
    const id = recordId.value;
    submitButton.disabled = true;
    status.textContent = id ? 'Updating record…' : 'Saving record…';
    try {
      await saveRecord(data, id);
      await refreshRecords();
      status.textContent = id ? 'Record updated.' : 'Record saved.';
    } catch (error) {
      status.textContent = error.message;
    } finally {
      submitButton.disabled = false;
    }
  });

  refreshRecords().catch(error => {
    showEmpty('Saved records are available in this browser only.');
    status.textContent = error.message;
  });
}

function scheduleSeasonalRefresh() {
  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setHours(24, 0, 0, 0);
  setTimeout(() => {
    initSeasonalExperience();
    scheduleSeasonalRefresh();
  }, nextMidnight - now);
}

document.addEventListener('DOMContentLoaded', () => {
  initSeasonalExperience();
  initGuideRecords();
  initShareAction();
  initPrivacyNotice();
  scheduleSeasonalRefresh();
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.dataset.theme = 'dark';
    icon.textContent = '○';
  }

  toggle.addEventListener('click', () => {
    const isDark = document.body.dataset.theme === 'dark';
    document.body.dataset.theme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    icon.textContent = isDark ? '◐' : '○';
  });

  document.addEventListener('keydown', event => {
    if (event.key.toLowerCase() === 'j' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      document.body.classList.toggle('is-party');
    }
  });

  const labOutput = document.querySelector('[data-lab-output]');
  const labCount = document.querySelector('[data-lab-count]');
  const labLaunchpad = document.querySelector('[data-lab-launchpad]');
  const labPrompts = [
    'Make one button impossible to ignore.',
    'Build a page for a sound you cannot name.',
    'Turn a boring status message into a tiny story.',
    'Give the next click a little personality.',
    'Make the interface react before the user does.'
  ];
  let labClicks = 0;
  if (labOutput && labCount && labLaunchpad) {
    document.querySelector('[data-lab-spark]')?.addEventListener('click', () => {
      labClicks += 1;
      labLaunchpad.classList.remove('glitching');
      void labLaunchpad.offsetWidth;
      labLaunchpad.classList.add('glitching');
      labOutput.textContent = ['A pixel escaped.', 'The layout blinked first.', 'Signal found a shortcut.'][labClicks % 3];
      labCount.textContent = `${labClicks} ${labClicks === 1 ? 'glitch' : 'glitches'} made at the bench.`;
    });
    document.querySelector('[data-lab-prompt]')?.addEventListener('click', () => {
      labClicks += 1;
      labOutput.textContent = labPrompts[labClicks % labPrompts.length];
      labCount.textContent = `Prompt ${String(labClicks).padStart(2, '0')} / take it somewhere interesting.`;
    });
  }

  const pulseButton = document.getElementById('pulse-button');
  const pulseLine = document.getElementById('pulse-line');
  const pulseCount = document.getElementById('pulse-count');
  if (pulseButton && pulseLine && pulseCount) {
    let count = 0;
    pulseButton.addEventListener('click', () => {
      count += 1;
      pulseCount.textContent = String(count).padStart(2, '0');
      pulseLine.classList.remove('active');
      void pulseLine.offsetWidth;
      pulseLine.classList.add('active');
    });
  }

  const hueSlider = document.getElementById('hue-slider');
  const saturationSlider = document.getElementById('saturation-slider');
  const lightnessSlider = document.getElementById('lightness-slider');
  const colorSwatch = document.getElementById('color-swatch');
  const colorValue = document.getElementById('color-value');
  const colorLabels = {
    hue: document.getElementById('hue-value'),
    saturation: document.getElementById('saturation-value'),
    lightness: document.getElementById('lightness-value')
  };

  function updateColor() {
    const hue = hueSlider.value;
    const saturation = saturationSlider.value;
    const lightness = lightnessSlider.value;
    const hsl = `hsl(${hue} ${saturation}% ${lightness}%)`;
    const hex = hslToHex(Number(hue), Number(saturation), Number(lightness));
    colorSwatch.style.background = hsl;
    colorValue.textContent = hex;
    colorLabels.hue.textContent = `${hue}°`;
    colorLabels.saturation.textContent = `${saturation}%`;
    colorLabels.lightness.textContent = `${lightness}%`;
  }

  function hslToHex(hue, saturation, lightness) {
    saturation /= 100;
    lightness /= 100;
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const segment = hue / 60;
    const second = chroma * (1 - Math.abs(segment % 2 - 1));
    const match = lightness - chroma / 2;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (segment < 1) [red, green] = [chroma, second];
    else if (segment < 2) [red, green] = [second, chroma];
    else if (segment < 3) [green, blue] = [chroma, second];
    else if (segment < 4) [green, blue] = [second, chroma];
    else if (segment < 5) [red, blue] = [second, chroma];
    else [red, blue] = [chroma, second];
    return `#${[red, green, blue].map(value => Math.round((value + match) * 255).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
  }

  if (hueSlider && saturationSlider && lightnessSlider && colorSwatch && colorValue) {
    [hueSlider, saturationSlider, lightnessSlider].forEach(slider => slider.addEventListener('input', updateColor));
    updateColor();
  }

  document.getElementById('copy-color')?.addEventListener('click', async event => {
    await navigator.clipboard?.writeText(colorValue.textContent);
    event.currentTarget.textContent = 'Copied';
    setTimeout(() => { event.currentTarget.textContent = 'Copy code'; }, 1200);
  });

  const reactionField = document.getElementById('reaction-field');
  const reactionMessage = document.getElementById('reaction-message');
  const reactionTime = document.getElementById('reaction-time');
  const reactionBest = document.getElementById('reaction-best');
  let reactionStart = 0;
  let reactionTimer;
  let reactionState = 'ready';
  let bestTime = Infinity;
  reactionField?.addEventListener('click', () => {
    if (reactionState === 'ready' || reactionState === 'result') {
      reactionState = 'waiting';
      reactionField.classList.remove('go', 'too-soon');
      reactionMessage.textContent = 'Wait for it...';
      reactionTime.textContent = 'Do not click yet';
      reactionTimer = setTimeout(() => {
        reactionState = 'go';
        reactionStart = performance.now();
        reactionField.classList.add('go');
        reactionMessage.textContent = 'NOW';
        reactionTime.textContent = 'Click';
      }, 1200 + Math.random() * 2200);
    } else if (reactionState === 'waiting') {
      clearTimeout(reactionTimer);
      reactionState = 'result';
      reactionField.classList.add('too-soon');
      reactionMessage.textContent = 'Too soon';
      reactionTime.textContent = 'Click to try again';
    } else if (reactionState === 'go') {
      const time = Math.round(performance.now() - reactionStart);
      reactionState = 'result';
      bestTime = Math.min(bestTime, time);
      reactionMessage.textContent = `${time} ms`;
      reactionTime.textContent = 'Click to try again';
      reactionBest.textContent = `${bestTime} ms`;
    }
  });
});
