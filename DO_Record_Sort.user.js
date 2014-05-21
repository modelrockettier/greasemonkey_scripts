// ==UserScript==
// @name        Digital Ocean Record Sort
// @author      Tim Schlueter
// @namespace   http://www.modelrockettier.com
// @description Sort Digital Ocean domain records alphabetically (and mx records numerically)
// @match       https://cloud.digitalocean.com/domains/*
// @version     1
// @js          http://code.jquery.com/jquery-1.11.1.min.js
// @grant       none
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function () {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function rv(k) {
	return k.children[0].value;
}

function sortRecords(type, numeric) {
	if (typeof(numeric) === "undefined")
		numeric = 0;

	var records = $("#" + type + "_records .data");
	while (records.length > 0) {
		var min = 0;
		for (var i = 1; i < records.length; ++i) {
			if (numeric == 0) {
				if (rv(records[min]).localeCompare(rv(records[i])) > 0) {
					min = i;
				}
			} else if (Number(rv(records[min])) > rv(records[i])) {
				min = i;
			}
		}

		var p = records[min];
		while (p.className != "domain_record")
			p = p.parentElement;

		var pp = p.parentNode;
		pp.appendChild(p);
		records.splice(min, 1);
	}
}

function main() {
	sortRecords("a");
	sortRecords("aaaa");
	sortRecords("cname");
	sortRecords("mx", 1);
	sortRecords("srv");
	sortRecords("ns");
}

// make sure that rv and sortRecords are available to our main function
var script = document.createElement("script");
script.textContent = rv.toString() + sortRecords.toString();
document.body.appendChild(script);

// add jquery and then call main
addJQuery(main);
