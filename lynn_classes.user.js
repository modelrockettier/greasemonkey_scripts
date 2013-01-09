// ==UserScript==
// @name        Lynn Classes
// @author      Tim Schlueter
// @description This script removes all measures currently in place to keep you from easily accessing and saving various content on Professor Douglas Lynn's website.
// @namespace   http://www.modelrockettier.com
// @match       http://www.cset.oit.edu/~lynnd/*
// @version     1.1
// ==/UserScript==

// in greasemonkey we're only concerned with the actual window and document, not the wrappers
if ( typeof(unsafeWindow) != 'undefined' )
    window = unsafeWindow;
if ( typeof(document.wrappedJSObject) != 'undefined' )
    document = document.wrappedJSObject;

// disable the onblur function (leaving the window, clicking on a different tab, etc.), which blanks the page content
window.onblur = null;
// disable the onfocus function (returning to/refocusing the window), which blanks the page content
window.onfocus = null;

// disable the onmousedown function (when you click the mouse), which blanks page content
document.onmousedown = null;
// disable the onkeydown function (when a key is pressed), which blanks the page content if ctrl is pressed
document.onkeydown = null;

// clear the window timeout, if one exists
if ( typeof(window.timerID) != 'undefined' )
    window.clearTimeout( window.timerID );

// remove any message about the window timing out
var span_tags = document.getElementsByTagName( "span" );
if ( span_tags && span_tags[0] && span_tags[0].innerHTML ) {
    if ( span_tags[0].innerHTML.replace(/[ \t\n]+/g," ").substr(0,24) == "This window will timeout" )
        span_tags[0].innerHTML = "This window will no longer timeout.  You're welcome.<br><br>\n";
}

// restore the printing text style
var style = document.createElement( 'style' );
var rules = document.createTextNode( 'body {display:inherit !important;}' );
style.type = 'text/css';
style.media = 'print';

if ( style.styleSheet )
    style.styleSheet.cssText = rules.nodeValue;
else
    style.appendChild( rules );

var head = document.getElementsByTagName( 'head' );
if ( head[0] )
    head[0].appendChild( style );
