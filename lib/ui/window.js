var blessed=require('blessed')
    ,screen=blessed.screen();

// the main object this module will export
var window={};

// expose the rendering function
window.render=function() { 
  screen.render(); 
};

// expose options so that plugins can modify them
// this also provides a shared variable space (window specific)
window.options={
  debug:true
};

// dimensions of the window
window.dim={
  w:screen.width
  ,h:screen.height
};

window.users=[
  '@ansuz',
  '@lukevers',
  'inhies'
];
var u_width = window.users.reduce(function (a, b) { return a.length > b.length ? a : b; }).length;

var chans=[
  '#utterjs',
  '#nodejs',
  '#lukevers',
  '#webdev'
].map(function(c, v) { return ++v + '.' + c });
var c_width = chans.reduce(function(a, b) { return a.length > b.length ? a : b; }).length;

window.CHANLIST=blessed.form({
  parent:screen
  ,keys:true
  ,left:0
  ,top:0
  ,width:'shrink'
  ,height:'100%'
  ,content:chans.join('\n')
});

window.CHANLINE=blessed.line({
  parent:screen
  ,left: c_width
  ,top: 0
  ,height: '100%'
  ,fg: 0
});

window.TOPIC=blessed.form({
  parent:screen
  ,keys:true
  ,left:c_width+1
  ,top:0
  ,width:window.dim.w-(c_width+u_width)
  ,height:1
  ,bg:0
  ,content:'utter is an awesome irc client written in nodejs'
});

window.INPUT=blessed.input({
  parent:screen
  ,keys:true
  ,left:c_width+1
  ,top:window.dim.h-1
  ,width:window.dim.w-(c_width+u_width)
  ,height:1
  ,content:'type and see the input work!'
});

window.CHANINFO=blessed.box({
  parent:screen
  ,keys:true
  ,left:c_width+1
  ,top:window.dim.h-2
  ,width:window.dim.w-(c_width+u_width)-1
  ,height:1
  ,content:'channel info'
  ,bg: 0
});

window.USERLIST=blessed.form({
  parent:screen
  ,keys:true
  ,right:0
  ,top:0
  ,width:'shrink'
  ,height:window.dim.h-2
  ,content:window.users.join('\n')
});

window.USERSLINE=blessed.line({
  parent:screen
  ,right: u_width
  ,top: 0
  ,height: '100%'
  ,fg: 0
});

window.BODY=blessed.form({
  parent:screen
  ,keys:true
  ,left:c_width+1
  ,top:1
  ,width:window.dim.w-(c_width+u_width)-2
  ,height:window.dim.h-3
  ,content:'[00:00:00] <@lukevers> kittens!'
});

window.onEscape=function(){
  process.exit(0);
};
  
screen.key('escape',window.onEscape);

window.onKeypress=function(ch, key) {
  switch(key.name) {
    case 'backspace':
      window.INPUT.content = window.INPUT.content.substring(0, window.INPUT.content.length-1);
      break;
    case 'enter':
      // parse window.INPUT.content
      break;
    default:
      window.INPUT.content += (typeof ch === 'undefined') ? '' : ch;
      break;
  }
  // Render
  screen.render();
};

screen.on('keypress',window.onKeypress);

window.debug=function(){
  stats={
    windowHeight:window.dim.h
    ,windowWidth:window.dim.w

    ,inputTop:window.INPUT.top
    ,inputWidth:window.INPUT.width
    ,bodyHeight:window.BODY.height
    ,bodyWidth:window.BODY.width

    ,usersHeight:window.USERLIST.height
    ,usersWidth:window.USERLIST.width
    ,chansHeight:window.CHANLIST.height
    ,chansWidth:window.CHANLIST.width
  };
  window.BODY.content=Object.keys(stats).map(function(k){
    return k+" "+stats[k];
  }).join("\n");
};

window.onResize=function() {
  // get updated size
  window.dim.w = screen.width;
  window.dim.h = screen.height;

  window.INPUT.top = window.dim.h-1;
  window.CHANINFO.top = window.dim.h-2;
  window.TOPIC.width = window.dim.w-(c_width+u_width)-1;
  window.INPUT.width = window.dim.w-(c_width+u_width)-1;
  window.CHANINFO.width = window.dim.w-(c_width+u_width)-1;
  
  window.BODY.height = window.dim.h-3;
  window.BODY.width = window.dim.w-(c_width+u_width)-2;
  if(window.options.debug){
    window.debug();
  }
  screen.render();
}

screen.on('resize', window.onResize);

module.exports=window; 
