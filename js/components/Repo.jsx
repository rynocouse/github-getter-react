var Repo = React.createClass({
    render: function() {
        return (
            <li onClick={this.props.handleClick} >{this.props.name + '/' + this.props.name}</li>
        );
    }
});
