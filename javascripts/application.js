var DataBox=React.createClass({displayName:"DataBox",createIndex:function(e){for(var a=lunr(function(){this.field("name",{boost:10}),this.field("description"),this.ref("id")}),t=0;t<e.length;t++){var r=e[t];a.add({id:t,name:r.name,description:r.description})}return a},getInitialState:function(){var e=this.props.dataSource;return{data:e,dataSource:e,index:this.createIndex(e)}},render:function(){return React.createElement("div",{className:"dataBox"},React.createElement(SearchForm,{onSearch:this.handleSearch}),React.createElement(DataList,{data:this.state.data}))},handleSearch:function(e){if(""===e)this.setState({data:this.state.dataSource});else{var a=this.state.index.search(e),t=this.state.dataSource,r=a.map(function(e){return t[e.ref]});this.setState({data:r})}}}),SearchForm=React.createClass({displayName:"SearchForm",render:function(){return React.createElement("form",{className:"searchForm"},React.createElement("input",{type:"text",placeholder:"Search*",ref:"queryInput",onChange:this.onChange}))},componentDidMount:function(){React.findDOMNode(this.refs.queryInput).focus()},onChange:function(e){this.props.onSearch(e.target.value)}}),DataList=React.createClass({displayName:"DataList",render:function(){var e=this.props.data.map(function(e,a){return React.createElement("section",{className:"dataNode"},React.createElement("header",null,React.createElement("a",{href:e.url},e.name),React.createElement("span",{className:"index"},"#",a+1)),React.createElement("div",null,React.createElement("a",{className:"url",href:e.url},e.url)),React.createElement("div",{className:"dataDescription"},e.description))});return React.createElement("div",{className:"dataList"},e)}});$.ajax({url:"api/databases.json",dataType:"json",success:function(e){ReactDOM.render(React.createElement(DataBox,{dataSource:e}),document.getElementById("dataBox"))}});