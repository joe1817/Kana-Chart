(function() {
	const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	const savedHiragana = localStorage.getItem("kana.hiragana") || "show";
	const savedKatakana = localStorage.getItem("kana.katakana") || "show";
	const savedObsolete = localStorage.getItem("kana.obsolete") || "hide";
	const savedTheme    = localStorage.getItem("kana.theme")    || (systemPrefersDark ? "amemachi" : "miko");
	const savedHeaders  = localStorage.getItem("kana.headers")  || "show";
	const savedRomaji   = localStorage.getItem("kana.romaji")   || "show";
	const savedHints    = localStorage.getItem("kana.hints")    || "hide";
	const savedView     = localStorage.getItem("kana.view")     || "relaxed";
	const savedChart    = localStorage.getItem("kana.chart")    || "normal";
	const savedMode     = localStorage.getItem("kana.mode")     || "finite";

	if (savedHiragana === "hide") document.documentElement.classList.add("hide-hiragana");
	if (savedKatakana === "hide") document.documentElement.classList.add("hide-katakana");
	if (savedObsolete === "hide") document.documentElement.classList.add("hide-obsolete");
	document.documentElement.classList.add(`theme-${savedTheme}`);
	if (savedHeaders === "hide") document.documentElement.classList.add("hide-headers");
	if (savedRomaji === "hide") document.documentElement.classList.add("hide-romaji");
	if (savedHints === "hide") document.documentElement.classList.add("hide-hints");
	if (savedView === "compact") document.documentElement.classList.add("view-compact");
	if (savedChart === "extended") document.documentElement.classList.add("show-extended");
	if (savedMode === "endless") document.documentElement.classList.add("mode-endless");
})();

window.addEventListener("hashchange", () => {
	const currentHash = window.location.hash || "#charts";

	const pageTitle = document.getElementById("page-title");
	const switchViewButton = document.getElementById("switch-view-btn");

	if (currentHash === "#charts") {
		document.title = "Kana Chart";
		pageTitle.innerText = "Kana Chart";
		switchViewButton.href = "#flashcards";
		switchViewButton.title = "Flashcards";
	} else if (currentHash === "#flashcards") {
		initDeck();
		document.title = "Kana Flashcards";
		pageTitle.innerText = "Kana Flashcards";
		switchViewButton.href = "#charts";
		switchViewButton.title = "Chart";
	} else {
		document.title = "Flashcard Results";
		pageTitle.innerText = "Kana Flashcards";
		switchViewButton.href = "#charts";
		switchViewButton.title = "Chart";
	}

	document.querySelectorAll(".view").forEach((view) => {
		view.style.display = "none";
	});

	const activeView = document.querySelector(currentHash);
	if (activeView) {
		activeView.style.display = "flex";
	}
});

window.addEventListener("load", () => {
	window.dispatchEvent(new HashChangeEvent("hashchange")); // show default view

	if (navigator.maxTouchPoints > 0) {
		document.documentElement.classList.add("touchscreen");
	}

	//settings drawer

	const settingsBtn = document.getElementById("settings-btn");
	const closeBtn = document.getElementById("close-drawer");
	const drawer = document.getElementById("settings-drawer");
	const overlay = document.getElementById("drawer-overlay");

	function toggleDrawer() {
		drawer.classList.toggle("open");
		overlay.classList.toggle("visible");
	}

	settingsBtn.addEventListener("click", toggleDrawer);
	closeBtn.addEventListener("click", toggleDrawer);
	overlay.addEventListener("click", toggleDrawer);

	//settings

	const hiraganaToggle = document.getElementById("toggle-hiragana");
	const katakanaToggle = document.getElementById("toggle-katakana");
	const obsoleteToggle = document.getElementById("toggle-obsolete");
	const themeSelect = document.getElementById("select-theme");
	const headersToggle = document.getElementById("toggle-headers");
	const romajiToggle = document.getElementById("toggle-romaji");
	const hintsToggle = document.getElementById("toggle-hints");
	const compactToggle = document.getElementById("toggle-compact");
	const extendedToggle = document.getElementById("toggle-extended");
	const endlessToggle = document.getElementById("toggle-endless");

	hiraganaToggle.addEventListener("change", function() {
		if (this.checked) {
			document.documentElement.classList.remove("hide-hiragana");
			localStorage.setItem("kana.hiragana", "show");
			katakanaToggle.disabled = false;
		} else {
			document.documentElement.classList.add("hide-hiragana");
			localStorage.setItem("kana.hiragana", "hide");
			katakanaToggle.disabled = true;
		}
	});

	katakanaToggle.addEventListener("change", function() {
		if (this.checked) {
			document.documentElement.classList.remove("hide-katakana");
			localStorage.setItem("kana.katakana", "show");
			hiraganaToggle.disabled = false;
		} else {
			document.documentElement.classList.add("hide-katakana");
			localStorage.setItem("kana.katakana", "hide");
			hiraganaToggle.disabled = true;
		}
	});

	obsoleteToggle.addEventListener("change", function() {
		if (this.checked) {
			document.documentElement.classList.remove("hide-obsolete");
			localStorage.setItem("kana.obsolete", "show");
		} else {
			document.documentElement.classList.add("hide-obsolete");
			localStorage.setItem("kana.obsolete", "hide");
		}
	});

	themeSelect.addEventListener("change", function() {
		document.documentElement.classList.add("transitions-disabled");
		const currentTheme = [...document.documentElement.classList].find(cls => cls.startsWith("theme-"));
		const newTheme = "theme-" + this.value;
		if (currentTheme) document.documentElement.classList.replace(currentTheme, newTheme);
		else el.classList.add(newTheme);
		setTimeout(() => {
			document.documentElement.classList.remove("transitions-disabled");
		}, 300);
		localStorage.setItem("kana.theme", this.value);
	});

	headersToggle.addEventListener("change", function() {
		if (this.checked) {
			document.documentElement.classList.remove("hide-headers");
			localStorage.setItem("kana.headers", "show");
		} else {
			document.documentElement.classList.add("hide-headers");
			localStorage.setItem("kana.headers", "hide");
		}
	});

	romajiToggle.addEventListener("change", function() {
		if (this.checked) {
			document.documentElement.classList.remove("hide-romaji");
			localStorage.setItem("kana.romaji", "show");
		} else {
			document.documentElement.classList.add("hide-romaji");
			localStorage.setItem("kana.romaji", "hide");
		}
	});

	hintsToggle.addEventListener("change", function() {
		if (this.checked) {
			document.documentElement.classList.remove("hide-hints");
			localStorage.setItem("kana.hints", "show");
		} else {
			document.documentElement.classList.add("hide-hints");
			localStorage.setItem("kana.hints", "hide");
		}
	});

	compactToggle.addEventListener("change", function() {
		if (this.checked) {
			document.documentElement.classList.add("view-compact");
			localStorage.setItem("kana.view", "compact");
		} else {
			document.documentElement.classList.remove("view-compact");
			localStorage.setItem("kana.view", "normal");
		}
	});

	extendedToggle.addEventListener("change", function() {
		if (this.checked) {
			document.documentElement.classList.add("show-extended");
			localStorage.setItem("kana.chart", "extended");
		} else {
			document.documentElement.classList.remove("show-extended");
			localStorage.setItem("kana.chart", "normal");
		}
	});

	endlessToggle.addEventListener("change", function() {
		if (this.checked) {
			document.documentElement.classList.add("mode-endless");
			localStorage.setItem("kana.mode", "endless");
		} else {
			document.documentElement.classList.remove("mode-endless");
			localStorage.setItem("kana.mode", "finite");
		}
	});

	const themeClass = [...document.documentElement.classList].find(cls => cls.startsWith("theme-"));
	const themeName = themeClass ? themeClass.replace("theme-", "") : null;

	hiraganaToggle.checked  = !document.documentElement.classList.contains("hide-hiragana");
	katakanaToggle.checked  = !document.documentElement.classList.contains("hide-katakana");
	obsoleteToggle.checked  = !document.documentElement.classList.contains("hide-obsolete");
	themeSelect.value       = themeName;
	headersToggle.checked   = !document.documentElement.classList.contains("hide-headers");
	romajiToggle.checked    = !document.documentElement.classList.contains("hide-romaji");
	hintsToggle.checked     = !document.documentElement.classList.contains("hide-hints");
	compactToggle.checked   = document.documentElement.classList.contains("view-compact");
	extendedToggle.checked  = document.documentElement.classList.contains("show-extended");
	endlessToggle.checked   = document.documentElement.classList.contains("mode-endless");

	hiraganaToggle.disabled = !katakanaToggle.checked;
	katakanaToggle.disabled = !hiraganaToggle.checked;

	const charts = document.getElementsByClassName("chart-group");
	const views = document.getElementsByClassName("view");
	document.getElementById("button-hide-header").addEventListener("click", function() {
		for (const chart of charts) {
			chart.style.transition = "min-height 0.3s ease-out";
		}
		for (const view of views) {
			view.style.transition = "min-height 0.3s ease-out";
		}
		document.documentElement.classList.toggle("hide-page-header");
		this.innerText = (this.innerText === "[-]" ? "[+]" : "[-]");
		setTimeout(() => {
			for (const chart of charts) {
				chart.style.transition = "none";
			}
			for (const view of views) {
				view.style.transition = "none";
			}
		}, 300);
	});
});
