var RepoList = React.createClass({

    handleClick: function(i) {
        this.props.openRepo(this.props.repos[i]);
    },

    render: function() {
        var renderRepo = function(item, i) {
            return (<Repo key={i} handleClick={this.handleClick.bind(this, i)} {...item}></Repo>);
        }.bind(this);
        return (
            <ul className="repo-list">
                {this.props.repos.map(renderRepo)}
            </ul>
        );
    }
});
