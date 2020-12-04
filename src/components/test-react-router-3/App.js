import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import img from '../../public/img/bowler.png';
import {timeConverter} from '../../logic/date-utils';
import './App.css'

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {items:[], isLoading: true, currentComments: []};
   }

   fetchDetailsFromId = async (articleId)=> {
      const result = await fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json`)
      const json = await result.json()
      const { id, title, url, kids, by, time } = json;
      const obj = {id, title, text: url, kids, time, article_author: by};
      const sorter = (a,b) => {
         return a.time < b.time ? 1: a== b? 0 : -1;
      }

      await this.setState({items: this.state.items.concat(obj).sort(sorter)});
      // if (this.state.items.length >= 10) {
      this.setState({isLoading: false})
      // }
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
   }

   render() {
      return (
         <Router>
         <Loader isLoading={this.state.isLoading}/>
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
      }} {...props.children}>

      <h1><img className="logo" src={img}/>HN Viewer</h1>
      </div>
   )

const Main = ({items}) => {
   return (
      <TransitionGroup component={null}>
      <CSSTransition classNames="dialog" timeout={300}>
      <div style={{
         left: "calc(var(--sidebar-size) + 2vw)",
            overflow: 'hidden',
            backgroundColor: "#E8EBEF",
            borderRadius: '0.5em',
            marginLeft: '1rem',
            marginRight: '-1rem',
            padding: '1.5rem',
            width: 'calc(94vw - var(--sidebar-size))',
            verticalAlign: 'top',
            whiteSpace: 'pre-wrap',
            height: 'auto'

      }}>
      <Route path="/article/:id" render={
         ({match}) => {
            const itemd = items.find(item=>item.id == match.params.id);
            return (
               <Article key={match.params.id} item={items && itemd }/>
            )}
      } />
      </div>
      </CSSTransition>
      </TransitionGroup>
   );
};

const Loader = ({isLoading})=> (
   <div>
   <TransitionGroup component={null}>
   {isLoading && <CSSTransition classNames="dialog" timeout={300}>
      <div className="box_wrapper">
      <div className="box">&nbsp;</div>
      </div>
      </CSSTransition>}
   </TransitionGroup>
   </div>
)

class SideBar extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (

         <div style={ { maxWidth: 'var(--sidebar-size)',overflow:'hidden', backgroundColor: '#EEF1F4', padding: '1.5rem 1rem 1rem 1.5rem', borderRadius: '0.5rem', color: 'white', width: 'var(--sidebar-size)' } }>

         <div style={{textTransform:"uppercase", fontSize: "0.8rem", color: 'black'}}>Best Stories</div>
         {this.props.items.map(item=>
            (
               <SidebarItem key={item.id}>
               <Link style={{textDecoration: "none", color: "black"}} to={`/article/${item.id}`}>
<p style={{display:'inline-block'}}>
               {item.time && <p style={{color: '#787', marginBottom:'0.2em',marginLeft: '-0.8em',display: 'block',fontSize: '0.7em'}}>{timeConverter(item.time)}</p>}
               {item.title}</p>
               </Link>
               </SidebarItem>)
         )
         }
         </div>
      ) ;
   }
}

const SidebarItem = (props) => {
   return (
      <div style={ {color: 'white', margin: '0.7rem 0.5rem 0.7rem 0.5rem'} } {...props}>
      </div>
   )
};

class Article extends React.Component{

   constructor(props) {
      super(props)
   }

   componentDidMount(){
   }

   render() {
      console.log(this.props.item ? this.props.item: "BAR")
      const {item} = this.props;
      if (item) {
         return (
            <div>
            <div style={{textTransform:"uppercase", fontSize: "0.8rem", margin: "0.2rem 0rem 0.5rem 0rem"}}>Posted by {item.article_author}</div>
            <div><h2 style={{fontSize:'2.2rem'}}>{item.title}</h2></div>
            <div><a href={item.text} target="_blank">{item.text}</a></div>
            <h3 style={{marginTop: '0.5em'}}>Comments</h3>
            <div style={{fontSize:'0.9rem'}}>{item.kids.map(item=>(<ul><Comment key={item} num={item}></Comment></ul>))}</div>
            </div>
         )
      }
      return null;
   }
}

const parser = new DOMParser;

class Comment extends React.Component{
   constructor(props){
      super(props)
      this.state = { num: this.props.num, comment_text: null, comment_author:null, isDeleted: false, comment_time: null }
   }

   fetchDetailsFromId = async (articleId)=> {
      const result = await fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json`)
      const json = await result.json()
      const { id, text, by, deleted, time } = json;

      await this.setState({comment_text: text, comment_author:by, isDeleted: deleted, comment_time: time });
   };

   componentDidMount() {
      (async()=>await this.fetchDetailsFromId(this.props.num))()
   }


   render() {

      const { comment_text, comment_author, isDeleted, comment_time } = this.state;
      const formatted = timeConverter(comment_time);

      if (isDeleted || (comment_text && comment_text.trim() == "")) {
         return null
      }

      if (comment_text) {
         let dom = parser.parseFromString(
            '<!doctype html><body>' + `${comment_text}`,
            'text/html');
         let decodedString = comment_author ? (<div style={{whiteSpace:"pre-line"}}><p style={{textDecoration: "underline"}}>{comment_author} {comment_time && `at ${formatted}`}</p><p>{dom.body.textContent}</p></div>) : (<p>{dom.body.textContent}</p>);
         return (<li style={{margin: '0.5rem 0.5rem 0.5rem 0.7rem'}}>{decodedString}</li>)
      } else {
         return <LoadingTextPlaceholder/>
      }
   }
}

const LoadingTextPlaceholder = () =>
   (<li style={{margin: '0.5rem 0.5rem 0.5rem 0.7rem'}}><span style={{display:"inline-block", width: "100%",height: "16px", margin: "0.1rem 0.1rem 0.1rem 0.1rem", borderRadius: "0.2rem", backgroundColor:"#DDD"}}>&nbsp;</span></li>)

