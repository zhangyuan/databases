var DataBox = React.createClass({
  createIndex: function(data) {
    var index = lunr(function () {
      this.field('name', {boost: 10});
      this.field('description')
      this.ref('id')
    });

    for(var i = 0; i < data.length; i++) {
      var item = data[i];
      index.add({
        id: i,
        name: item.name,
        description: item.description
      })
    }
    return index;
  },
  getInitialState: function() {
    var dataSource = this.props.dataSource;
    return {data: dataSource, dataSource: dataSource, index: this.createIndex(dataSource)};
  },
  render: function() {
    return (
      <div className="dataBox">
        <SearchForm onSearch={this.handleSearch} />
        <DataList data={this.state.data}  />
      </div>
    );
  },
  handleSearch: function(query){
    if (query === '') {
      this.setState({data: this.state.dataSource});
    } else {
      var hits = this.state.index.search(query);
      var dataSource = this.state.dataSource;
      var result = hits.map(function(element){
        return dataSource[element.ref];
      });
      this.setState({data: result});  
    }
  }
});

var SearchForm = React.createClass({
  render: function() {
    return (
      <form className="searchForm">
        <input type="text" placeholder="Search*" ref="queryInput" onChange={this.onChange} />
      </form>
    );
  },
  componentDidMount: function(){
    React.findDOMNode(this.refs.queryInput).focus(); 
  },
  onChange: function(value){
    this.props.onSearch(value.target.value);
  }
});

var DataList = React.createClass({
  render: function() {
    var dataNodes = this.props.data.map(function(item, index){
      return (
        <section className="dataNode">
          <header>
            <a href={item.url}>{item.name}</a>
            <span className="index">#{index + 1}</span>
          </header>
          <div>
            <a className="url" href={item.url}>{item.url}</a>
          </div>
          <div className="dataDescription">{item.description}</div>
        </section>
      );
    });

    return (
      <div className="dataList">
        {dataNodes}
      </div>
    );
  }
});

$.ajax({
  url: 'api/databases.json',
  dataType: 'json',
  success: function(data) {
    ReactDOM.render(
      <DataBox dataSource={data}/>,
      document.getElementById('dataBox')
    );
  }
});
