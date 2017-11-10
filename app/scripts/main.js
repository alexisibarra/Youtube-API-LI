var id = 'UCCc2H9_eNnU7ucq2n7Sh3Rg';
var key = 'AIzaSyCKpXRxL4LysV2gtUYmjt_RlIPHfMp8674';
var channelId = 'UUCc2H9_eNnU7ucq2n7Sh3Rg';

function getVids(pid){
  return $.get(
    'https://www.googleapis.com/youtube/v3/playlistItems', {
      part: 'snippet',
      maxResults: 3, 
      playlistId: pid,
      key: key
    }
  )
}

function getTelevisionCarouselItem(item){
  var iframe = '<iframe src="https://www.youtube.com/embed/'+ item.snippet.resourceId.videoId +'" frameborder="0" allowfullscreen></iframe>';
  return '<div class="television-item">' + iframe + '</div>'
}

$(document).ready(function(){    
  getVids(channelId)
    .done(function(data){
      var output = '';
      data.items.map(function(item){
        output += getTelevisionCarouselItem(item);
      })
      
      $('#television').append(output)
    }).then(function(){
      $('.owl-carousel').owlCarousel({
        autoplay: true,
        items: 1,
        autoplayTimeout:5000,
        autoplayHoverPause: true,
        dotsEach: true,
        nav: true,
        loop: true,
        dots: false
      });
    })
})