'use strict';

const BASE_URL = "https://api.lyrics.ovh/v1/";

function getLyrics(artist, title) {
 
    const params = {
        artist: artist,
        title: title
    };
    const queryitems = Object.keys(params).map(key => `${encodeURIComponent(params[key])}`);
    const queryString = queryitems.join('/');
    const url = `${BASE_URL}${queryString}`;

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson["lyrics"])
    )
    .catch(err => {
      $('#results').html(`<p class="error-text" aria-live="assertive">Oops! ${err.message}</p>`);
    }); 
}

function displayResults(responseJson) {

    const formatLyrics = responseJson.split('\n');

    $('#results').html(`<p class="lyrics-text aria-live="assertive"><br>${formatLyrics.join("<br>")}</p>`); 

}

function watchForm() {

    $('button').click(function(event) {
        event.preventDefault();
 
        const artist = $('.js-query-artist').val();
        const title = $('.js-query-title').val();

        getLyrics(artist, title);
    });
}

$(watchForm);

