import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChangeSearch = evt => {
    const { value } = evt.target;
    this.setState({ search: value });
  };

  handleSubmitForm = evt => {
    evt.preventDefault();
    const { search } = this.state;
    if (search.trim() !== '') {
      this.props.onSubmitSearch(search);
      this.setState({ search: '' });
    } else {
      toast('Введіть ваш запит!');
    }
  };

  render() {
    const { search } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmitForm}>
          <button type="submit" className="SearchForm-button">
            <AiOutlineSearch size={25} />
          </button>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <input
            onChange={this.handleChangeSearch}
            value={search}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmitSearch: PropTypes.func.isRequired,
};
