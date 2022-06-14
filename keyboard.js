(() => {
    function e(e) {
        const t = e.color || "default",
            o = e.size || "1u", s = "object" == typeof e.key ? e.key.en : e.key,
            n = document.createElement("button");
        return n.classList.add("btn"),
            n.classList.add(`btn--${t}`),
            n.classList.add(`btn--${o}`),
            n.setAttribute("tabindex", "-1"),
            n.value = e.code,
            e.system && n.insertAdjacentHTML("beforeend", `<span class="btn__syskey">${s}</span>`),
            e.altkey && n.insertAdjacentHTML("beforeend", `<span class="btn__altkey">${e.altkey.en}</span>`),
            e.system || n.insertAdjacentHTML("beforeend", `<span class="btn__stdkey">${s}</span>`),
            e.icon && (n.innerHTML = `<i class="material-icons">${e.icon}</i>`),
            e.hasLed && n.insertAdjacentHTML("beforeend", '<div class="btn__led"></div>'),
            n
    } function t(e) {
        return e.selectionEnd
    }
    function o(e, t) {
        t < 0 ? e.setSelectionRange(0, 0) :
            t > e.value.length ? e.setSelectionRange(e.value.length, e.value.length) :
                e.setSelectionRange(t, t)
    } function s(e, t) {
        return t < 0 || t > e.length ? e : e.slice(0, t) + e.slice(t + 1)
    }
    const n = new class {
        constructor(t) {
            this.keyboard = function (t) {
                const o = document.createElement("div");
                o.className = "virtual-keyboard";
                for (let s = 0; s < t.length; s += 1) {
                    const n = t[s],
                        a = document.createElement("div");
                    a.className = "virtual-keyboard__row";
                    for (let t = 0;
                        t < n.length;
                        t += 1) {
                        const o = e(n[t]);
                        a.append(o)
                    } o.append(a)
                }
                return o;
            }
                (t), this.buttonSet = function (e) {
                    const t = {};
                    return e.forEach((e => {
                        e.forEach((e => {
                            const o = { [e.code]: e };
                            Object.assign(t, o)
                        }))
                    })), t
                }
                    (t), this.state = { caps: !1, shift: !1, lang: "en" },
                this.keyboard.addEventListener("mousedown",
                    this.virtualKeyboardClickHandler.bind(this)),
                this.keyboard.addEventListener("mouseup",
                    this.virtualKeyboardClickHandler.bind(this)),
                window.addEventListener("keydown", this.realKeyboardKeyHandler.bind(this)),
                window.addEventListener("keyup",
                    this.realKeyboardKeyHandler.bind(this))
        } setInput(e) { this.input = e } virtualKeyboardClickHandler(e) {
            const t = e.target.closest("button");
            t && this.processButton(t.value, e)
        }
        realKeyboardKeyHandler(e) { this.buttonSet[e.code] && (e.preventDefault(), this.processButton(e.code, e)) }
        updateVirtualKeyboard() {
            this.state.caps ? this.keyboard.classList.add("virtual-keyboard--caps") :
                this.keyboard.classList.remove("virtual-keyboard--caps"), this.state.shift ? this.keyboard.classList.add("virtual-keyboard--shift") :
                    this.keyboard.classList.remove("virtual-keyboard--shift")
        }
        switchLang(e) {
            const t = this.keyboard.querySelectorAll("button");
            localStorage.setItem("lang", e), this.state.lang = e;
            for (let o = 0;
                o < t.length;
                o += 1)
                if ("object" == typeof
                    this.buttonSet[t[o].value].key && this.buttonSet[t[o].value].key[e] && (t[o].querySelector(".btn__stdkey").textContent = this.buttonSet[t[o].value].key[e]),
                    this.buttonSet[t[o].value].altkey)
                    if (null === this.buttonSet[t[o].value].altkey[e]) t[o].querySelector(".btn__altkey")?.remove();
                    else {
                        t[o].querySelector(".btn__altkey") || t[o].insertAdjacentHTML("afterbegin", '<span class="btn__altkey"></span>');
                        let s = this.buttonSet[t[o].value].altkey.en;
                        this.buttonSet[t[o].value].altkey[e] && (s = this.buttonSet[t[o].value].altkey[e]), t[o].querySelector(".btn__altkey").textContent = s
                    }
        }
        processButton(e, n) {
            if ("keydown" === n.type && (document.querySelector(`button[value=${e}`).classList.remove("btn--default"),
                document.querySelector(`button[value=${e}`).classList.add("btn--pressed")), "keyup" === n.type && (document.querySelector(`button[value=${e}`).classList.add("btn--default"),
                    document.querySelector(`button[value=${e}`).classList.remove("btn--pressed")), "CapsLock" !== e)
                if ("ShiftLeft" !== e && "ShiftRight" !== e)
                    if ("Backspace" !== e)
                        if ("Delete" !== e) {
                            if (("ControlLeft" === e || "ControlRight" === e) && n.altKey || ("Command" === e || "Command" === e) && n.ctrlKey) "mousedown" !== n.type && "keydown" !== n.type || !0 === n.repeat || (this.state.lang = "ru" === this.state.lang ? "en" : "ru",
                                this.switchLang(this.state.lang));
                            else
                                if (!this.buttonSet[e].noAction) {
                                    if ("mousedown" === n.type || "keydown" === n.type) {
                                        let s = "";
                                        const n = t(this.input);
                                        s = "object" == typeof
                                            this.buttonSet[e].key ? this.buttonSet[e].key[this.state.lang] : this.buttonSet[e].key, this.state.shift && this.buttonSet[e].altkey && (void 0 === this.buttonSet[e].altkey[this.state.lang] && (s = this.buttonSet[e].altkey.en), this.buttonSet[e].altkey[this.state.lang] && (s = this.buttonSet[e].altkey[this.state.lang])), s = this.state.caps && !this.state.shift || !this.state.caps && this.state.shift ? s.toUpperCase() : s, this.input.value = (i = s, r = n, (a = this.input.value).slice(0, r) + i + a.slice(r)), o(this.input, n + 1)
                                    }
                                    var a, i, r; this.input.focus()
                                }
                        }
                        else {
                            if ("mousedown" === n.type || "keydown" === n.type) {
                                const e = t(this.input);
                                this.input.value = s(this.input.value, e), o(this.input, e)
                            }
                            this.input.focus()
                        }
                    else {
                        if ("mousedown" === n.type || "keydown" === n.type) {
                            const e = t(this.input);
                            this.input.value = s(this.input.value, e - 1), o(this.input, e - 1)
                        }
                        this.input.focus()
                    }
                else {
                    if (("mouseup" === n.type || "keyup" === n.type) && this.state.shift)
                        return this.state.shift = !1, void this.updateVirtualKeyboard();
                    if (this.state.shift)
                        return;
                    "mousedown" !== n.type && "keydown" !== n.type || (this.state.shift = !0, this.updateVirtualKeyboard())
                }
            else "mouseup" !== n.type && "keyup" !== n.type || (this.state.caps = !this.state.caps, this.updateVirtualKeyboard())
        }
    }
        ([[{ key: { en: "<", ru: "§" }, code: "Backquote", altkey: { en: "± §", ru: null } },
        { key: "1", code: "Digit1", altkey: { en: "!" } },
        { key: "2", code: "Digit2", altkey: { en: "@", ru: '"' } },
        { key: "3", code: "Digit3", altkey: { en: "#", ru: "№" } },
        { key: "4", code: "Digit4", altkey: { en: "$", ru: "%" } },
        { key: "5", code: "Digit5", altkey: { en: "%" } },
        { key: "6", code: "Digit6", altkey: { en: "^", ru: ":" } },
        { key: "7", code: "Digit7", altkey: { en: "&", ru: "?" } },
        { key: "8", code: "Digit8", altkey: { en: "*" } },
        { key: "9", code: "Digit9", altkey: { en: "(" } },
        { key: "0", code: "Digit0", altkey: { en: ")" } },
        { key: "-", code: "Minus", altkey: { en: "_" } },
        { key: "=", code: "Equal", altkey: { en: "+" } },
        { key: "Backspace", code: "Backspace", color: "mod", size: "auto", icon: "⌫", system: !0 }],
        [{ key: "/t", code: "Tab", color: "mod", size: "1_5u", icon: "⇥", system: !0 },
        { key: { en: "q", ru: "й" }, code: "KeyQ" }, { key: { en: "w", ru: "ц" }, code: "KeyW" },
        { key: { en: "e", ru: "у" }, code: "KeyE" }, { key: { en: "r", ru: "к" }, code: "KeyR" },
        { key: { en: "t", ru: "е" }, code: "KeyT" }, { key: { en: "y", ru: "н" }, code: "KeyY" },
        { key: { en: "u", ru: "г" }, code: "KeyU" }, { key: { en: "i", ru: "ш" }, code: "KeyI" },
        { key: { en: "o", ru: "щ" }, code: "KeyO" }, { key: { en: "p", ru: "з" }, code: "KeyP" },
        { key: { en: "[", ru: "х" }, code: "BracketLeft", altkey: { en: "{", ru: null } },
        { key: { en: "]", ru: "ъ" }, code: "BracketRight", altkey: { en: "}", ru: null } },
        { key: "\\", code: "Backslash", altkey: { en: "|" }, color: "mod", size: "auto" }],
        [{ key: "Caps", code: "CapsLock", color: "mod", size: "auto", hasLed: !0, icon: "⇪", system: !0 },
        { key: { en: "a", ru: "ф" }, code: "KeyA" }, { key: { en: "s", ru: "ы" }, code: "KeyS" },
        { key: { en: "d", ru: "в" }, code: "KeyD" }, { key: { en: "f", ru: "а" }, code: "KeyF" },
        { key: { en: "g", ru: "п" }, code: "KeyG" }, { key: { en: "h", ru: "р" }, code: "KeyH" },
        { key: { en: "j", ru: "о" }, code: "KeyJ" }, { key: { en: "k", ru: "л" }, code: "KeyK" },
        { key: { en: "l", ru: "д" }, code: "KeyL" }, { key: { en: ";", ru: "ж" }, code: "Semicolon", altkey: { en: ":", ru: null } },
        { key: { en: "'", ru: "э" }, code: "Quote", altkey: { en: '"', ru: null } },
        { key: "\n", code: "Enter", color: "mod", size: "auto", icon: "↵", system: !0 }],
        [{ key: "↑", code: "ArrowUp", color: "mod", size: "1_5u", icon: "↑", system: !0 },
        { key: { en: "z", ru: "я" }, code: "KeyZ" }, { key: { en: "x", ru: "ч" }, code: "KeyX" },
        { key: { en: "c", ru: "с" }, code: "KeyC" }, { key: { en: "v", ru: "м" }, code: "KeyV" },
        { key: { en: "b", ru: "и" }, code: "KeyB" }, { key: { en: "n", ru: "т" }, code: "KeyN" },
        { key: { en: "m", ru: "ь" }, code: "KeyM" }, { key: { en: ",", ru: "б" }, code: "Comma", altkey: { en: "<", ru: null } },
        { key: { en: ".", ru: "ю" }, code: "Period", altkey: { en: ">", ru: null } },
        { key: { en: "/", ru: "." }, code: "Slash", altkey: { en: "?", ru: "," } },
        { key: "↑", code: "ArrowUp", color: "mod", size: "3_5u", icon: "↑", system: !0 },
        { key: "⇧", code: "ShiftRight", color: "mod", size: "2u", system: !0 }],
        [{ key: "fn", code: "function", color: "mod", size: "1_25u", system: !0, noAction: !0 },
        { key: "control", code: "ControlLeft", color: "mod", size: "1_25u", system: !0, noAction: !0 },
        { key: "option", code: "MetaLeft", color: "mod", size: "1_25u", system: !0, noAction: !0 },
        { key: "command", code: "AltLeft", color: "mod", size: "1_25u", system: !0, noAction: !0 },
        { key: " ", code: "Space", size: "auto", icon: "", system: !0 },
        { key: "command", code: "AltRight", color: "mod", size: "1_25u", system: !0, noAction: !0 },
        { key: "option", code: "ControlRight", color: "mod", size: "1_25u", system: !0, noAction: !0 },
        { key: "←", code: "ArrowLeft", color: "mod", size: "1.1u", icon: "←", system: !0 },
        { key: "↓", code: "ArrowDown", color: "mod", size: "1.1u", icon: "↓", system: !0 },
        { key: "→", code: "ArrowRight", color: "mod", size: "1.1u", icon: "→", system: !0 }]]),
        a = document.createElement("textarea"),
        i = document.createElement("div"),
        r = document.createElement("div");
    a.className = "virtual-keyboard__textarea",
        i.className = "container", r.className = "info",
        i.append(a), i.append(n.keyboard), i.append(r), document.body.append(i), n.setInput(a);
    const c = localStorage.getItem("lang") || "en";
    n.switchLang(c), a.focus()
})();

