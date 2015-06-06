var RepoSearchForm = React.createClass({

    onSubmit: function(e) {
        e.preventDefault();
        this.props.onSearch(this);
    },

    onChangeQuery: function(e) {
        console.log(e.target.value);
        this.props.onChangeQuery(e.target.value);
    },

    render: function() {
        return (
            <form onSubmit={this.onSubmit}>
                <input placeholder='Search github repos' onChange={this.onChangeQuery} value={this.props.query} />
                <button type="submit">Search</button>
            </form>
        );
    }
});
