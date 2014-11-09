var blessed=require('blessed')
    ,screen=blessed.screen();

var chat={
  w:screen.width
  ,h:screen.height
};

var chanlist=blessed.form({
  parent:screen
  ,keys:true
  ,left:0
  ,top:0
  ,width:19
  ,height:1000
  ,bg:'green'
  ,content:'#blurt\n#nodejs\n#lukevers\n#webdev'
});

var topic=blessed.form({
  parent:screen
  ,keys:true
  ,left:20
  ,top:0
  ,width:510 // maximum irc topic length (actually 512, but 2 are line feed)
  ,height:1
  ,bg:'red'
  ,content:'blurt is an awesome irc client written in nodejs'
});

var input=blessed.form({
  parent:screen
  ,keys:true
  ,left:20
  ,top:chat.h-1
  ,width:510
  ,height:1
  ,bg:'red'
  ,content:'this is where you would type'
}); 

screen.key('q',function(){
  process.exit(0);
});

screen.on('resize', function() {
  chat.w = screen.width;
  chat.h = screen.height;
  input.top=chat.h-1;
  screen.render();
});

screen.render();