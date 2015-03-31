/** @jsx React.DOM */

var TaskList = React.createClass({
  tasks: function(event){
    var updatedList = this.state.initialTasks;
    this.setState({tasks: updatedList});
  },
  getInitialState: function(){
     return {
       initialTasks: [
         {id: 1, name:"Create account on proxy a"},
         {id: 4, name:"Day 0 on account a"},
         {id: 10, name:"Day 1 on account b"},
         {id: 30, name:"day 10 on account y"},
         {id: 13, name:"Day 2 on account d"},
         {id: 19, name:"Day 4 on account t"},
         {id: 43, name:"Day 5 on account j"},
         {id: 22, name:"day 3 on account j"}
       ],
       tasks: [],
       socket: null
     }
  },
  componentWillMount: function(){
    var socket = io.connect();
    this.setState({socket: socket});
    this.setState({tasks: this.state.initialTasks})
  },
  render: function(){
    self = this
    return (
      <table className="table">
        <tr>
          <th>Task Description</th>
          <th>Current Status</th>
          <th>Actions</th>
          <th>Completed?</th>
        </tr>
        {
          this.state.tasks.map(function(task) {
              return <Task key={task.id} socket={self.state.socket} task={task}/>
        })}
    </table>
  )}
});
var Task = React.createClass({
  updateTask: function(id, complete){
    console.log('attempting to do something useful');
    if(id == this.state.task.id)
    {
      console.log('Updating task '+this.state.task.id)
      this.setState({complete: complete});
    }
  },
  componentDidMount: function(){
    var self = this;
    this.props.socket.on('taskUpdated', function (data) {
      self.updateTask(data.taskId, data.complete);
    });
  },
  getInitialState: function(){
     return {
       complete: false,
       socket: this.props.socket,
       task: this.props.task
     }
  },
  toggleTask: function(){
    this.props.socket.emit('taskUpdated',{taskId: this.state.task.id, complete: !this.state.complete});
    this.setState({complete: !this.state.complete})
  },
  render: function(){
    var classes = classNames({
      'glyphicon': true,
      'glyphicon-remove': this.state.complete === false,
      'glyphicon-ok': this.state.complete === true
    })
    return (
        <tr>
          <td>{this.state.task.name}</td>
          <td>Day 1</td>
          <td><button onClick={this.toggleTask} className="btn btn-primary">{this.state.complete ? 'Mark as uncomplete':'Complete Task'}</button></td>
          <td><span className={classes}></span></td>
        </tr>
    )
  }
});

React.renderComponent(<TaskList/>, document.getElementById('mount-point'));
