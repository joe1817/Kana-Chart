(function() {
	const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	const savedHiragana = localStorage.getItem("kana.hiragana") || "show";
	const savedKatakana = localStorage.getItem("kana.katakana") || "show";
	const savedObsolete = localStorage.getItem("kana.obsolete") || "hide";
	const savedTheme    = localStorage.getItem("kana.theme")    || (systemPrefersDark ? "shinjuku" : "koshi");
	const savedLabels   = localStorage.getItem("kana.labels")   || "show";
	const savedRomaji   = localStorage.getItem("kana.romaji")   || "show";
	const savedView     = localStorage.getItem("kana.view")     || "relaxed";
	const savedColumns  = localStorage.getItem("kana.columns")  || "auto";
	const savedMode     = localStorage.getItem("kana.mode")     || "finite";

	if (savedHiragana === "hide") document.documentElement.classList.add("hide-hiragana");
	if (savedKatakana === "hide") document.documentElement.classList.add("hide-katakana");
	if (savedObsolete === "hide") document.documentElement.classList.add("hide-obsolete");
	document.documentElement.classList.add(`theme-${savedTheme}`);
	if (savedLabels === "hide") document.documentElement.classList.add("hide-labels");
	if (savedRomaji === "hide") document.documentElement.classList.add("hide-romaji");
	if (savedView === "compact") document.documentElement.classList.add("view-compact");
	if (savedColumns === "1col") document.documentElement.classList.add("columns-1col");
	if (savedMode === "endless") document.documentElement.classList.add("mode-endless");
})();

window.addEventListener("load", () => {

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
	const labelsToggle = document.getElementById("toggle-labels");
	const romajiToggle = document.getElementById("toggle-romaji");
	const compactToggle = document.getElementById("toggle-compact");
	const buttonColumns = document.getElementById("button-columns");
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

	labelsToggle.addEventListener("change", function() {
		if (this.checked) {
			document.documentElement.classList.remove("hide-labels");
			localStorage.setItem("kana.labels", "show");
		} else {
			document.documentElement.classList.add("hide-labels");
			localStorage.setItem("kana.labels", "hide");
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

	compactToggle.addEventListener("change", function() {
		if (this.checked) {
			document.documentElement.classList.add("view-compact");
			localStorage.setItem("kana.view", "compact");
		} else {
			document.documentElement.classList.remove("view-compact");
			localStorage.setItem("kana.view", "normal");
		}
	});

	buttonColumns.addEventListener("click", function() {
		if (this.innerText === "Auto") {
			document.documentElement.classList.add("columns-1col");
			buttonColumns.innerText = "1 Column";
			localStorage.setItem("kana.columns", "1col");
		} else {
			document.documentElement.classList.remove("columns-1col");
			buttonColumns.innerText = "Auto";
			localStorage.setItem("kana.columns", "auto");
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
	labelsToggle.checked    = !document.documentElement.classList.contains("hide-labels");
	romajiToggle.checked    = !document.documentElement.classList.contains("hide-romaji");
	compactToggle.checked   = document.documentElement.classList.contains("view-compact");
	buttonColumns.innerText = document.documentElement.classList.contains("columns-1col") ? "1 Column" : "Auto";
	endlessToggle.checked   = document.documentElement.classList.contains("mode-endless");

	hiraganaToggle.disabled = !katakanaToggle.checked;
	katakanaToggle.disabled = !hiraganaToggle.checked;

	document.getElementById("button-hide-header").addEventListener("click", function() {
		document.documentElement.classList.toggle("hide-header");
		this.innerText = (this.innerText === "[-]" ? "[+]" : "[-]");
	});
});
