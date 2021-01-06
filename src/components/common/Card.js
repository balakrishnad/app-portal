import React from 'react';
import { ShowIcon, DeleteIcon, EditIcon, ExternalLinkIcon } from './SVG';
import './card.scss';

export default ({
  data,
  onDetailsClick,
  onPopoutClicked,
  showPopout = true,
  onDeleteClick,
  showDeleteForm = false,
  onEditClick,
  showEditForm = false,
  onShowSubClick,
  showSubmission = true,
}) => {
  const { created, title, _id } = data;

  return (
    <div className='col-md-3 col-12 col-sm-6 mr-tb-1'>
      <div className='card bg-col mb-3 height100'>
        <div className='card-header'>
          <span
            className='tooltip'
            style={{ fontSize: '0.8rem', float: 'left', marginRight: '0.5rem' }}
          >
            Created on:{' '}
            {new Date(created).toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            })}
          </span>
          {showPopout && (
            <span onClick={() => onPopoutClicked(_id)}>
              <ExternalLinkIcon
                style={{
                  height: '1rem',
                  width: '1rem',
                  fill: '#fff',
                  cursor: 'pointer',
                  margin: '0 .5rem',
                  float: 'right',
                }}
              />
            </span>
          )}
        </div>
        <div className='card-body'>
          <div className='card-text'>
            <div
              style={{ fontSize: '1.25rem', paddingTop: '1rem' }}
              onClick={() => onDetailsClick(_id)}
            >
              {title}
            </div>
          </div>
        </div>
        <div className='card-footer bg-transparent'>
          {showSubmission && (
            <span onClick={() => onShowSubClick(_id)}>
              <ShowIcon
                style={{
                  height: '1.5rem',
                  width: '1.5rem',
                  fill: '#002855',
                  cursor: 'pointer',
                  margin: '0 .5rem',
                  float: 'left',
                }}
              />
            </span>
          )}
          {showDeleteForm && (
            <span onClick={() => onDeleteClick(_id)}>
              <DeleteIcon
                style={{
                  height: '1.3rem',
                  width: '1.3rem',
                  fill: '#002855',
                  cursor: 'pointer',
                  margin: '0 .5rem',
                }}
              />
            </span>
          )}
          {showEditForm && (
            <span onClick={() => onEditClick(_id)}>
              <EditIcon
                style={{
                  height: '1rem',
                  width: '1rem',
                  fill: '#002855',
                  cursor: 'pointer',
                  margin: '0 .5rem',
                }}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
