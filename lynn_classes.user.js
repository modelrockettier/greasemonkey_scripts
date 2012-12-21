// ==UserScript==
// @name		Lynn Classes
// @description	This script removes all known prevention measures in place that keep you from easily saving the content on Professor Douglas Lynn's website.
// @namespace	http://www.modelrockettier.com
// @include	    http://www.cset.oit.edu/~lynnd/*
// @version	    1
// ==/UserScript==

// disable the onblur function (leaving the window, clicking on a different tab, etc.), which blanks the page content
unsafeWindow.onblur = null;
// disable the onfocus function (returning to/refocusing the window), which blanks the page content
unsafeWindow.onfocus = null;

// disable the onmousedown function (when you click the mouse), which blanks page content
document.wrappedJSObject.onmousedown = null;
// disable the onkeydown function (when a key is pressed), which blanks the page content if ctrl is pressed
document.wrappedJSObject.onkeydown = null;

// clear the window timeout function
unsafeWindow.clearTimeout(unsafeWindow.timerID);

// remove any message about the window timing out
if ( document.getElementsByTagName("span") && document.getElementsByTagName("span")[0].innerHTML.replace(/[ \t\n]+/g," ").substr(0,24) == "This window will timeout" )
{
	document.getElementsByTagName("span")[0].innerHTML = "This window will no longer timeout.  You're welcome.<br><br>\n";
}

// restore the printing text style
style = document.createElement('style');
rules = document.createTextNode("body {display:inherit !important;}");
style.type = 'text/css';
style.media = 'print';

if(style.styleSheet)
	style.styleSheet.cssText = rules.nodeValue;
else
	style.appendChild(rules);

document.getElementsByTagName('head')[0].appendChild(style);
