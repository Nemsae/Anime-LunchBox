import React, { Component } from 'react';
import AnimeStore from '../stores/AnimeStore';
import AnimeModal from './AnimeModal';


export default class AnimeList extends Component {
  constructor () {
    super();

    this.state = {
      background: AnimeStore.getBackground(),
      currAnime: [],
    };

    this._onChange = this._onChange.bind(this);
    this.setCurrAnime = this.setCurrAnime.bind(this);
  }

  componentWillMount () {
    AnimeStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    AnimeStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      background: AnimeStore.getBackground()
    });
  }

  setCurrAnime (anime) {
    this.setState({
      currAnime: anime
    });
  }


render () {
  let { currAnime, background } = this.state;
  let animeList = this.props.animeList || [];
  let currPage = this.props.currPage;
  return (
    <div className="compContainer">
      <AnimeModal anime={currAnime} background={background} currPage={currPage} />
      {animeList.map(anime => {
        return (
          <div key={anime.id} className='encloser' onClick={() => this.setCurrAnime(anime)} data-toggle='modal' data-target={`.bs-example-modal-md`}>
            <div className='animeSquare'>
              <div className='picContainer'>
                <img src={anime.attributes.posterImage.original || ''} className='pic' />
              </div>
              <h4>{anime.attributes.titles.en ? anime.attributes.titles.en : anime.attributes.titles.en_jp}</h4>
            </div>
          </div>
        )
      })}
    </div>
  )
  }
}

 // render () {
 //    let animeList = this.props.animeList;
 //    let AnimeList = [];
 //    if (typeof animeList === 'object') {
 //      let keys = Object.keys(animeList) || [];
 //      AnimeList = keys.map(anime => {
 //        console.log('animeList:', animeList);
 //        return (
 //          <div key={animeList[anime].id} className='encloser' onClick={() => this.setCurrAnime(animeList[anime])} data-toggle='modal' data-target={`.bs-example-modal-md`}>
 //            <div className='animeSquare'>
 //              <div className='picContainer'>
 //                <img src={animeList.attributes.posterImage ? animeList.attributes.posterImage.original : ''} className='pic' />
 //              </div>
 //              <h4>{animeList[anime].title}</h4>
 //            </div>
 //          </div>
 //        );
 //      });
 //    }
 //    let { currAnime, background } = this.state;
 //    let currPage = this.props.currPage;

//     return (
//       <div className='compContainer'>
//         <AnimeModal anime={currAnime} background={background} currPage={currPage} />
//         {/* {
//           AnimeList
//         } */}
//       </div>
//     );
//   }
// }
