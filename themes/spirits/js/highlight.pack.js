!
function (e) {
	"undefined" != typeof exports ? e(exports) : (window.hljs = e({}), "function" == typeof define && define.amd && define("hljs", [], function () {
		return window.hljs
	}))
} (function (e) {
	function n(e) {
		return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
	}
	function t(e) {
		return e.nodeName.toLowerCase()
	}
	function r(e, n) {
		var t = e && e.exec(n);
		return t && 0 == t.index
	}
	function a(e) {
		return /^(no-?highlight|plain|text)$/i.test(e)
	}
	function i(e) {
		var n, t, r, i = e.className + " ";
		if (i += e.parentNode ? e.parentNode.className: "", t = /\blang(?:uage)?-([\w-]+)\b/i.exec(i)) return w(t[1]) ? t[1] : "no-highlight";
		for (i = i.split(/\s+/), n = 0, r = i.length; r > n; n++) if (w(i[n]) || a(i[n])) return i[n]
	}
	function o(e, n) {
		var t, r = {};
		for (t in e) r[t] = e[t];
		if (n) for (t in n) r[t] = n[t];
		return r
	}
	function u(e) {
		var n = [];
		return function r(e, a) {
			for (var i = e.firstChild; i; i = i.nextSibling) 3 == i.nodeType ? a += i.nodeValue.length: 1 == i.nodeType && (n.push({
				event: "start",
				offset: a,
				node: i
			}), a = r(i, a), t(i).match(/br|hr|img|input/) || n.push({
				event: "stop",
				offset: a,
				node: i
			}));
			return a
		} (e, 0),
		n
	}
	function c(e, r, a) {
		function i() {
			return e.length && r.length ? e[0].offset != r[0].offset ? e[0].offset < r[0].offset ? e: r: "start" == r[0].event ? e: r: e.length ? e: r
		}
		function o(e) {
			function r(e) {
				return " " + e.nodeName + '="' + n(e.value) + '"'
			}
			l += "<" + t(e) + Array.prototype.map.call(e.attributes, r).join("") + ">"
		}
		function u(e) {
			l += "</" + t(e) + ">"
		}
		function c(e) { ("start" == e.event ? o: u)(e.node)
		}
		for (var s = 0, l = "", f = []; e.length || r.length;) {
			var g = i();
			if (l += n(a.substr(s, g[0].offset - s)), s = g[0].offset, g == e) {
				f.reverse().forEach(u);
				do c(g.splice(0, 1)[0]),
				g = i();
				while (g == e && g.length && g[0].offset == s);
				f.reverse().forEach(o)
			} else "start" == g[0].event ? f.push(g[0].node) : f.pop(),
			c(g.splice(0, 1)[0])
		}
		return l + n(a.substr(s))
	}
	function s(e) {
		function n(e) {
			return e && e.source || e
		}
		function t(t, r) {
			return new RegExp(n(t), "m" + (e.cI ? "i": "") + (r ? "g": ""))
		}
		function r(a, i) {
			if (!a.compiled) {
				if (a.compiled = !0, a.k = a.k || a.bK, a.k) {
					var u = {},
					c = function (n, t) {
						e.cI && (t = t.toLowerCase()),
						t.split(" ").forEach(function (e) {
							var t = e.split("|");
							u[t[0]] = [n, t[1] ? Number(t[1]) : 1]
						})
					};
					"string" == typeof a.k ? c("keyword", a.k) : Object.keys(a.k).forEach(function (e) {
						c(e, a.k[e])
					}),
					a.k = u
				}
				a.lR = t(a.l || /\b\w+\b/, !0),
				i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = t(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), a.tE = n(a.e) || "", a.eW && i.tE && (a.tE += (a.e ? "|": "") + i.tE)),
				a.i && (a.iR = t(a.i)),
				void 0 === a.r && (a.r = 1),
				a.c || (a.c = []);
				var s = [];
				a.c.forEach(function (e) {
					e.v ? e.v.forEach(function (n) {
						s.push(o(e, n))
					}) : s.push("self" == e ? a: e)
				}),
				a.c = s,
				a.c.forEach(function (e) {
					r(e, a)
				}),
				a.starts && r(a.starts, i);
				var l = a.c.map(function (e) {
					return e.bK ? "\\.?(" + e.b + ")\\.?": e.b
				}).concat([a.tE, a.i]).map(n).filter(Boolean);
				a.t = l.length ? t(l.join("|"), !0) : {
					exec: function () {
						return null
					}
				}
			}
		}
		r(e)
	}
	function l(e, t, a, i) {
		function o(e, n) {
			for (var t = 0; t < n.c.length; t++) if (r(n.c[t].bR, e)) return n.c[t]
		}
		function u(e, n) {
			if (r(e.eR, n)) {
				for (; e.endsParent && e.parent;) e = e.parent;
				return e
			}
			return e.eW ? u(e.parent, n) : void 0
		}
		function c(e, n) {
			return ! a && r(n.iR, e)
		}
		function g(e, n) {
			var t = N.cI ? n[0].toLowerCase() : n[0];
			return e.k.hasOwnProperty(t) && e.k[t]
		}
		function h(e, n, t, r) {
			var a = r ? "": E.classPrefix,
			i = '<span class="' + a,
			o = t ? "": "</span>";
			return i += e + '">',
			i + n + o
		}
		function p() {
			if (!L.k) return n(M);
			var e = "",
			t = 0;
			L.lR.lastIndex = 0;
			for (var r = L.lR.exec(M); r;) {
				e += n(M.substr(t, r.index - t));
				var a = g(L, r);
				a ? (B += a[1], e += h(a[0], n(r[0]))) : e += n(r[0]),
				t = L.lR.lastIndex,
				r = L.lR.exec(M)
			}
			return e + n(M.substr(t))
		}
		function d() {
			var e = "string" == typeof L.sL;
			if (e && !x[L.sL]) return n(M);
			var t = e ? l(L.sL, M, !0, y[L.sL]) : f(M, L.sL.length ? L.sL: void 0);
			return L.r > 0 && (B += t.r),
			e && (y[L.sL] = t.top),
			h(t.language, t.value, !1, !0)
		}
		function b() {
			return void 0 !== L.sL ? d() : p()
		}
		function v(e, t) {
			var r = e.cN ? h(e.cN, "", !0) : "";
			e.rB ? (k += r, M = "") : e.eB ? (k += n(t) + r, M = "") : (k += r, M = t),
			L = Object.create(e, {
				parent: {
					value: L
				}
			})
		}
		function m(e, t) {
			if (M += e, void 0 === t) return k += b(),
			0;
			var r = o(t, L);
			if (r) return k += b(),
			v(r, t),
			r.rB ? 0 : t.length;
			var a = u(L, t);
			if (a) {
				var i = L;
				i.rE || i.eE || (M += t),
				k += b();
				do L.cN && (k += "</span>"),
				B += L.r,
				L = L.parent;
				while (L != a.parent);
				return i.eE && (k += n(t)),
				M = "",
				a.starts && v(a.starts, ""),
				i.rE ? 0 : t.length
			}
			if (c(t, L)) throw new Error('Illegal lexeme "' + t + '" for mode "' + (L.cN || "<unnamed>") + '"');
			return M += t,
			t.length || 1
		}
		var N = w(e);
		if (!N) throw new Error('Unknown language: "' + e + '"');
		s(N);
		var R, L = i || N,
		y = {},
		k = "";
		for (R = L; R != N; R = R.parent) R.cN && (k = h(R.cN, "", !0) + k);
		var M = "",
		B = 0;
		try {
			for (var C, j, I = 0;;) {
				if (L.t.lastIndex = I, C = L.t.exec(t), !C) break;
				j = m(t.substr(I, C.index - I), C[0]),
				I = C.index + j
			}
			for (m(t.substr(I)), R = L; R.parent; R = R.parent) R.cN && (k += "</span>");
			return {
				r: B,
				value: k,
				language: e,
				top: L
			}
		} catch(O) {
			if ( - 1 != O.message.indexOf("Illegal")) return {
				r: 0,
				value: n(t)
			};
			throw O
		}
	}
	function f(e, t) {
		t = t || E.languages || Object.keys(x);
		var r = {
			r: 0,
			value: n(e)
		},
		a = r;
		return t.forEach(function (n) {
			if (w(n)) {
				var t = l(n, e, !1);
				t.language = n,
				t.r > a.r && (a = t),
				t.r > r.r && (a = r, r = t)
			}
		}),
		a.language && (r.second_best = a),
		r
	}
	function g(e) {
		return E.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function (e, n) {
			return n.replace(/\t/g, E.tabReplace)
		})),
		E.useBR && (e = e.replace(/\n/g, "<br>")),
		e
	}
	function h(e, n, t) {
		var r = n ? R[n] : t,
		a = [e.trim()];
		return e.match(/\bhljs\b/) || a.push("hljs"),
		-1 === e.indexOf(r) && a.push(r),
		a.join(" ").trim()
	}
	function p(e) {
		var n = i(e);
		if (!a(n)) {
			var t;
			E.useBR ? (t = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), t.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : t = e;
			var r = t.textContent,
			o = n ? l(n, r, !0) : f(r),
			s = u(t);
			if (s.length) {
				var p = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
				p.innerHTML = o.value,
				o.value = c(s, u(p), r)
			}
			o.value = g(o.value),
			e.innerHTML = o.value,
			e.className = h(e.className, n, o.language),
			e.result = {
				language: o.language,
				re: o.r
			},
			o.second_best && (e.second_best = {
				language: o.second_best.language,
				re: o.second_best.r
			})
		}
	}
	function d(e) {
		E = o(E, e)
	}
	function b() {
		if (!b.called) {
			b.called = !0;
			var e = document.querySelectorAll("pre code");
			Array.prototype.forEach.call(e, p)
		}
	}
	function v() {
		addEventListener("DOMContentLoaded", b, !1),
		addEventListener("load", b, !1)
	}
	function m(n, t) {
		var r = x[n] = t(e);
		r.aliases && r.aliases.forEach(function (e) {
			R[e] = n
		})
	}
	function N() {
		return Object.keys(x)
	}
	function w(e) {
		return e = (e || "").toLowerCase(),
		x[e] || x[R[e]]
	}
	var E = {
		classPrefix: "hljs-",
		tabReplace: null,
		useBR: !1,
		languages: void 0
	},
	x = {},
	R = {};
	return e.highlight = l,
	e.highlightAuto = f,
	e.fixMarkup = g,
	e.highlightBlock = p,
	e.configure = d,
	e.initHighlighting = b,
	e.initHighlightingOnLoad = v,
	e.registerLanguage = m,
	e.listLanguages = N,
	e.getLanguage = w,
	e.inherit = o,
	e.IR = "[a-zA-Z]\\w*",
	e.UIR = "[a-zA-Z_]\\w*",
	e.NR = "\\b\\d+(\\.\\d+)?",
	e.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",
	e.BNR = "\\b(0b[01]+)",
	e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
	e.BE = {
		b: "\\\\[\\s\\S]",
		r: 0
	},
	e.ASM = {
		cN: "string",
		b: "'",
		e: "'",
		i: "\\n",
		c: [e.BE]
	},
	e.QSM = {
		cN: "string",
		b: '"',
		e: '"',
		i: "\\n",
		c: [e.BE]
	},
	e.PWM = {
		b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/
	},
	e.C = function (n, t, r) {
		var a = e.inherit({
			cN: "comment",
			b: n,
			e: t,
			c: []
		},
		r || {});
		return a.c.push(e.PWM),
		a.c.push({
			cN: "doctag",
			b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
			r: 0
		}),
		a
	},
	e.CLCM = e.C("//", "$"),
	e.CBCM = e.C("/\\*", "\\*/"),
	e.HCM = e.C("#", "$"),
	e.NM = {
		cN: "number",
		b: e.NR,
		r: 0
	},
	e.CNM = {
		cN: "number",
		b: e.CNR,
		r: 0
	},
	e.BNM = {
		cN: "number",
		b: e.BNR,
		r: 0
	},
	e.CSSNM = {
		cN: "number",
		b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
		r: 0
	},
	e.RM = {
		cN: "regexp",
		b: /\//,
		e: /\/[gimuy]*/,
		i: /\n/,
		c: [e.BE, {
			b: /\[/,
			e: /\]/,
			r: 0,
			c: [e.BE]
		}]
	},
	e.TM = {
		cN: "title",
		b: e.IR,
		r: 0
	},
	e.UTM = {
		cN: "title",
		b: e.UIR,
		r: 0
	},
	e
});
hljs.registerLanguage("nginx", function (e) {
	var r = {
		cN: "variable",
		v: [{
			b: /\$\d+/
		},
		{
			b: /\$\{/,
			e: /}/
		},
		{
			b: "[\\$\\@]" + e.UIR
		}]
	},
	b = {
		eW: !0,
		l: "[a-z/_]+",
		k: {
			built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
		},
		r: 0,
		i: "=>",
		c: [e.HCM, {
			cN: "string",
			c: [e.BE, r],
			v: [{
				b: /"/,
				e: /"/
			},
			{
				b: /'/,
				e: /'/
			}]
		},
		{
			cN: "url",
			b: "([a-z]+):/",
			e: "\\s",
			eW: !0,
			eE: !0,
			c: [r]
		},
		{
			cN: "regexp",
			c: [e.BE, r],
			v: [{
				b: "\\s\\^",
				e: "\\s|{|;",
				rE: !0
			},
			{
				b: "~\\*?\\s+",
				e: "\\s|{|;",
				rE: !0
			},
			{
				b: "\\*(\\.[a-z\\-]+)+"
			},
			{
				b: "([a-z\\-]+\\.)+\\*"
			}]
		},
		{
			cN: "number",
			b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
		},
		{
			cN: "number",
			b: "\\b\\d+[kKmMgGdshdwy]*\\b",
			r: 0
		},
		r]
	};
	return {
		aliases: ["nginxconf"],
		c: [e.HCM, {
			b: e.UIR + "\\s",
			e: ";|{",
			rB: !0,
			c: [{
				cN: "title",
				b: e.UIR,
				starts: b
			}],
			r: 0
		}],
		i: "[^\\s\\}]"
	}
});
hljs.registerLanguage("cs", function (e) {
	var r = "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield",
	t = e.IR + "(<" + e.IR + ">)?";
	return {
		aliases: ["csharp"],
		k: r,
		i: /::/,
		c: [e.C("///", "$", {
			rB: !0,
			c: [{
				cN: "xmlDocTag",
				v: [{
					b: "///",
					r: 0
				},
				{
					b: "<!--|-->"
				},
				{
					b: "</?",
					e: ">"
				}]
			}]
		}), e.CLCM, e.CBCM, {
			cN: "preprocessor",
			b: "#",
			e: "$",
			k: "if else elif endif define undef warning error line region endregion pragma checksum"
		},
		{
			cN: "string",
			b: '@"',
			e: '"',
			c: [{
				b: '""'
			}]
		},
		e.ASM, e.QSM, e.CNM, {
			bK: "class interface",
			e: /[{;=]/,
			i: /[^\s:]/,
			c: [e.TM, e.CLCM, e.CBCM]
		},
		{
			bK: "namespace",
			e: /[{;=]/,
			i: /[^\s:]/,
			c: [{
				cN: "title",
				b: "[a-zA-Z](\\.?\\w)*",
				r: 0
			},
			e.CLCM, e.CBCM]
		},
		{
			bK: "new return throw await",
			r: 0
		},
		{
			cN: "function",
			b: "(" + t + "\\s+)+" + e.IR + "\\s*\\(",
			rB: !0,
			e: /[{;=]/,
			eE: !0,
			k: r,
			c: [{
				b: e.IR + "\\s*\\(",
				rB: !0,
				c: [e.TM],
				r: 0
			},
			{
				cN: "params",
				b: /\(/,
				e: /\)/,
				eB: !0,
				eE: !0,
				k: r,
				r: 0,
				c: [e.ASM, e.QSM, e.CNM, e.CBCM]
			},
			e.CLCM, e.CBCM]
		}]
	}
});
hljs.registerLanguage("diff", function (e) {
	return {
		aliases: ["patch"],
		c: [{
			cN: "chunk",
			r: 10,
			v: [{
				b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/
			},
			{
				b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
			},
			{
				b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
			}]
		},
		{
			cN: "header",
			v: [{
				b: /Index: /,
				e: /$/
			},
			{
				b: /=====/,
				e: /=====$/
			},
			{
				b: /^\-\-\-/,
				e: /$/
			},
			{
				b: /^\*{3} /,
				e: /$/
			},
			{
				b: /^\+\+\+/,
				e: /$/
			},
			{
				b: /\*{5}/,
				e: /\*{5}$/
			}]
		},
		{
			cN: "addition",
			b: "^\\+",
			e: "$"
		},
		{
			cN: "deletion",
			b: "^\\-",
			e: "$"
		},
		{
			cN: "change",
			b: "^\\!",
			e: "$"
		}]
	}
});
hljs.registerLanguage("sml", function (e) {
	return {
		aliases: ["ml"],
		k: {
			keyword: "abstype and andalso as case datatype do else end eqtype exception fn fun functor handle if in include infix infixr let local nonfix of op open orelse raise rec sharing sig signature struct structure then type val with withtype where while",
			built_in: "array bool char exn int list option order real ref string substring vector unit word",
			literal: "true false NONE SOME LESS EQUAL GREATER nil"
		},
		i: /\/\/|>>/,
		l: "[a-z_]\\w*!?",
		c: [{
			cN: "literal",
			b: "\\[(\\|\\|)?\\]|\\(\\)"
		},
		e.C("\\(\\*", "\\*\\)", {
			c: ["self"]
		}), {
			cN: "symbol",
			b: "'[A-Za-z_](?!')[\\w']*"
		},
		{
			cN: "tag",
			b: "`[A-Z][\\w']*"
		},
		{
			cN: "type",
			b: "\\b[A-Z][\\w']*",
			r: 0
		},
		{
			b: "[a-z_]\\w*'[\\w']*"
		},
		e.inherit(e.ASM, {
			cN: "char",
			r: 0
		}), e.inherit(e.QSM, {
			i: null
		}), {
			cN: "number",
			b: "\\b(0[xX][a-fA-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
			r: 0
		},
		{
			b: /[-=]>/
		}]
	}
});
hljs.registerLanguage("bash", function (e) {
	var t = {
		cN: "variable",
		v: [{
			b: /\$[\w\d#@][\w\d_]*/
		},
		{
			b: /\$\{(.*?)}/
		}]
	},
	s = {
		cN: "string",
		b: /"/,
		e: /"/,
		c: [e.BE, t, {
			cN: "variable",
			b: /\$\(/,
			e: /\)/,
			c: [e.BE]
		}]
	},
	a = {
		cN: "string",
		b: /'/,
		e: /'/
	};
	return {
		aliases: ["sh", "zsh"],
		l: /-?[a-z\.]+/,
		k: {
			keyword: "if then else elif fi for while in do done case esac function",
			literal: "true false",
			built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
			operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
		},
		c: [{
			cN: "shebang",
			b: /^#![^\n]+sh\s*$/,
			r: 10
		},
		{
			cN: "function",
			b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
			rB: !0,
			c: [e.inherit(e.TM, {
				b: /\w[\w\d_]*/
			})],
			r: 0
		},
		e.HCM, e.NM, s, a, t]
	}
});
hljs.registerLanguage("markdown", function (e) {
	return {
		aliases: ["md", "mkdown", "mkd"],
		c: [{
			cN: "header",
			v: [{
				b: "^#{1,6}",
				e: "$"
			},
			{
				b: "^.+?\\n[=-]{2,}$"
			}]
		},
		{
			b: "<",
			e: ">",
			sL: "xml",
			r: 0
		},
		{
			cN: "bullet",
			b: "^([*+-]|(\\d+\\.))\\s+"
		},
		{
			cN: "strong",
			b: "[*_]{2}.+?[*_]{2}"
		},
		{
			cN: "emphasis",
			v: [{
				b: "\\*.+?\\*"
			},
			{
				b: "_.+?_",
				r: 0
			}]
		},
		{
			cN: "blockquote",
			b: "^>\\s+",
			e: "$"
		},
		{
			cN: "code",
			v: [{
				b: "`.+?`"
			},
			{
				b: "^( {4}|	)",
				e: "$",
				r: 0
			}]
		},
		{
			cN: "horizontal_rule",
			b: "^[-\\*]{3,}",
			e: "$"
		},
		{
			b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
			rB: !0,
			c: [{
				cN: "link_label",
				b: "\\[",
				e: "\\]",
				eB: !0,
				rE: !0,
				r: 0
			},
			{
				cN: "link_url",
				b: "\\]\\(",
				e: "\\)",
				eB: !0,
				eE: !0
			},
			{
				cN: "link_reference",
				b: "\\]\\[",
				e: "\\]",
				eB: !0,
				eE: !0
			}],
			r: 10
		},
		{
			b: "^\\[.+\\]:",
			rB: !0,
			c: [{
				cN: "link_reference",
				b: "\\[",
				e: "\\]:",
				eB: !0,
				eE: !0,
				starts: {
					cN: "link_url",
					e: "$"
				}
			}]
		}]
	}
});
hljs.registerLanguage("javascript", function (e) {
	return {
		aliases: ["js"],
		k: {
			keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await",
			literal: "true false null undefined NaN Infinity",
			built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
		},
		c: [{
			cN: "pi",
			r: 10,
			b: /^\s*['"]use (strict|asm)['"]/
		},
		e.ASM, e.QSM, {
			cN: "string",
			b: "`",
			e: "`",
			c: [e.BE, {
				cN: "subst",
				b: "\\$\\{",
				e: "\\}"
			}]
		},
		e.CLCM, e.CBCM, {
			cN: "number",
			v: [{
				b: "\\b(0[bB][01]+)"
			},
			{
				b: "\\b(0[oO][0-7]+)"
			},
			{
				b: e.CNR
			}],
			r: 0
		},
		{
			b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
			k: "return throw case",
			c: [e.CLCM, e.CBCM, e.RM, {
				b: /</,
				e: />\s*[);\]]/,
				r: 0,
				sL: "xml"
			}],
			r: 0
		},
		{
			cN: "function",
			bK: "function",
			e: /\{/,
			eE: !0,
			c: [e.inherit(e.TM, {
				b: /[A-Za-z$_][0-9A-Za-z$_]*/
			}), {
				cN: "params",
				b: /\(/,
				e: /\)/,
				eB: !0,
				eE: !0,
				c: [e.CLCM, e.CBCM]
			}],
			i: /\[|%/
		},
		{
			b: /\$[(.]/
		},
		{
			b: "\\." + e.IR,
			r: 0
		},
		{
			bK: "import",
			e: "[;$]",
			k: "import from as",
			c: [e.ASM, e.QSM]
		},
		{
			cN: "class",
			bK: "class",
			e: /[{;=]/,
			eE: !0,
			i: /[:"\[\]]/,
			c: [{
				bK: "extends"
			},
			e.UTM]
		}],
		i: /#/
	}
});
hljs.registerLanguage("ini", function (e) {
	var c = {
		cN: "string",
		c: [e.BE],
		v: [{
			b: "'''",
			e: "'''",
			r: 10
		},
		{
			b: '"""',
			e: '"""',
			r: 10
		},
		{
			b: '"',
			e: '"'
		},
		{
			b: "'",
			e: "'"
		}]
	};
	return {
		aliases: ["toml"],
		cI: !0,
		i: /\S/,
		c: [e.C(";", "$"), e.HCM, {
			cN: "title",
			b: /^\s*\[+/,
			e: /\]+/
		},
		{
			cN: "setting",
			b: /^[a-z0-9\[\]_-]+\s*=\s*/,
			e: "$",
			c: [{
				cN: "value",
				eW: !0,
				k: "on off true false yes no",
				c: [{
					cN: "variable",
					v: [{
						b: /\$[\w\d"][\w\d_]*/
					},
					{
						b: /\$\{(.*?)}/
					}]
				},
				c, {
					cN: "number",
					b: /([\+\-]+)?[\d]+_[\d_]+/
				},
				e.NM],
				r: 0
			}]
		}]
	}
});
hljs.registerLanguage("apache", function (e) {
	var r = {
		cN: "number",
		b: "[\\$%]\\d+"
	};
	return {
		aliases: ["apacheconf"],
		cI: !0,
		c: [e.HCM, {
			cN: "tag",
			b: "</?",
			e: ">"
		},
		{
			cN: "keyword",
			b: /\w+/,
			r: 0,
			k: {
				common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
			},
			starts: {
				e: /$/,
				r: 0,
				k: {
					literal: "on off all"
				},
				c: [{
					cN: "sqbracket",
					b: "\\s\\[",
					e: "\\]$"
				},
				{
					cN: "cbracket",
					b: "[\\$%]\\{",
					e: "\\}",
					c: ["self", r]
				},
				r, e.QSM]
			}
		}],
		i: /\S/
	}
});
hljs.registerLanguage("sql", function (e) {
	var t = e.C("--", "$");
	return {
		cI: !0,
		i: /[<>{}*]/,
		c: [{
			cN: "operator",
			bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",
			e: /;/,
			eW: !0,
			k: {
				keyword: "abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes c cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle d data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration e each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract f failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function g general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http i id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists k keep keep_duplicates key keys kill l language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim m main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex n name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding p package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime t table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
				literal: "true false null",
				built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
			},
			c: [{
				cN: "string",
				b: "'",
				e: "'",
				c: [e.BE, {
					b: "''"
				}]
			},
			{
				cN: "string",
				b: '"',
				e: '"',
				c: [e.BE, {
					b: '""'
				}]
			},
			{
				cN: "string",
				b: "`",
				e: "`",
				c: [e.BE]
			},
			e.CNM, e.CBCM, t]
		},
		e.CBCM, t]
	}
});
hljs.registerLanguage("twig", function (e) {
	var t = {
		cN: "params",
		b: "\\(",
		e: "\\)"
	},
	a = "attribute block constant cycle date dump include max min parent random range source template_from_string",
	r = {
		cN: "function",
		bK: a,
		r: 0,
		c: [t]
	},
	c = {
		cN: "filter",
		b: /\|[A-Za-z_]+:?/,
		k: "abs batch capitalize convert_encoding date date_modify default escape first format join json_encode keys last length lower merge nl2br number_format raw replace reverse round slice sort split striptags title trim upper url_encode",
		c: [r]
	},
	n = "autoescape block do embed extends filter flush for if import include macro sandbox set spaceless use verbatim";
	return n = n + " " + n.split(" ").map(function (e) {
		return "end" + e
	}).join(" "),
	{
		aliases: ["craftcms"],
		cI: !0,
		sL: "xml",
		c: [e.C(/\{#/, /#}/), {
			cN: "template_tag",
			b: /\{%/,
			e: /%}/,
			k: n,
			c: [c, r]
		},
		{
			cN: "variable",
			b: /\{\{/,
			e: /}}/,
			c: [c, r]
		}]
	}
});
hljs.registerLanguage("makefile", function (e) {
	var a = {
		cN: "variable",
		b: /\$\(/,
		e: /\)/,
		c: [e.BE]
	};
	return {
		aliases: ["mk", "mak"],
		c: [e.HCM, {
			b: /^\w+\s*\W*=/,
			rB: !0,
			r: 0,
			starts: {
				cN: "constant",
				e: /\s*\W*=/,
				eE: !0,
				starts: {
					e: /$/,
					r: 0,
					c: [a]
				}
			}
		},
		{
			cN: "title",
			b: /^[\w]+:\s*$/
		},
		{
			cN: "phony",
			b: /^\.PHONY:/,
			e: /$/,
			k: ".PHONY",
			l: /[\.\w]+/
		},
		{
			b: /^\t+/,
			e: /$/,
			r: 0,
			c: [e.QSM, a]
		}]
	}
});
hljs.registerLanguage("css", function (e) {
	var c = "[a-zA-Z-][a-zA-Z0-9_-]*",
	a = {
		cN: "function",
		b: c + "\\(",
		rB: !0,
		eE: !0,
		e: "\\("
	},
	r = {
		cN: "rule",
		b: /[A-Z\_\.\-]+\s*:/,
		rB: !0,
		e: ";",
		eW: !0,
		c: [{
			cN: "attribute",
			b: /\S/,
			e: ":",
			eE: !0,
			starts: {
				cN: "value",
				eW: !0,
				eE: !0,
				c: [a, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
					cN: "hexcolor",
					b: "#[0-9A-Fa-f]+"
				},
				{
					cN: "important",
					b: "!important"
				}]
			}
		}]
	};
	return {
		cI: !0,
		i: /[=\/|'\$]/,
		c: [e.CBCM, {
			cN: "id",
			b: /\#[A-Za-z0-9_-]+/
		},
		{
			cN: "class",
			b: /\.[A-Za-z0-9_-]+/
		},
		{
			cN: "attr_selector",
			b: /\[/,
			e: /\]/,
			i: "$"
		},
		{
			cN: "pseudo",
			b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"']+/
		},
		{
			cN: "at_rule",
			b: "@(font-face|page)",
			l: "[a-z-]+",
			k: "font-face page"
		},
		{
			cN: "at_rule",
			b: "@",
			e: "[{;]",
			c: [{
				cN: "keyword",
				b: /\S+/
			},
			{
				b: /\s/,
				eW: !0,
				eE: !0,
				r: 0,
				c: [a, e.ASM, e.QSM, e.CSSNM]
			}]
		},
		{
			cN: "tag",
			b: c,
			r: 0
		},
		{
			cN: "rules",
			b: "{",
			e: "}",
			i: /\S/,
			c: [e.CBCM, r]
		}]
	}
});
hljs.registerLanguage("delphi", function (e) {
	var r = "exports register file shl array record property for mod while set ally label uses raise not stored class safecall var interface or private static exit index inherited to else stdcall override shr asm far resourcestring finalization packed virtual out and protected library do xorwrite goto near function end div overload object unit begin string on inline repeat until destructor write message program with read initialization except default nil if case cdecl in downto threadvar of try pascal const external constructor type public then implementation finally published procedure",
	t = [e.CLCM, e.C(/\{/, /\}/, {
		r: 0
	}), e.C(/\(\*/, /\*\)/, {
		r: 10
	})],
	i = {
		cN: "string",
		b: /'/,
		e: /'/,
		c: [{
			b: /''/
		}]
	},
	c = {
		cN: "string",
		b: /(#\d+)+/
	},
	o = {
		b: e.IR + "\\s*=\\s*class\\s*\\(",
		rB: !0,
		c: [e.TM]
	},
	n = {
		cN: "function",
		bK: "function constructor destructor procedure",
		e: /[:;]/,
		k: "function constructor|10 destructor|10 procedure|10",
		c: [e.TM, {
			cN: "params",
			b: /\(/,
			e: /\)/,
			k: r,
			c: [i, c]
		}].concat(t)
	};
	return {
		cI: !0,
		k: r,
		i: /"|\$[G-Zg-z]|\/\*|<\/|\|/,
		c: [i, c, e.NM, o, n].concat(t)
	}
});
hljs.registerLanguage("xml", function (t) {
	var s = "[A-Za-z0-9\\._:-]+",
	c = {
		b: /<\?(php)?(?!\w)/,
		e: /\?>/,
		sL: "php"
	},
	e = {
		eW: !0,
		i: /</,
		r: 0,
		c: [c, {
			cN: "attribute",
			b: s,
			r: 0
		},
		{
			b: "=",
			r: 0,
			c: [{
				cN: "value",
				c: [c],
				v: [{
					b: /"/,
					e: /"/
				},
				{
					b: /'/,
					e: /'/
				},
				{
					b: /[^\s\/>]+/
				}]
			}]
		}]
	};
	return {
		aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
		cI: !0,
		c: [{
			cN: "doctype",
			b: "<!DOCTYPE",
			e: ">",
			r: 10,
			c: [{
				b: "\\[",
				e: "\\]"
			}]
		},
		t.C("<!--", "-->", {
			r: 10
		}), {
			cN: "cdata",
			b: "<\\!\\[CDATA\\[",
			e: "\\]\\]>",
			r: 10
		},
		{
			cN: "tag",
			b: "<style(?=\\s|>|$)",
			e: ">",
			k: {
				title: "style"
			},
			c: [e],
			starts: {
				e: "</style>",
				rE: !0,
				sL: "css"
			}
		},
		{
			cN: "tag",
			b: "<script(?=\\s|>|$)",
			e: ">",
			k: {
				title: "script"
			},
			c: [e],
			starts: {
				e: "</script>",
				rE: !0,
				sL: ["actionscript", "javascript", "handlebars"]
			}
		},
		c, {
			cN: "pi",
			b: /<\?\w+/,
			e: /\?>/,
			r: 10
		},
		{
			cN: "tag",
			b: "</?",
			e: "/?>",
			c: [{
				cN: "title",
				b: /[^ \/><\n\t]+/,
				r: 0
			},
			e]
		}]
	}
});
hljs.registerLanguage("ruby", function (e) {
	var c = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
	r = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
	b = {
		cN: "doctag",
		b: "@[A-Za-z]+"
	},
	a = {
		cN: "value",
		b: "#<",
		e: ">"
	},
	n = [e.C("#", "$", {
		c: [b]
	}), e.C("^\\=begin", "^\\=end", {
		c: [b],
		r: 10
	}), e.C("^__END__", "\\n$")],
	s = {
		cN: "subst",
		b: "#\\{",
		e: "}",
		k: r
	},
	t = {
		cN: "string",
		c: [e.BE, s],
		v: [{
			b: /'/,
			e: /'/
		},
		{
			b: /"/,
			e: /"/
		},
		{
			b: /`/,
			e: /`/
		},
		{
			b: "%[qQwWx]?\\(",
			e: "\\)"
		},
		{
			b: "%[qQwWx]?\\[",
			e: "\\]"
		},
		{
			b: "%[qQwWx]?{",
			e: "}"
		},
		{
			b: "%[qQwWx]?<",
			e: ">"
		},
		{
			b: "%[qQwWx]?/",
			e: "/"
		},
		{
			b: "%[qQwWx]?%",
			e: "%"
		},
		{
			b: "%[qQwWx]?-",
			e: "-"
		},
		{
			b: "%[qQwWx]?\\|",
			e: "\\|"
		},
		{
			b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
		}]
	},
	i = {
		cN: "params",
		b: "\\(",
		e: "\\)",
		k: r
	},
	d = [t, a, {
		cN: "class",
		bK: "class module",
		e: "$|;",
		i: /=/,
		c: [e.inherit(e.TM, {
			b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
		}), {
			cN: "inheritance",
			b: "<\\s*",
			c: [{
				cN: "parent",
				b: "(" + e.IR + "::)?" + e.IR
			}]
		}].concat(n)
	},
	{
		cN: "function",
		bK: "def",
		e: "$|;",
		c: [e.inherit(e.TM, {
			b: c
		}), i].concat(n)
	},
	{
		cN: "constant",
		b: "(::)?(\\b[A-Z]\\w*(::)?)+",
		r: 0
	},
	{
		cN: "symbol",
		b: e.UIR + "(\\!|\\?)?:",
		r: 0
	},
	{
		cN: "symbol",
		b: ":",
		c: [t, {
			b: c
		}],
		r: 0
	},
	{
		cN: "number",
		b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
		r: 0
	},
	{
		cN: "variable",
		b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
	},
	{
		b: "(" + e.RSR + ")\\s*",
		c: [a, {
			cN: "regexp",
			c: [e.BE, s],
			i: /\n/,
			v: [{
				b: "/",
				e: "/[a-z]*"
			},
			{
				b: "%r{",
				e: "}[a-z]*"
			},
			{
				b: "%r\\(",
				e: "\\)[a-z]*"
			},
			{
				b: "%r!",
				e: "![a-z]*"
			},
			{
				b: "%r\\[",
				e: "\\][a-z]*"
			}]
		}].concat(n),
		r: 0
	}].concat(n);
	s.c = d,
	i.c = d;
	var o = "[>?]>",
	l = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
	u = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
	N = [{
		b: /^\s*=>/,
		cN: "status",
		starts: {
			e: "$",
			c: d
		}
	},
	{
		cN: "prompt",
		b: "^(" + o + "|" + l + "|" + u + ")",
		starts: {
			e: "$",
			c: d
		}
	}];
	return {
		aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
		k: r,
		i: /\/\*/,
		c: n.concat(N).concat(d)
	}
});
hljs.registerLanguage("objectivec", function (e) {
	var t = {
		cN: "built_in",
		b: "(AV|CA|CF|CG|CI|MK|MP|NS|UI)\\w+"
	},
	i = {
		keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",
		literal: "false true FALSE TRUE nil YES NO NULL",
		built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
	},
	o = /[a-zA-Z@][a-zA-Z0-9_]*/,
	n = "@interface @class @protocol @implementation";
	return {
		aliases: ["mm", "objc", "obj-c"],
		k: i,
		l: o,
		i: "</",
		c: [t, e.CLCM, e.CBCM, e.CNM, e.QSM, {
			cN: "string",
			v: [{
				b: '@"',
				e: '"',
				i: "\\n",
				c: [e.BE]
			},
			{
				b: "'",
				e: "[^\\\\]'",
				i: "[^\\\\][^']"
			}]
		},
		{
			cN: "preprocessor",
			b: "#",
			e: "$",
			c: [{
				cN: "title",
				v: [{
					b: '"',
					e: '"'
				},
				{
					b: "<",
					e: ">"
				}]
			}]
		},
		{
			cN: "class",
			b: "(" + n.split(" ").join("|") + ")\\b",
			e: "({|$)",
			eE: !0,
			k: n,
			l: o,
			c: [e.UTM]
		},
		{
			cN: "variable",
			b: "\\." + e.UIR,
			r: 0
		}]
	}
});
hljs.registerLanguage("less", function (e) {
	var r = "[\\w-]+",
	t = "(" + r + "|@{" + r + "})",
	a = [],
	c = [],
	n = function (e) {
		return {
			cN: "string",
			b: "~?" + e + ".*?" + e
		}
	},
	i = function (e, r, t) {
		return {
			cN: e,
			b: r,
			r: t
		}
	},
	s = function (r, t, a) {
		return e.inherit({
			cN: r,
			b: t + "\\(",
			e: "\\(",
			rB: !0,
			eE: !0,
			r: 0
		},
		a)
	},
	b = {
		b: "\\(",
		e: "\\)",
		c: c,
		r: 0
	};
	c.push(e.CLCM, e.CBCM, n("'"), n('"'), e.CSSNM, i("hexcolor", "#[0-9A-Fa-f]+\\b"), s("function", "(url|data-uri)", {
		starts: {
			cN: "string",
			e: "[\\)\\n]",
			eE: !0
		}
	}), s("function", r), b, i("variable", "@@?" + r, 10), i("variable", "@{" + r + "}"), i("built_in", "~?`[^`]*?`"), {
		cN: "attribute",
		b: r + "\\s*:",
		e: ":",
		rB: !0,
		eE: !0
	});
	var o = c.concat({
		b: "{",
		e: "}",
		c: a
	}),
	u = {
		bK: "when",
		eW: !0,
		c: [{
			bK: "and not"
		}].concat(c)
	},
	C = {
		cN: "attribute",
		b: t,
		e: ":",
		eE: !0,
		c: [e.CLCM, e.CBCM],
		i: /\S/,
		starts: {
			e: "[;}]",
			rE: !0,
			c: c,
			i: "[<=$]"
		}
	},
	l = {
		cN: "at_rule",
		b: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
		starts: {
			e: "[;{}]",
			rE: !0,
			c: c,
			r: 0
		}
	},
	d = {
		cN: "variable",
		v: [{
			b: "@" + r + "\\s*:",
			r: 15
		},
		{
			b: "@" + r
		}],
		starts: {
			e: "[;}]",
			rE: !0,
			c: o
		}
	},
	p = {
		v: [{
			b: "[\\.#:&\\[]",
			e: "[;{}]"
		},
		{
			b: t + "[^;]*{",
			e: "{"
		}],
		rB: !0,
		rE: !0,
		i: "[<='$\"]",
		c: [e.CLCM, e.CBCM, u, i("keyword", "all\\b"), i("variable", "@{" + r + "}"), i("tag", t + "%?", 0), i("id", "#" + t), i("class", "\\." + t, 0), i("keyword", "&", 0), s("pseudo", ":not"), s("keyword", ":extend"), i("pseudo", "::?" + t), {
			cN: "attr_selector",
			b: "\\[",
			e: "\\]"
		},
		{
			b: "\\(",
			e: "\\)",
			c: o
		},
		{
			b: "!important"
		}]
	};
	return a.push(e.CLCM, e.CBCM, l, d, p, C),
	{
		cI: !0,
		i: "[=>'/<($\"]",
		c: a
	}
});
hljs.registerLanguage("python", function (e) {
	var r = {
		cN: "prompt",
		b: /^(>>>|\.\.\.) /
	},
	b = {
		cN: "string",
		c: [e.BE],
		v: [{
			b: /(u|b)?r?'''/,
			e: /'''/,
			c: [r],
			r: 10
		},
		{
			b: /(u|b)?r?"""/,
			e: /"""/,
			c: [r],
			r: 10
		},
		{
			b: /(u|r|ur)'/,
			e: /'/,
			r: 10
		},
		{
			b: /(u|r|ur)"/,
			e: /"/,
			r: 10
		},
		{
			b: /(b|br)'/,
			e: /'/
		},
		{
			b: /(b|br)"/,
			e: /"/
		},
		e.ASM, e.QSM]
	},
	a = {
		cN: "number",
		r: 0,
		v: [{
			b: e.BNR + "[lLjJ]?"
		},
		{
			b: "\\b(0o[0-7]+)[lLjJ]?"
		},
		{
			b: e.CNR + "[lLjJ]?"
		}]
	},
	l = {
		cN: "params",
		b: /\(/,
		e: /\)/,
		c: ["self", r, a, b]
	};
	return {
		aliases: ["py", "gyp"],
		k: {
			keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
			built_in: "Ellipsis NotImplemented"
		},
		i: /(<\/|->|\?)/,
		c: [r, a, b, e.HCM, {
			v: [{
				cN: "function",
				bK: "def",
				r: 10
			},
			{
				cN: "class",
				bK: "class"
			}],
			e: /:/,
			i: /[${=;\n,]/,
			c: [e.UTM, l]
		},
		{
			cN: "decorator",
			b: /^[\t ]*@/,
			e: /$/
		},
		{
			b: /\b(print|exec)\(/
		}]
	}
});
hljs.registerLanguage("lisp", function (b) {
	var e = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*",
	c = "\\|[^]*?\\|",
	r = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|\\-)?\\d+)?",
	a = {
		cN: "shebang",
		b: "^#!",
		e: "$"
	},
	i = {
		cN: "literal",
		b: "\\b(t{1}|nil)\\b"
	},
	l = {
		cN: "number",
		v: [{
			b: r,
			r: 0
		},
		{
			b: "#(b|B)[0-1]+(/[0-1]+)?"
		},
		{
			b: "#(o|O)[0-7]+(/[0-7]+)?"
		},
		{
			b: "#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"
		},
		{
			b: "#(c|C)\\(" + r + " +" + r,
			e: "\\)"
		}]
	},
	t = b.inherit(b.QSM, {
		i: null
	}),
	d = b.C(";", "$", {
		r: 0
	}),
	n = {
		cN: "variable",
		b: "\\*",
		e: "\\*"
	},
	u = {
		cN: "keyword",
		b: "[:&]" + e
	},
	N = {
		b: e,
		r: 0
	},
	o = {
		b: c
	},
	s = {
		b: "\\(",
		e: "\\)",
		c: ["self", i, t, l, N]
	},
	v = {
		cN: "quoted",
		c: [l, t, n, u, s, N],
		v: [{
			b: "['`]\\(",
			e: "\\)"
		},
		{
			b: "\\(quote ",
			e: "\\)",
			k: "quote"
		},
		{
			b: "'" + c
		}]
	},
	f = {
		cN: "quoted",
		v: [{
			b: "'" + e
		},
		{
			b: "#'" + e + "(::" + e + ")*"
		}]
	},
	g = {
		cN: "list",
		b: "\\(\\s*",
		e: "\\)"
	},
	q = {
		eW: !0,
		r: 0
	};
	return g.c = [{
		cN: "keyword",
		v: [{
			b: e
		},
		{
			b: c
		}]
	},
	q],
	q.c = [v, f, g, i, l, t, d, n, u, o, N],
	{
		i: /\S/,
		c: [l, a, i, t, d, v, f, g, N]
	}
});
hljs.registerLanguage("lua", function (e) {
	var t = "\\[=*\\[",
	a = "\\]=*\\]",
	r = {
		b: t,
		e: a,
		c: ["self"]
	},
	n = [e.C("--(?!" + t + ")", "$"), e.C("--" + t, a, {
		c: [r],
		r: 10
	})];
	return {
		l: e.UIR,
		k: {
			keyword: "and break do else elseif end false for if in local nil not or repeat return then true until while",
			built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
		},
		c: n.concat([{
			cN: "function",
			bK: "function",
			e: "\\)",
			c: [e.inherit(e.TM, {
				b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
			}), {
				cN: "params",
				b: "\\(",
				eW: !0,
				c: n
			}].concat(n)
		},
		e.CNM, e.ASM, e.QSM, {
			cN: "string",
			b: t,
			e: a,
			c: [r],
			r: 5
		}])
	}
});
hljs.registerLanguage("coffeescript", function (e) {
	var c = {
		keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
		literal: "true false null undefined yes no on off",
		built_in: "npm require console print module global window document"
	},
	n = "[A-Za-z$_][0-9A-Za-z$_]*",
	r = {
		cN: "subst",
		b: /#\{/,
		e: /}/,
		k: c
	},
	t = [e.BNM, e.inherit(e.CNM, {
		starts: {
			e: "(\\s*/)?",
			r: 0
		}
	}), {
		cN: "string",
		v: [{
			b: /'''/,
			e: /'''/,
			c: [e.BE]
		},
		{
			b: /'/,
			e: /'/,
			c: [e.BE]
		},
		{
			b: /"""/,
			e: /"""/,
			c: [e.BE, r]
		},
		{
			b: /"/,
			e: /"/,
			c: [e.BE, r]
		}]
	},
	{
		cN: "regexp",
		v: [{
			b: "///",
			e: "///",
			c: [r, e.HCM]
		},
		{
			b: "//[gim]*",
			r: 0
		},
		{
			b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
		}]
	},
	{
		cN: "property",
		b: "@" + n
	},
	{
		b: "`",
		e: "`",
		eB: !0,
		eE: !0,
		sL: "javascript"
	}];
	r.c = t;
	var s = e.inherit(e.TM, {
		b: n
	}),
	i = "(\\(.*\\))?\\s*\\B[-=]>",
	o = {
		cN: "params",
		b: "\\([^\\(]",
		rB: !0,
		c: [{
			b: /\(/,
			e: /\)/,
			k: c,
			c: ["self"].concat(t)
		}]
	};
	return {
		aliases: ["coffee", "cson", "iced"],
		k: c,
		i: /\/\*/,
		c: t.concat([e.C("###", "###"), e.HCM, {
			cN: "function",
			b: "^\\s*" + n + "\\s*=\\s*" + i,
			e: "[-=]>",
			rB: !0,
			c: [s, o]
		},
		{
			b: /[:\(,=]\s*/,
			r: 0,
			c: [{
				cN: "function",
				b: i,
				e: "[-=]>",
				rB: !0,
				c: [o]
			}]
		},
		{
			cN: "class",
			bK: "class",
			e: "$",
			i: /[:="\[\]]/,
			c: [{
				bK: "extends",
				eW: !0,
				i: /[:="\[\]]/,
				c: [s]
			},
			s]
		},
		{
			cN: "attribute",
			b: n + ":",
			e: ":",
			rB: !0,
			rE: !0,
			r: 0
		}])
	}
});
hljs.registerLanguage("perl", function (e) {
	var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
	r = {
		cN: "subst",
		b: "[$@]\\{",
		e: "\\}",
		k: t
	},
	s = {
		b: "->{",
		e: "}"
	},
	n = {
		cN: "variable",
		v: [{
			b: /\$\d/
		},
		{
			b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/
		},
		{
			b: /[\$%@][^\s\w{]/,
			r: 0
		}]
	},
	o = [e.BE, r, n],
	i = [n, e.HCM, e.C("^\\=\\w", "\\=cut", {
		eW: !0
	}), s, {
		cN: "string",
		c: o,
		v: [{
			b: "q[qwxr]?\\s*\\(",
			e: "\\)",
			r: 5
		},
		{
			b: "q[qwxr]?\\s*\\[",
			e: "\\]",
			r: 5
		},
		{
			b: "q[qwxr]?\\s*\\{",
			e: "\\}",
			r: 5
		},
		{
			b: "q[qwxr]?\\s*\\|",
			e: "\\|",
			r: 5
		},
		{
			b: "q[qwxr]?\\s*\\<",
			e: "\\>",
			r: 5
		},
		{
			b: "qw\\s+q",
			e: "q",
			r: 5
		},
		{
			b: "'",
			e: "'",
			c: [e.BE]
		},
		{
			b: '"',
			e: '"'
		},
		{
			b: "`",
			e: "`",
			c: [e.BE]
		},
		{
			b: "{\\w+}",
			c: [],
			r: 0
		},
		{
			b: "-?\\w+\\s*\\=\\>",
			c: [],
			r: 0
		}]
	},
	{
		cN: "number",
		b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
		r: 0
	},
	{
		b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
		k: "split return print reverse grep",
		r: 0,
		c: [e.HCM, {
			cN: "regexp",
			b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
			r: 10
		},
		{
			cN: "regexp",
			b: "(m|qr)?/",
			e: "/[a-z]*",
			c: [e.BE],
			r: 0
		}]
	},
	{
		cN: "sub",
		bK: "sub",
		e: "(\\s*\\(.*?\\))?[;{]",
		r: 5
	},
	{
		cN: "operator",
		b: "-\\w\\b",
		r: 0
	},
	{
		b: "^__DATA__$",
		e: "^__END__$",
		sL: "mojolicious",
		c: [{
			b: "^@@.*",
			e: "$",
			cN: "comment"
		}]
	}];
	return r.c = i,
	s.c = i,
	{
		aliases: ["pl"],
		k: t,
		c: i
	}
});
hljs.registerLanguage("cpp", function (t) {
	var e = {
		cN: "keyword",
		b: "\\b[a-z\\d_]*_t\\b"
	},
	r = {
		cN: "string",
		v: [t.inherit(t.QSM, {
			b: '((u8?|U)|L)?"'
		}), {
			b: '(u8?|U)?R"',
			e: '"',
			c: [t.BE]
		},
		{
			b: "'\\\\?.",
			e: "'",
			i: "."
		}]
	},
	s = {
		cN: "number",
		v: [{
			b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
		},
		{
			b: t.CNR
		}]
	},
	i = {
		cN: "preprocessor",
		b: "#",
		e: "$",
		k: "if else elif endif define undef warning error line pragma ifdef ifndef",
		c: [{
			b: /\\\n/,
			r: 0
		},
		{
			bK: "include",
			e: "$",
			c: [r, {
				cN: "string",
				b: "<",
				e: ">",
				i: "\\n"
			}]
		},
		r, s, t.CLCM, t.CBCM]
	},
	a = t.IR + "\\s*\\(",
	c = {
		keyword: "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong",
		built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf",
		literal: "true false nullptr NULL"
	};
	return {
		aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
		k: c,
		i: "</",
		c: [e, t.CLCM, t.CBCM, s, r, i, {
			b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
			e: ">",
			k: c,
			c: ["self", e]
		},
		{
			b: t.IR + "::",
			k: c
		},
		{
			bK: "new throw return else",
			r: 0
		},
		{
			cN: "function",
			b: "(" + t.IR + "[\\*&\\s]+)+" + a,
			rB: !0,
			e: /[{;=]/,
			eE: !0,
			k: c,
			i: /[^\w\s\*&]/,
			c: [{
				b: a,
				rB: !0,
				c: [t.TM],
				r: 0
			},
			{
				cN: "params",
				b: /\(/,
				e: /\)/,
				k: c,
				r: 0,
				c: [t.CLCM, t.CBCM, r, s]
			},
			t.CLCM, t.CBCM, i]
		}]
	}
});
hljs.registerLanguage("scheme", function (e) {
	var t = "[^\\(\\)\\[\\]\\{\\}\",'`;#|\\\\\\s]+",
	r = "(\\-|\\+)?\\d+([./]\\d+)?",
	i = r + "[+\\-]" + r + "i",
	a = {
		built_in: "case-lambda call/cc class define-class exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules ' * + , ,@ - ... / ; < <= = => > >= ` abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?"
	},
	n = {
		cN: "shebang",
		b: "^#!",
		e: "$"
	},
	c = {
		cN: "literal",
		b: "(#t|#f|#\\\\" + t + "|#\\\\.)"
	},
	l = {
		cN: "number",
		v: [{
			b: r,
			r: 0
		},
		{
			b: i,
			r: 0
		},
		{
			b: "#b[0-1]+(/[0-1]+)?"
		},
		{
			b: "#o[0-7]+(/[0-7]+)?"
		},
		{
			b: "#x[0-9a-f]+(/[0-9a-f]+)?"
		}]
	},
	s = e.QSM,
	o = [e.C(";", "$", {
		r: 0
	}), e.C("#\\|", "\\|#")],
	u = {
		b: t,
		r: 0
	},
	p = {
		cN: "variable",
		b: "'" + t
	},
	d = {
		eW: !0,
		r: 0
	},
	g = {
		cN: "list",
		v: [{
			b: "\\(",
			e: "\\)"
		},
		{
			b: "\\[",
			e: "\\]"
		}],
		c: [{
			cN: "keyword",
			b: t,
			l: t,
			k: a
		},
		d]
	};
	return d.c = [c, l, s, u, p, g].concat(o),
	{
		i: /\S/,
		c: [n, l, s, p, g].concat(o)
	}
});
hljs.registerLanguage("http", function (t) {
	return {
		aliases: ["https"],
		i: "\\S",
		c: [{
			cN: "status",
			b: "^HTTP/[0-9\\.]+",
			e: "$",
			c: [{
				cN: "number",
				b: "\\b\\d{3}\\b"
			}]
		},
		{
			cN: "request",
			b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
			rB: !0,
			e: "$",
			c: [{
				cN: "string",
				b: " ",
				e: " ",
				eB: !0,
				eE: !0
			}]
		},
		{
			cN: "attribute",
			b: "^\\w",
			e: ": ",
			eE: !0,
			i: "\\n|\\s|=",
			starts: {
				cN: "string",
				e: "$"
			}
		},
		{
			b: "\\n\\n",
			starts: {
				sL: [],
				eW: !0
			}
		}]
	}
});
hljs.registerLanguage("json", function (e) {
	var t = {
		literal: "true false null"
	},
	i = [e.QSM, e.CNM],
	l = {
		cN: "value",
		e: ",",
		eW: !0,
		eE: !0,
		c: i,
		k: t
	},
	c = {
		b: "{",
		e: "}",
		c: [{
			cN: "attribute",
			b: '\\s*"',
			e: '"\\s*:\\s*',
			eB: !0,
			eE: !0,
			c: [e.BE],
			i: "\\n",
			starts: l
		}],
		i: "\\S"
	},
	n = {
		b: "\\[",
		e: "\\]",
		c: [e.inherit(l, {
			cN: null
		})],
		i: "\\S"
	};
	return i.splice(i.length, 0, c, n),
	{
		c: i,
		k: t,
		i: "\\S"
	}
});
hljs.registerLanguage("scss", function (e) {
	var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
	i = {
		cN: "variable",
		b: "(\\$" + t + ")\\b"
	},
	r = {
		cN: "function",
		b: t + "\\(",
		rB: !0,
		eE: !0,
		e: "\\("
	},
	o = {
		cN: "hexcolor",
		b: "#[0-9A-Fa-f]+"
	};
	({
		cN: "attribute",
		b: "[A-Z\\_\\.\\-]+",
		e: ":",
		eE: !0,
		i: "[^\\s]",
		starts: {
			cN: "value",
			eW: !0,
			eE: !0,
			c: [r, o, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
				cN: "important",
				b: "!important"
			}]
		}
	});
	return {
		cI: !0,
		i: "[=/|']",
		c: [e.CLCM, e.CBCM, r, {
			cN: "id",
			b: "\\#[A-Za-z0-9_-]+",
			r: 0
		},
		{
			cN: "class",
			b: "\\.[A-Za-z0-9_-]+",
			r: 0
		},
		{
			cN: "attr_selector",
			b: "\\[",
			e: "\\]",
			i: "$"
		},
		{
			cN: "tag",
			b: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
			r: 0
		},
		{
			cN: "pseudo",
			b: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
		},
		{
			cN: "pseudo",
			b: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
		},
		i, {
			cN: "attribute",
			b: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
			i: "[^\\s]"
		},
		{
			cN: "value",
			b: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
		},
		{
			cN: "value",
			b: ":",
			e: ";",
			c: [r, i, o, e.CSSNM, e.QSM, e.ASM, {
				cN: "important",
				b: "!important"
			}]
		},
		{
			cN: "at_rule",
			b: "@",
			e: "[{;]",
			k: "mixin include extend for if else each while charset import debug media page content font-face namespace warn",
			c: [r, i, e.QSM, e.ASM, o, e.CSSNM, {
				cN: "preprocessor",
				b: "\\s[A-Za-z0-9_.-]+",
				r: 0
			}]
		}]
	}
});
hljs.registerLanguage("java", function (e) {
	var a = e.UIR + "(<" + e.UIR + ">)?",
	t = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",
	c = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
	r = {
		cN: "number",
		b: c,
		r: 0
	};
	return {
		aliases: ["jsp"],
		k: t,
		i: /<\/|#/,
		c: [e.C("/\\*\\*", "\\*/", {
			r: 0,
			c: [{
				cN: "doctag",
				b: "@[A-Za-z]+"
			}]
		}), e.CLCM, e.CBCM, e.ASM, e.QSM, {
			cN: "class",
			bK: "class interface",
			e: /[{;=]/,
			eE: !0,
			k: "class interface",
			i: /[:"\[\]]/,
			c: [{
				bK: "extends implements"
			},
			e.UTM]
		},
		{
			bK: "new throw return else",
			r: 0
		},
		{
			cN: "function",
			b: "(" + a + "\\s+)+" + e.UIR + "\\s*\\(",
			rB: !0,
			e: /[{;=]/,
			eE: !0,
			k: t,
			c: [{
				b: e.UIR + "\\s*\\(",
				rB: !0,
				r: 0,
				c: [e.UTM]
			},
			{
				cN: "params",
				b: /\(/,
				e: /\)/,
				k: t,
				r: 0,
				c: [e.ASM, e.QSM, e.CNM, e.CBCM]
			},
			e.CLCM, e.CBCM]
		},
		r, {
			cN: "annotation",
			b: "@[A-Za-z]+"
		}]
	}
});
hljs.registerLanguage("php", function (e) {
	var c = {
		cN: "variable",
		b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
	},
	a = {
		cN: "preprocessor",
		b: /<\?(php)?|\?>/
	},
	i = {
		cN: "string",
		c: [e.BE, a],
		v: [{
			b: 'b"',
			e: '"'
		},
		{
			b: "b'",
			e: "'"
		},
		e.inherit(e.ASM, {
			i: null
		}), e.inherit(e.QSM, {
			i: null
		})]
	},
	t = {
		v: [e.BNM, e.CNM]
	};
	return {
		aliases: ["php3", "php4", "php5", "php6"],
		cI: !0,
		k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
		c: [e.CLCM, e.HCM, e.C("/\\*", "\\*/", {
			c: [{
				cN: "doctag",
				b: "@[A-Za-z]+"
			},
			a]
		}), e.C("__halt_compiler.+?;", !1, {
			eW: !0,
			k: "__halt_compiler",
			l: e.UIR
		}), {
			cN: "string",
			b: /<<<['"]?\w+['"]?$/,
			e: /^\w+;?$/,
			c: [e.BE, {
				cN: "subst",
				v: [{
					b: /\$\w+/
				},
				{
					b: /\{\$/,
					e: /\}/
				}]
			}]
		},
		a, c, {
			b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
		},
		{
			cN: "function",
			bK: "function",
			e: /[;{]/,
			eE: !0,
			i: "\\$|\\[|%",
			c: [e.UTM, {
				cN: "params",
				b: "\\(",
				e: "\\)",
				c: ["self", c, e.CBCM, i, t]
			}]
		},
		{
			cN: "class",
			bK: "class interface",
			e: "{",
			eE: !0,
			i: /[:\(\$"]/,
			c: [{
				bK: "extends implements"
			},
			e.UTM]
		},
		{
			bK: "namespace",
			e: ";",
			i: /[\.']/,
			c: [e.UTM]
		},
		{
			bK: "use",
			e: ";",
			c: [e.UTM]
		},
		{
			b: "=>"
		},
		i, t]
	}
});
