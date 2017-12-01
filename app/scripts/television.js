var youtubeKey = 'AIzaSyCKpXRxL4LysV2gtUYmjt_RlIPHfMp8674';
var laIguanaChannelId = 'UUCc2H9_eNnU7ucq2n7Sh3Rg';

var currentPlaylist = [];
var allPlaylists = [];

var playlists = [
  { 
    'slug': 'sucedio',
    'name': '#Sucedió',
    'id': 'PLhWb5WkWxeDDvhGj6DxiHp4IfP5Dl4hMT'
  },
  { 
    'slug': 'endirecto',
    'name': 'En Directo: Laiguana.tv',
    'id': 'PLhWb5WkWxeDCADclCAZ1i_EtJbhORvcPb'
  },
  { 
    'slug': 'en1minuto',
    'name': '#En1Minuto',
    'id': 'PLhWb5WkWxeDDDMrk6Q0V6Xb9qf48Hyov1'
  },
  { 
    'slug': 'caraacara',
    'name': '#CaraACara',
    'id': 'PLhWb5WkWxeDCjMTqCL9UJ8eF1EOChAV-I'
  },
  { 
    'slug': 'daleplay',
    'name': '#DalePLay',
    'id': 'PLhWb5WkWxeDBjDfIoa-2csylhGoEtToVB'
  },
  { 
    'slug': 'laoficina',
    'name': '#LaOficina',
    'id': 'PLhWb5WkWxeDDAlkBR_NfXEZs-5k7SiZ1_'
  },
  { 
    'slug': 'enlapista',
    'name': '#EnLaPista',
    'id': 'PLhWb5WkWxeDCaraC5mwZrNqmkIcIwZB6U'
  },
  { 
    'slug': 'reportesli',
    'name': 'Reportes Li',
    'id': 'PLhWb5WkWxeDC9lB91hGdhuBwbwua3EHvg'
  },
  { 
    'slug': 'bienraro',
    'name': '#BienRaro: Videos incomprensibles',
    'id': 'PLhWb5WkWxeDBOsQzv9t_clYJL68OliZD7'
  },
  { 
    'slug': 'versame',
    'name': '#Vérsame',
    'id': 'PLhWb5WkWxeDA4x_9HbYOJMlHr-5jYAFLU'
  },
  { 
    'slug': 'pontealdia',
    'name': 'Ponte al día',
    'id': 'PLhWb5WkWxeDC8J3BoB_3ZcCF3jfKbdL3L'
  },
  { 
    'slug': 'deloqueunoseentera',
    'name': '#DeLoQueUnoSeEntera',
    'id': 'PLhWb5WkWxeDBS6O3BjY0ilhKJllJCVQCd'
  },
]

function getVids(pid){
  return $.get(
    'https://www.googleapis.com/youtube/v3/playlistItems', {
      part: 'snippet',
      maxResults: 10, 
      playlistId: pid,
      key: youtubeKey
    }
  )
}

function getMainPlayer(index){
  var item = currentPlaylist[index];
  return '<iframe src="https://www.youtube.com/embed/'+ item.snippet.resourceId.videoId +'" frameborder="0" allowfullscreen></iframe>';
}

function getRelatedItem(item, index){
  return `
    <div class="video-item row" onClick="changePlayer(${index})">
      <div class="col-xs-5">
        <img class="img-responsive" src="${item.snippet.thumbnails.default.url}">
      </div>
      <p class="col-xs-7 title">
        ${item.snippet.title}
      </p>    
    </div>
  `;
}

function changePlayer(index){
  $('#player').html(getMainPlayer(index));  
}

function loadPlayer(index) {
  currentPlaylist = allPlaylists[index].items;
  
  $('#player').html(getMainPlayer(index));

  var related = '';
  
  currentPlaylist.map(function(item, index){
    related += getRelatedItem(item, index);
  })
  
  $('#related').html(related);
}

function changePlaylist(index){
  loadPlayer(index);
}

function loadPlaylists(){
  allPlaylists.map(function(item, index){
    return loadPlaylistItem(item, index);
  })
}

function getPlaylistItem(item, index){
  return `
    <div class="video-item">
      <img onClick="changePlaylist(${index})" class="img-responsive" src="${item.items[0].snippet.thumbnails.standard.url}">      
    </div>
  `
}

function loadPlaylistItem(item, index){
  $('#related-playlists').append(getPlaylistItem(item, index));
}

$(document).ready(function(){  
  Promise.all(playlists.map( function(playlist){
    return getVids(playlist.id)
  }))
  .then(function(results){
    allPlaylists = results;
    loadPlayer(0);
    
    loadPlaylists();
  })
  .then(function(){
    $('.owl-carousel').owlCarousel({
      autoplay: true,
      items: 3,
      autoplayTimeout:5000,
      autoplayHoverPause: true,
      dotsEach: true,
      nav: true,
      loop: true,
      dots: false
    });
  })
})