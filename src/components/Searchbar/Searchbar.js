import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from 'components/Searchbar/Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    queryValue: '',
  };

  handleChangeInput = evt => {
    this.setState({ queryValue: evt.target.value.toLowerCase() });
  };

  handleSubmitForm = evt => {
    evt.preventDefault();
    const { queryValue } = this.state;

    if (queryValue.trim() === '') {
      toast.error('Please, repeat the search');
      return;
    }

    this.props.onSubmit(queryValue.trim());
    this.setState({ queryValue: '' });
  };

  render() {
    const { queryValue } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmitForm}>
          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={queryValue}
            onChange={this.handleChangeInput}
          />
          <button type="submit" className={css.searchFormButton}>
            Search
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
