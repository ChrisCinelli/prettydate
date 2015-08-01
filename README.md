## PrettyDate - Meteor Package
Make pretty time and date similar to Facebook. 

Ex: `a few seconds ago`, `2 minutes ago`, `a day ago`, etc. 

Support live updates. It is similar to [livestamp](https://atmospherejs.com/copleykj/livestamp), [timeago](https://atmospherejs.com/wollardj/timeago) and [nicetime](https://github.com/robinduckett/nicetime) plugins. 
It uses the moment.js package. 

This plugin is pretty fast and it does **not** use any jQuery plugin.


### Example
   See https://PrettyDate-Demo-Chat.meteor.com (code on [this repo](https://github.com/chriscinelli/meteor-chat) )

### Common use
You can use the `prettydate` helper in the spacebars template:

     <template name="feedItem"> 
       <div class="feedItem">
         <div class="title">{{title}}</div>
         <div class="time">{{prettydate createdAt live=true}}</div>
       </div>
     </template>

`live=true` is optional.

### Advance use

You can use `PrettyDate.setOptions({refreshRate : YOUR_DESIRED_RATE_IN_MS})` to change the default refresh rate. Normally every 5 seconds every live tag on the page is checked and updated if necessary.

You can use `PrettyDate.getLiveStats()` to get the number of the `tot` prettydate live elements created and the `last` number of elements evaluated during the last refresh cycle.

This plugin uses [momentjs.fromNow](http://momentjs.com/docs/#/displaying/fromnow/) function to get  the pretty time string. If you want to customize the format look at [setting a different locale for moment](http://momentjs.com/docs/#/customization/relative-time/). For example you can use this:

    moment.locale('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s",
            s:  "a moment ago",
            m:  "a min",
            mm: "%d mins",
            h:  "an hrs",
            hh: "%d hrs",
            d:  "yesterday",
            dd: "%d days",
            M:  "a month",
            MM: "%d months",
            y:  "a year",
            yy: "%d years"
        }
    });

### Issues

Use https://github.com/chriscinelli/prettydate/issues