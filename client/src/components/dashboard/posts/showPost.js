import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

class Show extends React.Component {
  componentDidMount() {
    $('.edit-icon').hover(function () {
      $(this).siblings('p:first-of-type').toggle();
    });
    $('.delete-icon').hover(function () {
      $(this).siblings('p:last-of-type').toggle();
    });
  }
  render() {
    return (
      <div className='dash-show'>
        <div className='post-block'>
          <div className='post-img-div'>
            {' '}
            <img src='https://townhub.kwst.net/images/all/1.jpg' />
          </div>
          <div className='post-descri-div'>
            <h4>New Version for huawai</h4>
            <p>40 Journal Square Plaza, NJ, USA</p>
          </div>
          <div className='post-edit-delete'>
            <FontAwesomeIcon icon={faEdit} className='edit-icon' />
            <p>Edit</p>
            <FontAwesomeIcon icon={faTrash} className='delete-icon' />
            <p>Delete</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
