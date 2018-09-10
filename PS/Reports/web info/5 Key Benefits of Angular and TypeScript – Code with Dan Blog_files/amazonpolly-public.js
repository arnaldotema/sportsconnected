(function($){'use strict';$(document).ready(function(){var langs=["src","en","es","de","pt","fr"];function hideAll(){for(var i=0;i<langs.length;i++){var lan=langs[i];if($('#amazon-polly-audio-play-'.concat(lan)).length){$('#amazon-polly-audio-play-'.concat(lan))[0].pause();$('#amazon-polly-audio-play-'.concat(lan)).hide();}
if($('#amazon-polly-transcript-'.concat(lan)).length){$('#amazon-polly-transcript-'.concat(lan)).hide();}
if($('#amazon-polly-trans-'.concat(lan)).length){$('#amazon-polly-trans-'.concat(lan)).css("font-weight","normal");}}}
function showPlayer(lan){if($('#amazon-polly-audio-play-'.concat(lan)).length){$('#amazon-polly-audio-play-'.concat(lan)).show();}
if($('#amazon-polly-transcript-'.concat(lan)).length){$('#amazon-polly-transcript-'.concat(lan)).show();}
if($('#amazon-polly-trans-'.concat(lan)).length){$('#amazon-polly-trans-'.concat(lan)).css("font-weight","Bold");}}
hideAll()
showPlayer('src');$('#amazon-polly-trans-src').click(function(){hideAll()
showPlayer('src');});$('#amazon-polly-trans-en').click(function(){hideAll()
showPlayer('en');});$('#amazon-polly-trans-es').click(function(){hideAll()
showPlayer('es');});$('#amazon-polly-trans-de').click(function(){hideAll()
showPlayer('de');});$('#amazon-polly-trans-fr').click(function(){hideAll()
showPlayer('fr');});$('#amazon-polly-trans-pt').click(function(){hideAll()
showPlayer('pt');});});})(jQuery);