import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items:[]};
  }

  fetchDetailsFromId = async (articleId)=> {
    const result = await fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json`)
    const json = await result.json()
    const { id, title, url } = json;
    this.setState({items: this.state.items.concat({id, title, text: url})});
  };

  componentDidMount() {
    console.log("querying...")
    fetch('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty')
      .then((response)=>response.json())
      .then((listOfIds)=>{
        const portion = listOfIds.slice(0,30);
        const uniques = [...new Set(portion)]
        return portion.forEach(async(id)=>await this.fetchDetailsFromId(id))
      })
    // .then((listOfIds)=>listOfIds.map(fetchDetailsFromId))
  }

  render() {
    return (
      <Router>
      <div style={ {backgroundColor: "#4E5E83",
          whiteSpace: 'nowrap', wordSpacing: -1} }>
        <SideBar items={ this.state.items }/><Main items={this.state.items}/>
      </div>
      </Router>
    );
  }
}

export default App;

const Main = ({items}) => {
  return (
    <div style={{
        backgroundColor: "white",
        borderRadius: '0.5em',
        display: "inline-block",
        marginLeft: '1rem',
        marginRight: '-1rem',
        padding: '1rem',
        width: '70vw',
        verticalAlign: 'top',
        overflow: 'hidden',
        whiteSpace: 'pre-wrap'
    }}>
    <div style={{textTransform:"uppercase"}}>HACKERNEWS</div>
    <Route path="/article/:id" render={
      ({match}) => {
        console.log("MATCH", match)
        console.log("ITEMS", items)
        const itemd = items.find(item=>item.id == match.params.id);
        console.log(itemd)
        return (
          <Article item={items && itemd }/>
        )}
    } />
    </div>
  );
};


class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={ { maxWidth: '30vw',overflow:'hidden', whiteSpace: 'pre-wrap', backgroundColor: '#EEF1F4', padding: '1rem', borderRadius: '0.5rem', color: 'white', display:'inline-block', width: '30vw' } }>
      {this.props.items.map(item=>
        (
          <SidebarItem key={item.id}>
          <Link style={{textDecoration: "none", color: "black" }} to={`/article/${item.id}`}>{ item.title }</Link>
          </SidebarItem>)
      )
      }
      </div>
    ) ;
  }
}

const SidebarItem = (props) => {
  return (
    <div style={ {color: 'white', fontFamily: 'Arial', margin: '0.5rem'} } {...props}>
    </div>
  )
};

const Article = ({item})=> {
  if (item) {
    return (
      <div>
      <div><h2>{item.title}</h2></div>
      <div><a href={item.text} target="_blank">{item.text}</a></div>
      </div>
    )
  }
  return <div></div>
}
