import React from 'react';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery, Searchbar, Loader, Button } from 'components';
import { fetchImages } from 'services/api';
import 'react-toastify/dist/ReactToastify.css';
import css from 'components/App/App.module.css';

export class App extends Component {
  state = {
    queryValue: '',
    images: [],
    page: 1,
    isLoading: false,
    loadMore: false,
    total: null,
  };

  async componentDidUpdate(_, prevState) {
    const { queryValue, page } = this.state;
    if (prevState.queryValue !== queryValue || prevState.page !== page) {
      this.setState({ isLoading: true, loadMore: false });

      try {
        const response = await fetchImages(queryValue, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          total: response.totalHits,
        }));
        this.setState({ loadMore: true });

        console.log(response.hits);

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

  handleSubmit = queryValue => {
    if (queryValue !== this.state.queryValue) {
      this.setState({ queryValue, images: [], page: 1, total: null });
    } else toast.success('Your query has been completed.');
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { images, total, loadMore, isLoading } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {images.length < total && loadMore && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isLoading && <Loader />}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
