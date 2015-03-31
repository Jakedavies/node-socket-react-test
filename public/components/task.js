/** @jsx React.DOM */

var Task = React.createClass({
  render: function(){
    return (
      <table class="daily-tasks">
        <h1>Count: {this.state.count}</h1>
        <button type="button">Increment</button>
      </table>
    );
  }
});
