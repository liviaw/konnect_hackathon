import React, { useState, useEffect } from 'react';
import logo from './Images/logo.png';
import wings from './Images/cancel_me_noew_wings.png';
import './App.css';
import './style.css';
import Card from "./Card";

import Button from '@material-ui/core/Button';
import SearchBar from "material-ui-search-bar";
import FacebookIcon from '@material-ui/icons/Facebook';
// import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import RedditIcon from '@material-ui/icons/Reddit';
import TwitterIcon from '@material-ui/icons/Twitter';
import CardList from './CardList';
import Rotation from 'react-rotation';
import CircularProgress from '@material-ui/core/CircularProgress';



// import FacebookLogin from 'react-facebook-login';
// import Facebook from './fb'

//import {get7DayTweets} from './TwitterManager';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    // background: '#13202C',
    color: '#13202C',
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginBottom: "20px"
  },
});

function App() {
  document.title = '#CancelMe!'
  const classes = useStyles();
  const [socialMediaOption, setSocialMediaOption] = React.useState(0);
  const [twitterCards, setTwitterCards] = useState({});
  const [cancelled, setCancelled] = useState(false);
  const [cancelRotate, setCancelRotate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState({ 1: { image: null, username: "kimkar", text: "abc", date: "2007-02-20T14:35:54.000Z" }, 2: { image: null, username: "kimkar", text: "efg", date: "2009-02-20T14:35:54.000Z" } });


  useEffect(() => {
    initCards();
  }, []);

  const initCards = () => {
    setLoading(true);
    console.log("loading" + loading);
    callAPI()
      .then(data => {
        const fetchedData = data["data"];
        const newCard = {};
        for (var tweet in fetchedData) {
          let card = fetchedData[tweet];
          console.log(card)
          const tmp = {};
          tmp["date"] = card["created_at"];
          tmp["text"] = card["text"];
          tmp["username"] = data["includes"]["users"][0]["username"];
          try {
            tmp["image"] = data["includes"]["users"][0]["profile_image_url"];
          } catch (e) {
            tmp["image"] = null;
          }
          newCard["id"] = tmp;

        }
        console.log("not loading" + loading);
        setLoading(false);
        twitterCards["id"] = newCard["data"];
      }
      )
    // newCard.map( card => {
    //   const tmp = {};
    //   tmp["id"] = card["id"];
    // })
  }
  
  const callAPI = async () => {
    const response = await fetch("http://localhost:9000/testAPI?keyword=pizza")
    return response.json();
    
  }
  

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setSocialMediaOption(newValue);
    
  };

  const RotateButton = () => {
    // if (cancelRotate === true) {
    return (
      <Button className="wingButton rotate"
        onClick={() => { alert('clicked') }}
      >
        <img src={wings} className="wingButtonLogo" alt="logo" />
        <span class="tooltiptext">Click me to delete selected feeds</span>

      </Button>
    )
    // } else {
    //   return(
    //   <Button className="wingButton"
    //     onClick={() => {
    //       alert('clicked')
    //       setCancelRotate(true);
    //     }}
    //     >
    //     <img src={wings} className="wingButtonLogo" alt="logo" /> 
    //     <span className="tooltiptext">Click me to delete selected feeds</span>

    //   </Button>
    //   )
    // }
  }

  const RenderCards = () => {
    if (socialMediaOption === 0) {
      return (<div></div>);

    } else if (socialMediaOption === 1) {
      return (
        <div>
          <RotateButton />
          {Object.keys(cards).map(c => {
            console.log("hi");
            console.log(cards[c]);
            return (<Card
              inline
              key={c}
              card={cards[c]}
            />)
          }
          )}

          { loading ? <CircularProgress /> : Object.keys(twitterCards).map(c => <Card 
            inline
            key={c}
            card={twitterCards[c]}
            props={twitterCards}
            removeFromCardList = {()=>{
              //hi
            }}
          />) }


        </div>
      );
    }
    return (
      <div></div>
    );
  }
  console.log("loading..? " + loading);
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      <div className="sub middle">Cancelling the Cancel Culture</div>

      <div className="picksosmed">
        Pick your social media:
      </div>
      <div className="middle">

        {/* <Paper className={classes.root}> */}
        <Tabs
          value={socialMediaOption}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon label tabs example"
          className={classes.root}
        >

          <Tab icon={<FacebookIcon style={{ fontSize: 50 }} />} label="Facebook" />
          <Tab icon={<TwitterIcon style={{ fontSize: 50 }} />} label="Twitter" />
        </Tabs>
        {/* </Paper> */}

      </div>


      <div className="middle">
        <SearchBar
          style={{
            height: "7vh",
            width: "40%",
            marginBottom: "3%",
            justifyContent: "spaceBetween",
          }}
          placeholder="Type your posts here to start cancelling..."

        // value={this.state.value}
        // onChange={(newValue) => this.setState({ value: newValue })}
        // onRequestSearch={() => doSomethingWith(this.state.value)}
        ></SearchBar>
        <br />
      </div>
      <div className="middle">
        <RenderCards />
      </div>
      {/* <Facebook /> */}






    </div>
  );
}

export default App;
