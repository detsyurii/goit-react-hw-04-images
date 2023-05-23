import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmitSearch }) => {
  const [submittedSearch, setSubmittedSearch] = useState('');

  const handleChangeSearch = evt => {
    const { value } = evt.target;
    setSubmittedSearch(value);
  };

  const handleSubmitForm = evt => {
    evt.preventDefault();
    if (submittedSearch.trim() !== '') {
      onSubmitSearch(submittedSearch);
      setSubmittedSearch('');
    } else {
      toast('Введіть ваш запит!');
    }
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmitForm}>
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
          onChange={handleChangeSearch}
          value={submittedSearch}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmitSearch: PropTypes.func.isRequired,
};

// export class Searchbar extends Component {
//   state = {
//     query: '',
//   };

//   handleChangeSearch = evt => {
//     const { value } = evt.target;
//     this.setState({ query: value });
//   };

//   handleSubmitForm = evt => {
//     evt.preventDefault();
//     const { query } = this.state;
//     if (query.trim() !== '') {
//       this.props.onSubmitSearch(query);
//       this.setState({ query: '' });
//     } else {
//       toast('Введіть ваш запит!');
//     }
//   };

//   render() {
//     const { query } = this.state;
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={this.handleSubmitForm}>
//           <button type="submit" className="SearchForm-button">
//             <AiOutlineSearch size={25} />
//           </button>
//           <ToastContainer
//             position="top-right"
//             autoClose={3000}
//             hideProgressBar
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="light"
//           />

//           <input
//             onChange={this.handleChangeSearch}
//             value={query}
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }
