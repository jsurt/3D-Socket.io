function getLocalJsonData(searchTerm, callBack) {
    $.getJSON('characters.json', callBack);
}

function gotData(data) {
    console.log(data);
    console.log(query);
    $('#searchCharacter').val('');
    for(let i = 0; i < data.length; i++) {
        if(query === data[i].Name) {
            let characterId = i;
            console.log(characterId);
            displayCharacterInfo(data, characterId);
        }
    }
}

function displayCharacterInfo(data, characterId) {
    console.log(data[characterId]);
    $('.info-results').html(
        `<p class="character-name">Name: ${data[characterId].Name}</p>
        <p class="character-culture">Culture: ${data[characterId].Culture}</p>`
    );   
    $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/youtube/v3/search",
        data: {
            part: "snippet",
            key: "AIzaSyAH3n0AVo3RaBhwbs2lNFCQh6UJmluqj-w",
            q: `${query}`,
            per_page: 9
        },
        success: renderYoutubeResults
    });
}

function renderYoutubeResults(data) {
    console.log(data);
    var resultsHTML = '<div class="col-12">';
    data.items.forEach(function (item) {
    resultsHTML = (resultsHTML + '<div><div class="col-4 vid-column">' +
      '<div class="card-image">' +
        '<iframe src="https://www.youtube.com/embed/' + item.id.videoId + '" frameborder="0" allowfullscreen></iframe>' +
      '</div>' +
      '<div class="vid-title">' +
        '<p class="truncate">' + item.snippet.title + '</p>' +
      '</div>' +
      '<div class="card-action">' +
        '<a href="https://www.youtube.com/channel/' + item.snippet.channelId + '">View more from '+ item.snippet.channelTitle + '</a>' +
      '</div>' + 
      '</div></div>')
  });  
    resultsHTML = resultsHTML + '</div>';
    $('.youtube-results').html(resultsHTML);
}

function startSearch() {
    $('#searchForm').submit(function(event){
        event.preventDefault();
        query = $('#searchCharacter').val();
        getLocalJsonData(query, gotData);
    })
}





startSearch();