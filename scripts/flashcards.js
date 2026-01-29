function goBack() {
	initDeck();
	window.location = "#flashcards";
}

const hiraData = [
	{ k: "あ", r: "a", c: "hira"},
	{ k: "い", r: "i", c: "hira"},
	{ k: "う", r: "u", c: "hira"},
	{ k: "え", r: "e", c: "hira"},
	{ k: "お", r: "o", c: "hira"},

	{ k: "か", r: "ka", c: "hira"},
	{ k: "き", r: "ki", c: "hira"},
	{ k: "く", r: "ku", c: "hira"},
	{ k: "け", r: "ke", c: "hira"},
	{ k: "こ", r: "ko", c: "hira"},

	{ k: "さ", r: "sa", c: "hira"},
	{ k: "し", r: "shi", c: "hira"},
	{ k: "す", r: "su", c: "hira"},
	{ k: "せ", r: "se", c: "hira"},
	{ k: "そ", r: "so", c: "hira"},

	{ k: "た", r: "ta", c: "hira"},
	{ k: "ち", r: "chi", c: "hira"},
	{ k: "つ", r: "tsu", c: "hira"},
	{ k: "て", r: "te", c: "hira"},
	{ k: "と", r: "to", c: "hira"},

	{ k: "な", r: "na", c: "hira"},
	{ k: "に", r: "ni", c: "hira"},
	{ k: "ぬ", r: "nu", c: "hira"},
	{ k: "ね", r: "ne", c: "hira"},
	{ k: "の", r: "no", c: "hira"},

	{ k: "は", r: "ha", c: "hira"},
	{ k: "ひ", r: "hi", c: "hira"},
	{ k: "ふ", r: "fu", c: "hira"},
	{ k: "へ", r: "he", c: "hira"},
	{ k: "ほ", r: "ho", c: "hira"},

	{ k: "ま", r: "ma", c: "hira"},
	{ k: "み", r: "mi", c: "hira"},
	{ k: "む", r: "mu", c: "hira"},
	{ k: "め", r: "me", c: "hira"},
	{ k: "も", r: "mo", c: "hira"},

	{ k: "や", r: "ya", c: "hira"},
	{ k: "ゆ", r: "yu", c: "hira"},
	{ k: "よ", r: "yo", c: "hira"},

	{ k: "ら", r: "ra", c: "hira"},
	{ k: "り", r: "ri", c: "hira"},
	{ k: "る", r: "ru", c: "hira"},
	{ k: "れ", r: "re", c: "hira"},
	{ k: "ろ", r: "ro", c: "hira"},

	{ k: "わ", r: "wa", c: "hira"},
	{ k: "を", r: "wo", c: "hira"},

	{ k: "ん", r: "n", c: "hira"}
];

const obsoleteHiraData = [
	{ k: "𛀁", r: "ye", c: "hira"},
	{ k: "ゐ", r: "wi", c: "hira"},
	{ k: "ゑ", r: "we", c: "hira"},
];

const kataData = [
	{ k: "ア", r: "a", c: "kata"},
	{ k: "イ", r: "i", c: "kata"},
	{ k: "ウ", r: "u", c: "kata"},
	{ k: "エ", r: "e", c: "kata"},
	{ k: "オ", r: "o", c: "kata"},

	{ k: "カ", r: "ka", c: "kata"},
	{ k: "キ", r: "ki", c: "kata"},
	{ k: "ク", r: "ku", c: "kata"},
	{ k: "ケ", r: "ke", c: "kata"},
	{ k: "コ", r: "ko", c: "kata"},

	{ k: "サ", r: "sa", c: "kata"},
	{ k: "シ", r: "shi", c: "kata"},
	{ k: "ス", r: "su", c: "kata"},
	{ k: "セ", r: "se", c: "kata"},
	{ k: "ソ", r: "so", c: "kata"},

	{ k: "タ", r: "ta", c: "kata"},
	{ k: "チ", r: "chi", c: "kata"},
	{ k: "ツ", r: "tsu", c: "kata"},
	{ k: "テ", r: "te", c: "kata"},
	{ k: "ト", r: "to", c: "kata"},

	{ k: "ナ", r: "na", c: "kata"},
	{ k: "ニ", r: "ni", c: "kata"},
	{ k: "ヌ", r: "nu", c: "kata"},
	{ k: "ネ", r: "ne", c: "kata"},
	{ k: "ノ", r: "no", c: "kata"},

	{ k: "ハ", r: "ha", c: "kata"},
	{ k: "ヒ", r: "hi", c: "kata"},
	{ k: "フ", r: "fu", c: "kata"},
	{ k: "ヘ", r: "he", c: "kata"},
	{ k: "ホ", r: "ho", c: "kata"},

	{ k: "マ", r: "ma", c: "kata"},
	{ k: "ミ", r: "mi", c: "kata"},
	{ k: "ム", r: "mu", c: "kata"},
	{ k: "メ", r: "me", c: "kata"},
	{ k: "モ", r: "mo", c: "kata"},

	{ k: "ヤ", r: "ya", c: "kata"},
	{ k: "ユ", r: "yu", c: "kata"},
	{ k: "ヨ", r: "yo", c: "kata"},

	{ k: "ラ", r: "ra", c: "kata"},
	{ k: "リ", r: "ri", c: "kata"},
	{ k: "ル", r: "ru", c: "kata"},
	{ k: "レ", r: "re", c: "kata"},
	{ k: "ロ", r: "ro", c: "kata"},

	{ k: "ワ", r: "wa", c: "kata"},
	{ k: "ヲ", r: "wo", c: "kata"},

	{ k: "ン", r: "n", c: "kata"}
];

const obsoleteKataData = [
	{ k: "ヰ", r: "wi", c: "kata"},
	{ k: "ヱ", r: "we", c: "kata"},
];

class DeckManager {
	constructor(data, isEndless) {
		this.mainDeck = [...data];
		this.focusDeck = [];
		this.isEndless = isEndless;
		this.totalCount = this.mainDeck.length;
		this.remainingCount = this.totalCount;
		this._iterator = null;
	}

	*createIterator() {
		while (this.mainDeck.length > 0 || this.focusDeck.length > 0) {
			let pool;
			let isFocusPull = false;

			if (this.isEndless) {
				if (this.focusDeck.length > 0 && Math.random() < 0.3) {
					pool = this.focusDeck;
				} else {
					pool = this.mainDeck;
				}
			} else {
				pool = this.mainDeck;
			}

			if (pool.length === 0) break;

			const randomIndex = Math.floor(Math.random() * pool.length);
			const item = pool[randomIndex];

			if (!this.isEndless) {
				pool.splice(randomIndex, 1);
				this.remainingCount--;
			}

			yield item;
		}
	}

	iterator() {
		if (this._iterator == null) {
			this._iterator = this.createIterator();
		}
		return this._iterator;
	}

	addToFocus(cardData) {
		if (!this.focusDeck.includes(cardData)) {
			this.focusDeck.push(cardData);
		}
	}

	removeFromFocus(cardData) {
		const idx = this.focusDeck.indexOf(cardData);
		if (idx > -1) {
			this.focusDeck.splice(idx, 1);
		}
	}
}

let deckManager;

function initDeck() {
    const summary = document.getElementById("results-summary");
    const hints = document.getElementById("results-hints");
	const stack = document.getElementById("stack");
	const includeHiragana = document.getElementById("toggle-hiragana").checked;
	const includeKatakana = document.getElementById("toggle-katakana").checked;
	const includeObsolete = document.getElementById("toggle-obsolete").checked;
	const isEndless = document.getElementById("toggle-endless").checked;

	const combinedData = [];
	if (includeHiragana) combinedData.push(...hiraData);
	if (includeHiragana && includeObsolete) combinedData.push(...obsoleteHiraData);
	if (includeKatakana) combinedData.push(...kataData);
	if (includeKatakana && includeObsolete) combinedData.push(...obsoleteKataData);

	deckManager = new DeckManager(combinedData, isEndless);

    summary.innerText = "✨No hints used. Congrats!✨";
    hints.replaceChildren();
    stack.replaceChildren();
	renderNextCard();
	updateCounter(0, deckManager.totalCount);
}

function renderNextCard() {
	const stack = document.getElementById("stack");
	const next = deckManager.iterator().next();

	if (next.done) return false;

	const item = next.value;
	const card = document.createElement("div");

	card.className = "cell kana-card " + item.c;
	card.cardData = item;
	card.innerHTML = `
		<div class="romaji noselect">${item.r}</div>
		<div class="kana noselect">${item.k}</div>
	`;

	setupCardEvents(card, item);
	stack.prepend(card);
	return true;
}

function dismissCard(card) {
	const cardData = card.cardData;
	const wasHinted = card.dataset.hinted === "true";

	if (wasHinted) {
		deckManager.addToFocus(cardData);
	} else {
		deckManager.removeFromFocus(cardData);
	}

	const cardAvailable = renderNextCard();

	card.classList.add("exit");
	if (navigator.vibrate) navigator.vibrate(10);

	if (!deckManager.isEndless) {
		const remaining = deckManager.remainingCount;
		const total = deckManager.totalCount;
		const progress = total - remaining - (cardAvailable ? 1 : 0);
		updateCounter(progress, total);
	}

	setTimeout(() => {
		card.remove();
		// If no cards are left in the DOM and the iterator is exhausted
		if (!cardAvailable) {
			window.location = "#results";
		}
	}, 500);
}

function updateCounter(progress, total) {
	const percentage = (progress / total) * 100;
	document.getElementById("progress-bar").style.width = percentage + "%";
	document.getElementById("cards-left").innerText = `${progress} / ${total}`;

}

function setupCardEvents(card, item) {
	const summary = document.getElementById("results-summary");
	const hints = document.getElementById("results-hints");

	let startX, startY;

	card.addEventListener("pointerdown", (e) => {
		startX = e.clientX;
		startY = e.clientY;

		// Start hold timer (200ms)
		holdTimer = setTimeout(() => {
			card.dataset.hinted = true;

			card.classList.add("show-romaji");
			if (navigator.vibrate) navigator.vibrate(20);

			summary.innerText = "You asked for hints on these:";
			const hinted = document.createElement("div");
			hinted.className = `cell hint ${item.c}`;
			hinted.innerHTML = `
				<span class="kana noselect">${item.k}</span>
				<span class="romaji noselect">${item.r}</span>
			`;
			hints.appendChild(hinted);
		}, 200);
	});

	card.addEventListener("pointerup", (e) => {
		clearTimeout(holdTimer);
		card.classList.remove("show-romaji");

		const diffX = e.clientX - startX;
		const diffY = e.clientY - startY;
		const isPortrait = window.innerHeight > window.innerWidth;

		// Determine if it was a swipe or a tap
		const distance = Math.sqrt(diffX**2 + diffY**2);

		if (distance > 50) {
			// swipe
			if ((isPortrait && diffX > 30) || (!isPortrait && diffY < -30)) {
				dismissCard(card);
			}
		} else {
			// tap
			dismissCard(card);
		}
	});

	card.addEventListener("pointermove", (e) => {
		// If moving too much, cancel the hold timer
		if (Math.abs(e.clientX - startX) > 10) clearTimeout(holdTimer);
	});
}

window.addEventListener("load", () => {
	const hiraganaToggle = document.getElementById("toggle-hiragana");
	const katakanaToggle = document.getElementById("toggle-katakana");
	const obsoleteToggle = document.getElementById("toggle-obsolete");
	const endlessToggle = document.getElementById("toggle-endless");

	hiraganaToggle.addEventListener("change", initDeck);
	katakanaToggle.addEventListener("change", initDeck);
	obsoleteToggle.addEventListener("change", initDeck);
	endlessToggle.addEventListener("change", initDeck);

	initDeck();
});
