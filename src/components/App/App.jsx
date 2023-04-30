import React from 'react';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery, Searchbar, Loader, Button } from 'components';
import { fetchImages } from 'services/api';
import { PER_PAGE } from 'constants';
import 'react-toastify/dist/ReactToastify.css';
import css from 'components/App/App.module.css';

export class App extends Component {
  state = {
    queryValue: '',
    images: [],
    page: 1,
    isLoading: false,
    loadMore: false,
  };

  async componentDidUpdate(_, prevState) {
    const { queryValue, page } = this.state;
    if (prevState.queryValue !== queryValue || prevState.page !== page) {
      try {
        this.setState({ isLoading: true, loadMore: false });
        const response = await fetchImages(queryValue, page);
        const totalPage = Math.ceil(response.totalHits / PER_PAGE);
        this.setState(prevState => ({
          images: [
            ...prevState.images,
            ...this.normalaziedImages(response.hits),
          ],
          loadMore: this.state.page < totalPage,
        }));
        
        if (response.totalHits === 0) {
          toast.error(
            `Sorry, there are no images matching your search query. Please try again.`
          );
        }
      } catch (error) {
        toast.error(`${error.message}`);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  normalaziedImages(images) {
    return images.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }

  handleSubmit = queryValue => {
    if (queryValue !== this.state.queryValue) {
      this.setState({ queryValue, images: [], page: 1 });
    } else toast.success('Your query has been completed.');
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { images, loadMore, isLoading } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {loadMore && <Button onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
