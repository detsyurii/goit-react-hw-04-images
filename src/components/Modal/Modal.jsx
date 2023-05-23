import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ url, onClose }) => {
  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // });

  // const handleKeyDown = evt => {
  //   console.log(evt.code);
  //   if (evt.code === 'Escape') {
  //     onClose();
  //   }
  // };

  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleBackdrop}>
      <div className="Modal">
        <img src={url} alt={url} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = evt => {
//     if (evt.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdrop = evt => {
//     if (evt.currentTarget === evt.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { url } = this.props;
//     //console.log(url);
//     return (
//       <div className="Overlay" onClick={this.handleBackdrop}>
//         <div className="Modal">
//           <img src={url} alt={url} />
//         </div>
//       </div>
//     );
//   }
// }
