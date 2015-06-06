var App = React.createClass({

    getInitialState : function() {
        return {
            repos: [],
            repo: null,
            query: '',
            loading: false,
            error: ''
        };
    },

    cache: {},

    onSearch: function () {

        if (this.cache.hasOwnProperty(this.state.query)) {
            this.handleResults(this.cache[this.state.query]);
            return;
        }

        this.startLoading();
        var urlQuery = 'https://api.github.com/legacy/repos/search/' + this.state.query;
        // Make an ajax call to the github api
        $.getJSON(urlQuery, {
                format: "json",
            })
            .done(_.bind(this.handleResults, this))
            .fail(_.bind(this.handleError, this));
    },

    handleResults: function(results) {
        if (results.hasOwnProperty('repositories')) {
            this.cache[this.state.query] = results.repositories;
            results = results.repositories;
        }
        this.setState({repos: results});
        this.stopLoading();
    },

    handleError: function(results) {
        this.displayError(results.statusText);
        this.stopLoading();
    },

    onChangeQuery: function(query) {
        //Clear the repos if no string in input
        if (query == '') this.setState({repos: []});
        this.setState({
            query: query
        });
    },

    startLoading: function() {
        this.clearError();
        this.setState({
            loading: true
        });
    },

    stopLoading: function() {
        this.setState({
            loading: false
        });
    },

    displayError: function(msg) {
        this.setState({
            error: true,
            errorMsg: msg
        });
    },

    clearError: function() {
        this.setState({
            error: false,
            errorMsg: ''
        });
    },

    onClose: function() {
        this.setState({
            repo: null
        });
    },

    openRepo: function(repo) {
        this.setState({
            repo: repo
        });
    },

    render: function() {
        var selectedRepo = '';
        var classes = 'app ';

        if (this.state.error) {
            var error = (<div className="error">{this.state.errorMsg}</div>);
        }
        if (this.state.loading) {
            var loading = (<div className="loading">Loading</div>);
        }
        (this.state.loading) ? classes += 'is-loading ' : '';
        (this.state.error) ? classes += 'is-error ' : '';
        (_.isObject(this.state.repo)) ? classes += 'is-showing-repo ' : '';

        if (_.isObject(this.state.repo)) {
            selectedRepo = (
                <div>
                    <h2>{this.state.repo.name}</h2>
                    <p>{this.state.repo.description}</p>
                    <a href={this.state.repo.url} className='visit-repo-btn'>View Repo</a>
                </div>
            );
        }

        return (
            <div className={classes}>
                <RepoSearchForm query={this.state.query} onSearch={this.onSearch} onChangeQuery={this.onChangeQuery}></RepoSearchForm>
                {loading}
                {error}
                <RepoList openRepo={this.openRepo} repos={this.state.repos}></RepoList>
                <div className="repo-details">
                <button onClick={this.onClose} className="close-btn"><i></i><i></i></button>
                    {selectedRepo}
                </div>
            </div>
        );

    }
});

React.render(<App />, document.getElementById('app'));
