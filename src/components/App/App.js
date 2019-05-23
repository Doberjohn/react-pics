import './App.css';

import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageList from '../ImageList/ImageList';
import unsplash from '../../api/unsplash';

class App extends React.Component {

   state = {term: '', images: [], page: 1};

   onSearchSubmit = async (term) => {
      const response = await unsplash.get('/search/photos', {
         params: {
            query: term,
            page: this.state.page
         }
      });

      this.setState({
         term: term,
         images: response.data.results
      });
   };

   updateList = async () => {
      const response = await unsplash.get('/search/photos', {
         params: {
            query: this.state.term,
            page: this.state.page
         }
      });

      const newImages = this.state.images;
      response.data.results.forEach(function(image) {
         newImages.push(image);
      });
      this.setState({images: newImages});
   };

   handleScroll = async () => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
         this.setState({page: this.state.page + 1});
         await this.updateList();
      }
   };

   componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
   }

   componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
   }

   render() {
      return (
         <div className="ui container">
            <SearchBar onSubmit={this.onSearchSubmit}/>
            <ImageList images={this.state.images}/>
         </div>
      )
   }
}

export default App;