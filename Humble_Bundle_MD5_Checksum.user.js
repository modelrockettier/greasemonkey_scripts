// ==UserScript==
// @name        Humble Bundle MD5 Checksum
// @author      Tim Schlueter
// @namespace   http://www.modelrockettier.com
// @description This script compiles all of the MD5 checksums from a Humble Bundle download page into a section that can be copied as a .md5 file to check all files of a certain variety against.
// @include     https://www.humblebundle.com/*?key=*
// @version     1
// ==/UserScript==

var checksums = [];
var alert_errors = true;

function startWhenReady() {
    parseAllChecksums();
}

// function parseDownload( i, e )
function parseDownload( e ) {
    // var c = $( e ).contents();

    // var a = c.find( 'a.a' );
    var a = e.getElementsByClassName( 'a' );
    if ( a.length && a[0].tagName == 'A' ) {
        var file = a[0].href;
        file = file.replace( /^.*humblebundle.com\/([^?]+)\?.*/, '$1' );

        // a = c.find( 'a.dlmd5' );
        a = e.getElementsByClassName( 'dlmd5' );
        if ( a.length && a[0].tagName == 'A' ) {
            var md5 = a[0].href;
            md5 = md5.replace( /^[^#]*#/, '' );

            var data = md5 + " *" + file;
            if ( checksums.indexOf(data) < 0 )
                checksums.push( data );
        }
    }
}

function parseChecksums( className ) {
    checksums = [];

    var e = document.getElementsByClassName( className );
    // $( 'div.'+className+' div.download' ).each( parseDownload );
    for ( var i = 0; i < e.length; ++i ) {
        if ( e[i].tagName == 'DIV' ) {
            var c = e[i].getElementsByClassName( 'download' );
            for ( var j = 0; j < c.length; ++j ) {
                if ( c[j].tagName == 'DIV' )
                    parseDownload( c[j] );
            }
        }
    }

    if ( checksums.length > 0 ) {
        var div = document.getElementById( 'md5_checksums' );
        if ( !div ) {
            div = document.createElement( 'div' );
            div.className = 'whitebox';
            div.innerHTML = '<div class="whitetop"></div><div class="whitemid"></div><div class="whitebottom"></div><div class="whitecontent"><div class="shrinkwrapper-new"><div class="keystation-new"><a class="expandkeys-new" href="#">Click here to show MD5 checksums.</a></div><div class="shrinksizer-new"><div style="display:block" class="keytab" id="md5_checksums"></div></div></div></div><div class="staple s3"></div><div class="staple s4"></div>';

            document.getElementById( 'papers-content' ).appendChild( div );
        }

        var main_div = document.getElementById( 'md5_checksums' );
        div = document.getElementById( className + '_checksums' );
        if ( !div ) {
            div = document.createElement( 'div' );
            div.id = className + '_checksums';
            div.className = 'redeemheading';
            div.style.paddingBottom = '5px';
            div.innerHTML = className + " checksums:\n";
            main_div.appendChild( div );

            div = document.createElement( 'div' );
            div.style.marginBottom = '5px';
            main_div.appendChild( div );
            var pre = document.createElement( 'pre' );
            pre.id = className + '_md5';
            div.appendChild( pre );

            div = document.createElement( 'div' );
            div.className = 'clear';
            main_div.appendChild( div );
        }

        var m = document.getElementById( className + '_md5' );
        m.innerHTML = '';
        for ( var i = 0; i < checksums.length; ++i ) {
            m.innerHTML += checksums[i] + "\n";
        }

        m.innerHTML += "\n";
    }
}

function parseAllChecksums()
{
    try {
        parseChecksums( 'windows' );
        parseChecksums( 'mac' );
        parseChecksums( 'linux' );
        parseChecksums( 'android' );
        parseChecksums( 'audio' );
    } catch ( err ) {
        if ( alert_errors )
            alert( err );

        throw err;
    }
}

startWhenReady();
