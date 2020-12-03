import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items:[], isLoading: true};
  }

  fetchDetailsFromId = async (articleId)=> {
    const result = await fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json`)
    const json = await result.json()
    const { id, title, url } = json;
    await this.setState({items: this.state.items.concat({id, title, text: url})});
    if (this.state.items.length >= 5) {
    this.setState({isLoading: false})
    }
  };

  componentDidMount() {
    console.log("querying...")
    fetch('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty')
      .then((response)=>response.json())
      .then((listOfIds)=>{
        const portion = listOfIds.slice(0,30);
        const uniques = [...new Set(portion)]
        return portion.forEach(async(id)=>await this.fetchDetailsFromId(id))      })
  }

  render() {
    return (
      <Router>
      <TransitionGroup>
      <Loader isLoading={this.state.isLoading}/>
      </TransitionGroup>
      <Header/>
      <div className="content" style={ {
      alignItems : 'flex-start',
      alignContent: 'flex-start',
        backgroundColor: "#4E5E83",
          display: 'flex'} }>
        <SideBar items={ this.state.items }/><Main items={this.state.items}/>
      </div>
      </Router>
    );
  }
}

export default App;

const Header = (props)=> 
  (
    <div style={{
        color: 'white',
        borderRadius: '0.5em',
        marginBottom: '0em',
        padding: '0rem 0rem 0.5rem 0rem',
        width: '91vw',
    }} {...props.children}><h1>Y Combinator HackerNews</h1></div>
  )

const Main = ({items}) => {
  return (
    <div style={{
        left: "calc(30vw + 1.5rem)",
       position: 'fixed'  , backgroundColor: "#E8EBEF",
        borderRadius: '0.5em',
        marginLeft: '1rem',
        marginRight: '-1rem',
        padding: '1rem',
        width: '64vw',
        verticalAlign: 'top',
        overflow: 'hidden',
        whiteSpace: 'pre-wrap',
        height: 'auto'
        
    }}>
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

const Loader = ({isLoading})=> (
  <div>
    <div className="box_wrapper">
        <div className={cx({box: isLoading, box_hidden: !isLoading})}>&nbsp;</div>
    </div>
  </div>
)

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={ { maxWidth: '30vw',overflow:'hidden', backgroundColor: '#EEF1F4', padding: '1rem', borderRadius: '0.5rem', color: 'white', width: '30vw' } }>
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
        <div style={{textTransform:"uppercase"}}>Article Link</div>
        <div><h2>{item.title}</h2></div>
        <div><a href={item.text} target="_blank">{item.text}</a></div>
      </div>
    )
  }
  return null;
}
