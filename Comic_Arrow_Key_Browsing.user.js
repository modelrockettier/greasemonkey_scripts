// ==UserScript==
// @name        Comic Arrow Key Browsing
// @namespace   http://www.modelrockettier.com
// @description This script adds arrow key navigation to several comic sites.  left, right, up, and down arrows scroll the page.  ctrl+left=previous comic, ctrl+right=next comic, ctrl+up or home=first comic, ctrl+down or end=latest comic, insert=random comic (if supported).
// @include     /^http://(www\.)?girlgeniusonline\.com/comic\.php/
// @include     /^http://(www\.)?xkcd\.com/([0-9]+/)?/
// @include     /^http://(www\.)?questionablecontent\.net/(view\.php)?/
// @include     /^http://(www\.)?ftf-comics\.com//
// @include     /^http://(www\.)?cad-comic\.com/(cad|sillies)//
// @include     /^http://(www\.)?terminallance\.com/(20[0-9]{2}/[0-9]{2}/{2}/)?/
// @version     1
// ==/UserScript==

var home_key		= 36;
var end_key			= 35;
var insert_key		= 45;
var delete_key		= 46;
var left_arrow		= 37;
var up_arrow		= 38;
var right_arrow		= 39;
var down_arrow		= 40;

function navigate( item ) {
	var clicked = false;
	// try girl genius navigation
	try {
		var a = document.getElementById('MainTable').firstElementChild.children[1].firstElementChild.firstElementChild.getElementsByTagName('A');
		
		var patterns = [ /first/i, /previous/i, /next/i, /most recent/i, null ];
		
		for ( var i = 0; i < a.length && !clicked; ++i ) {
			if ( a[i].firstElementChild.alt.search(patterns[item]) >= 0 ) {
				a[i].click();
				clicked = true;
			}
		}
	} catch ( e ) {
		// ignore errors
	}
	
	// try xkcd navigation
	try {
		var li = document.getElementsByClassName('comicNav')[0].children;
		
		var patterns = [ '\\|<', /prev/i, /next/i, '>\\|', /random/i ];
		
		for ( var i = 0; i < li.length && !clicked; ++i ) {
			if ( li[i].firstElementChild.text.search(patterns[item]) >= 0 ) {
				li[i].firstElementChild.click();
				clicked = true;
			}
		}
	} catch ( e ) {
		// ignore errors
	}
	
	// try questionable content navigation
	try {
		var ul = document.getElementsByClassName('inline-list');
		var li = null;
		for ( var i = 0; i < ul.length; ++i ) {
			if ( ul[i].id == 'comicnav' )
				li = ul[i].children;
		}
		
		var patterns = [ /first/i, /previous/i, /next/i, /latest/i, /random/i ];
		
		for ( var i = 0; i < li.length && !clicked; ++i ) {
			if ( li[i].firstElementChild.text.search(patterns[item]) >= 0 ) {
				li[i].firstElementChild.click();
				clicked = true;
			}
		}
	} catch ( e ) {
		// ignore errors
	}
	
	// try failure to fire navigation
	try {
		var a = document.getElementsByClassName('comic_navi')[0].getElementsByTagName('a');
		
		var patterns = [ /first/i, /prev/i, /next/i, /last/i, null ];
		
		for ( var i = 0; i < a.length && !clicked; ++i ) {
			if ( a[i].className.search(patterns[item]) >= 0 ) {
				a[i].click();
				clicked = true;
			}
		}
	} catch ( e ) {
		// ignore errors
	}
	
	// try ctrl+alt+del navigation
	try {
		var a = document.getElementsByClassName('navigation')[0].getElementsByTagName('a');
		
		var patterns = [ /first/i, /back/i, /next/i, /last/i, /random/i ];
		
		for ( var i = 0; i < a.length && !clicked; ++i ) {
			if ( a[i].text.search(patterns[item]) >= 0 ) {
				a[i].click();
				clicked = true;
			}
		}
	} catch ( e ) {
		// ignore errors
	}
	
	// try terminal lance navigation
	try {
		var a = document.getElementById('comic_navi').getElementsByTagName('a');
		
		var patterns = [ /first/i, /previous/i, /next/i, /latest/i, null ];
		
		for ( var i = 0; i < a.length && !clicked; ++i ) {
			if ( a[i].text.search(patterns[item]) >= 0 ) {
				a[i].click();
				clicked = true;
			}
		}
	} catch ( e ) {
		// ignore errors
	}
}

function keyPressHandler(e) {
	// make sure this is a keydown event
	if ( e.type == "keydown" ) {
		// keys that don't change from the ctrl key
		if ( e.keyCode == home_key ) {
			navigate( 0 ); // first comic
		} else if ( e.keyCode == end_key ) {
			navigate( 3 ); // last comic
		} else if ( e.keyCode == insert_key || e.keyCode == delete_key ) {
			navigate( 4 ); // last comic
		// if the ctrl key is held browse
		} else if ( e.ctrlKey ) {
			if ( e.keyCode == left_arrow ) {
				navigate( 1 ); // previous comic
			} else if ( e.keyCode == right_arrow ) {
				navigate( 2 ); // next comic
			} else if ( e.keyCode == up_arrow ) {
				navigate( 0 ); // first comic
			} else if ( e.keyCode == down_arrow ) {
				navigate( 3 ); // last comic
			}
		} else {
			if ( e.keyCode == left_arrow ) {
				window.scrollTo( window.scrollX - 20, window.scrollY );
			} else if ( e.keyCode == right_arrow ) {
				window.scrollTo( window.scrollX + 20, window.scrollY );
			} else if ( e.keyCode == up_arrow ) {
				window.scrollTo( window.scrollX, window.scrollY - 20 );
			} else if ( e.keyCode == down_arrow ) {
				window.scrollTo( window.scrollX, window.scrollY + 20 );
			}
		}
	}
}

window.onkeydown = keyPressHandler;
