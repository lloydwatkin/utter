var channel = function(c) {
  // Check if "c" is undefined or not. If it is then we
  // set it to an empty object so it doesn't cause any
  // problems.
  c = c || {};

  // "input" is a string containing the text buffer that
  // the user is writing in. Each channel object has its
  // own so when you switch channels you do not lose the
  // text you were writing.
  this.input = c.input || '';

  // "topic" is the topic for the the channel.
  this.topic = c.topic || '';

  // "userlist" is an array that contains a list of the
  // users that are in the channel.
  this.userlist = c.userlist || [];

  // "server" is an object reference to the parent that
  // contains this child. Used for faster access to the
  // server object.
  this.server = c.server || {};

  // "modes" is an object TBD
  this.modes = c.modes || {};

  // "info" is an object TBD
  this.info = c.info || {};

  // "width" is an integer that contains the width of the
  // longest channel (in characters) so we don't have to
  // call the width() function every time we re-render.
  this.width = c.width || this._width();
}

// -----
// _width()
//
// The function "_width()" figures out the width of the length 
// of the longest username in the users list. This is needed 
// when rendering our screen to make sure the width of the 
// users list is correct. In our channel object we have a
// variable called "width" which is preferred to be used 
// instead of this function when we re-render the screen 
// so we don't have to reduce the userlist each time. 
// This function should only be called when a new
// user is added to the channel. It both returns 
// the number and updates the variable. It will
// return a 0 if the userlist is empty.
//
// -----

channel.prototype._width = function() {
  return this.width = (this.userlist.length > 0 ? this.userlist.reduce(function(a, b) {
    return a.length > b.length ? a : b;
  }).length : 0);
}

module.exports=channel;
