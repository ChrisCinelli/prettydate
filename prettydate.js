PrettyDate = {options: {}};

//Interval id for the setInterval
var intervalId; 

var countLiveUses   = 0, //Used to keep track if we are using live counts
    lastLiveUpdates = 0;   //Number of the last span[data-prettydate] in the page

//Just some stats
PrettyDate.getLiveStats = function(){
    return {tot: countLiveUses, last: lastLiveUpdates};
}

var defaultOptions = {
    refreshRate : 5000 //Set to 0 to turnOff live updates
};

// Call this to change the refreshrate or change any other param.
PrettyDate.setOptions = function (opt){
  var oldRefreshRate = PrettyDate.options.refreshRate;
  PrettyDate.options = _.extend({}, defaultOptions, opt || {});

  if (oldRefreshRate != PrettyDate.options.refreshRate) {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    if (countLiveUses && PrettyDate.options.refreshRate){
      setLiveUpdates(); 
    }    
  }
}

//Register a helper so we can use {{prettydate createdAt}}
UI.registerHelper('prettydate', function(context, options) {
  if (context) {
    var momentTime = moment(context);

    if (options.hash.live === true){
      countLiveUses++;
      if(!intervalId && PrettyDate.options.refreshRate){
        setLiveUpdates(); 
      }
  
      return new Handlebars.SafeString("<span data-prettydate='"+momentTime.toDate()+"'>"+momentTime.fromNow()+"</span>");
    } else {
      return momentTime.fromNow();
    }
  }
});

// This function set and interval to find all the span[data-prettydate] in the page and
// update the value of the timeout if necessary.

// You may argue that is not doing it the "Meteor" way but considering the HTML output of the helper,
// this work fine in any use cases in the DOM
function setLiveUpdates () {
  intervalId = setInterval(function(){
    $elems = $("span[data-prettydate]");
    lastLiveUpdates = $elems.length;
    $elems.each(function(){
      var $el = $(this),
        newContent = moment($el.data("prettydate")).fromNow(),
        oldContent = $el.html();

      if (newContent != oldContent) {
        $el.html(newContent);
      }
    });
  }, PrettyDate.options.refreshRate);
}

PrettyDate.setOptions();