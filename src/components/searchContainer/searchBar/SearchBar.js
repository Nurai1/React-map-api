
import React from 'react';
import styled from 'styled-components';
import Downshift from 'downshift';

import getStreetList from './request';

const SearchInputLabel = styled.label`
  display: none;
  font-size: 13px;
  line-height: 14px;
  color: ${(props) => props.theme.nonActiveColor};
  position: relative;
  top: 31px;
`;

const SearchInputWrapper = styled.input.attrs(() => ({
  placeholder: 'Куда доставить?',
}))`
  width: 100%;
  font-size: 17px;
  line-height: 18px;
  color: ${(props) => props.theme.primaryColor};
  margin: 19px 0 35px;
  padding: 4px 0;
  border: 0;
  border-bottom: 1px solid #eee;
  outline: 0;

  &::placeholder{
    color: ${(props) => props.theme.nonActiveColor};
  }
  &:focus{
    border-bottom-color: #EFB8AF;
  }
`;

const StreetList = styled.ul`
  max-height: 215px;
  height: auto;
  overflow: hidden;
  font-size: 17px;
  line-height: 19px;
  color: ${(props) => props.theme.primaryColor};
  padding: 0;

  & > li{
    height: 71px;
    box-sizing: border-box;
    border-bottom: 1px solid #EEE;
    list-style-type: none;
    padding: 15px 0;
  }

  & span.street{
    display: inline-block;
  }

  & span.region{
    font-size: 13px;
    line-height: 13px;
    color: ${(props) => props.theme.nonActiveColor};
  }
`;


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
    this.searchLabelRef = React.createRef();
    this.state = {
      streetsList: [],
    };
    this.isDownshiftFocus = this.isDownshiftFocus.bind(this);
    this.onStreetChosen = this.onStreetChosen.bind(this);
    this.changeQueryList = this.changeQueryList.bind(this);
  }

  onStreetChosen() {
    const searchBtn = document.querySelector('.search__button');
    const searchMPntArr = document.querySelector('.search__lctnIcn_arrow');
    const searchMPntMarker = document.querySelector('.search__lctnIcn_marker');

    searchBtn.style.backgroundColor = '#121212';
    searchBtn.style.color = '#fff';
    searchMPntArr.style.display = 'none';
    searchMPntMarker.style.display = 'none';

    const { streetsList } = this.state;
    const chosenStreet = streetsList[0];

    const chosenStreetAddress = `${chosenStreet.data.street_type_full} ${chosenStreet.data.street
    }${chosenStreet.data.house && chosenStreet.data.street_type_full !== 'метро'
      ? (`, ${chosenStreet.data.house
      }${chosenStreet.data.block ? (chosenStreet.data.block_type + chosenStreet.data.block) : ''}`) : ''}`;

    const { setCoords } = this.props;

    setCoords({
      address_value: chosenStreetAddress,
      lng: chosenStreet.data.geo_lon,
      lat: chosenStreet.data.geo_lat,
    });
  }

  isDownshiftFocus() {
    const searchBtn = document.querySelector('.search__button');
    const searchMPnt = document.querySelector('.search__mapPointer');
    const searchMPntArr = document.querySelector('.search__lctnIcn_arrow');
    const searchMPntMarker = document.querySelector('.search__lctnIcn_marker');

    const tempStyle = getComputedStyle(this.searchLabelRef.current).display === 'none' ? 'block'
      : 'none';

    this.searchLabelRef.current.style.display = tempStyle;

    if (tempStyle === 'block') {
      this.searchInputRef.current.placeholder = '';
      searchBtn.style.display = 'none';
      searchMPnt.style.display = 'inline-block';
      searchMPntArr.style.display = 'none';
      searchMPntMarker.style.display = 'inline-block';
    } else {
      this.searchInputRef.current.placeholder = 'Куда доставить?';
      searchBtn.style.display = 'block';
      searchMPnt.style.display = 'block';
      searchMPntArr.style.display = 'inline-block';
      searchMPntMarker.style.display = 'none';
    }
  }

  changeQueryList(count, value) {
    if (count === 1) {
      getStreetList(
        (streets) => {
          this.setState({
            streetsList: streets,
          });
          this.onStreetChosen();
        },
        value, count,
      );
    }
    getStreetList(
      (streets) => {
        this.setState({
          streetsList: streets,
        });
      },
      this.searchInputRef.current.value,
    );
  }

  render() {
    const { streetsList } = this.state;
    return (
      <Downshift
        itemToString={
          (item) => (item ? `${item.data.street_type_full} ${item.data.street
          }${item.data.house && item.data.street_type_full !== 'метро'
            ? (`, ${item.data.house
            }${item.data.block ? (item.data.block_type + item.data.block) : ''}`) : ''}` : '')
        }
        onChange={(selectedItem) => { this.changeQueryList(1, selectedItem.unrestricted_value); }}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          highlightedIndex,
        }) => (
          <div>
            <SearchInputLabel htmlFor="searchInput" ref={this.searchLabelRef}>
            Куда доставить?
            </SearchInputLabel>
            <SearchInputWrapper
              {...getInputProps()}
              ref={this.searchInputRef}
              id="searchInput"
              onInput={this.changeQueryList}
              onFocus={this.isDownshiftFocus}
              onBlur={this.isDownshiftFocus}
            />
            <StreetList {...getMenuProps()}>
              {
                isOpen
                  ? streetsList
                    .filter((item) => item.data.street !== null)
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          style: {
                            borderBottomColor:
                            highlightedIndex === index ? '#EFB8AF' : '#EEE',
                          },
                        })}
                      >
                        <span className="street">
                          {
                            (item.data.street_type_full !== 'метро'
                              ? (`${item.data.street_type_full} `) : '')
            + (item.data.street ? item.data.street : '')
            + (item.data.house ? (`, ${item.data.house}`) : '')
            + (item.data.block ? (item.data.block_type + item.data.block) : '')
                            }
                        </span>
                        <br />
                        <span className="region">
                          {
                            item.data.street_type_full === 'метро'
                              ? `${item.data.street_type_full.charAt(0).toUpperCase()
                              + item.data.street_type_full.slice(1)
                              }, ${item.data.city}`
                              : item.data.city
                          }
                        </span>
                      </li>
                    ))
                  : null
                 }
            </StreetList>
          </div>
        )}
      </Downshift>
    );
  }
}

export default SearchBar;
